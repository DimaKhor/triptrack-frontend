import React, { useState } from "react";
// @ts-ignore
import { observer } from "mobx-react";
import validate from "./RegistrationFormValidationRules";
import AuthService from "../../services/AuthService";
import { authStore } from "../../store/AuthStore";
// @ts-ignore
import logo from "../../assets/logo.svg";

const Form = observer(() => {
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirm, setPasswordConfirm] = useState('');

    const [inputErrors, setInputErrors] = useState({
        email: '',
        login: '',
        password: '',
        password_confirm: ''
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, setStateFunction: React.Dispatch<React.SetStateAction<string>>) => {
        const inputValue = event.target.value;
        setStateFunction(inputValue);
    };

    const submit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const errors = validate(email, login, password, password_confirm);
        setInputErrors(errors);

        if (Object.values(errors).some(error => error !== '')) {
            console.log('Ошибка ввода данных');
            return;
        }

        try {
            const registrationResponse = await AuthService.register(email, login, password);
            if (registrationResponse && registrationResponse.userKey) {
                const loginResponse = await AuthService.login(email, password);
                if (loginResponse && loginResponse.userKey) {
                    authStore.login(loginResponse.userKey);
                    window.location.assign(`http://localhost:3000/profile/${loginResponse.userKey}`);
                } else {
                    throw new Error('Ошибка входа после регистрации');
                }
            } else {
                throw new Error('Ошибка регистрации');
            }
        } catch (error) {
            console.error('Ошибка при регистрации или входе:', error);
            setErrorMessage('Ошибка при регистрации. Пожалуйста, попробуйте снова.');
        }
    };

    return (
        <div>
            <header className="login__header">
                <div className="main__logo">
                    <img src={logo} alt="Логотип сайта"/>
                </div>
            </header>
            <main className="registration__main">
                <h1 className="title">Добро пожаловать в TripTrack</h1>
                <div className="input__user-data">
                    <ul className="input-list">
                        <li>
                            <label className="input__title" htmlFor="email">Почта
                                <input type="text"
                                       placeholder="example@g.nsu.ru"
                                       className="input"
                                       id="email"
                                       onChange={(event) => handleChange(event, setEmail)}
                                />
                            </label>
                            {inputErrors.email && (
                                <p className="wrong_data">{inputErrors.email}</p>
                            )}
                        </li>
                        <li>
                            <label className="input__title" htmlFor="name">Имя пользователя
                                <input type="text"
                                       placeholder="МайлиSmiley"
                                       className="input"
                                       id="name"
                                       onChange={(event) => handleChange(event, setLogin)}
                                />
                            </label>
                            {inputErrors.login && (
                                <p className="wrong_data">{inputErrors.login}</p>
                            )}
                        </li>
                        <li>
                            <label className="input__title" htmlFor="password">Пароль
                                <input type="password"
                                       placeholder="********"
                                       className="input"
                                       id="password"
                                       onChange={(event) => handleChange(event, setPassword)}
                                />
                            </label>
                            {inputErrors.password && (
                                <p className="wrong_data">{inputErrors.password}</p>
                            )}
                        </li>
                        <li>
                            <label className="input__title" htmlFor="confirm_password">Повторите пароль
                                <input type="password"
                                       placeholder="********"
                                       className="input"
                                       id="confirm_password"
                                       onChange={(event) => handleChange(event, setPasswordConfirm)}
                                />
                            </label>
                            {inputErrors.password_confirm && (
                                <p className="wrong_data">{inputErrors.password_confirm}</p>
                            )}
                        </li>
                    </ul>
                    {errorMessage && (
                        <p className="wrong_data_login">{errorMessage}</p>
                    )}
                </div>
                <div className="login__links">
                    <a className="grey_link" href="../login">
                        <span>Уже есть аккаунт?</span>
                    </a>
                    <button className="main__link blue_button" onClick={submit}>Зарегистрироваться</button>
                </div>
            </main>
        </div>
    );
});
export default Form;
