import React, { useState } from "react";
// @ts-ignore
import { observer } from "mobx-react";
import validate from "./RegistrationFormValidationRules";
import AuthService from "../../services/AuthService";
// @ts-ignore
import logo from "../../assets/logo.svg";

const Form = observer(() => {

    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirm, setPasswordConfirm] = useState('');

    const [emailError, setEmailError] = useState('');
    const [loginError, setLoginError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [password_confirmError, setPasswordConfirmError] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, setStateFunction: {
        (value: React.SetStateAction<string>): void;
        (value: React.SetStateAction<string>): void;
        (value: React.SetStateAction<string>): void;
        (value: React.SetStateAction<string>): void;
        (value: React.SetStateAction<string>): void;
        (arg0: any): void;
    }) => {
        const inputValue = event.target.value;
        setStateFunction(inputValue);
    };

    const submit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setEmailError(validate(email, login, password, password_confirm).email);
        setLoginError(validate(email, login, password, password_confirm).login);
        setPasswordError(validate(email, login, password, password_confirm).password);
        setPasswordConfirmError(validate(email, login, password, password_confirm).password_confirm);

        if (emailError === '' && loginError === '' && passwordError === '') {
            AuthService.register(login, email, password)
                .then(response => {
                        window.location.assign("http://localhost:8080/email-consider")

                    }
                )
                .catch(error => {
                    console.error('Ошибка при получении данных:', error);
                })
            return;
        }
        console.log("error")
    }

    return (

        <body>
            <header className="login__header">
                <div className="main__logo">
                    <img src={logo} alt="Логотип сайта"/>
                </div>
            </header>
            <main className="login__main">
                <h1 className="login__title">Добро пожаловать в TripTrack</h1>
                <div className="input__user-data">
                    <ul className="login__input-list">
                        <li>
                            <h3 className="login__input__title">Почта</h3>
                            <input type="text" placeholder="Почта" className="login__input"
                                   onChange={ (event) => handleChange(event, setEmail) }
                            />
                            {emailError && (
                                <p className="wrong_data">{ emailError }</p>
                            )}
                        </li>
                        <li>
                            <h3 className="login__input__title">Имя пользователя</h3>
                            <input type="text" placeholder="Имя пользователя" className="login__input"
                                   onChange={ (event) => handleChange(event, setLogin) }
                            />
                            {loginError && (
                                <p className="wrong_data">{ loginError }</p>
                            )}
                        </li>
                        <li>
                            <h3 className="login__input__title">Пароль</h3>
                            <input type="password" placeholder="Пароль" className="login__input"
                                   onChange={ (event) => handleChange(event, setPassword)}
                            />
                            {passwordError && (
                                <p className="wrong_data">{passwordError}</p>
                            )}
                        </li>
                        <li>
                            <h3 className="login__input__title">Повторите пароль</h3>
                            <input type="password" placeholder="Пароль" className="login__input"
                                   onChange={ (event) => handleChange(event, setPasswordConfirm)}
                            />
                            {password_confirmError && (
                                <p className="wrong_data">{password_confirmError}</p>
                            )}
                        </li>
                    </ul>
                </div>
                <div className="login__links">
                    <a className="grey_link" href="../login">
                        <span>Уже есть аккаунт?</span>
                    </a>
                    <button className="main__link blue_button" onClick={ submit }>Зарегистрироваться</button>
                </div>
            </main>
        </body>

    );
});
export default Form;
