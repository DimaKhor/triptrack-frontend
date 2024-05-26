import React, {useEffect, useState} from "react";
// @ts-ignore
import {observer} from "mobx-react";
// @ts-ignore
import logo from "../../assets/logo.svg";
import validate from "./LoginFormValidationRules";
import AuthService from "../../services/AuthService";
import {authStore} from "../../store/AuthStore";



const Form = observer(() => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

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
        setEmailError(validate(email, password).email);
        setPasswordError(validate(email, password).password);

        if (emailError === '' && passwordError === '') {
            AuthService.login(email, password)
                .then(response => {

                    authStore.login();
                    localStorage.setItem('accessToken', response.data.accessToken);
                    localStorage.setItem('refreshToken', response.data.refreshToken);

                    window.location.assign('http://localhost:3000/profile');

                })
                .catch(error => {
                    console.error('Ошибка при получении данных:', error);
                    console.log(authStore.isAuthenticated)
                })
        }
    }

    return (
        <body>
            <header className="login__header">
                <div className="main__logo">
                    <img src={logo} alt="Логотип сайта"/>
                </div>
            </header>
            <main className="login__main">
                <h1 className="title">С возвращением в TripTrack!</h1>
                <div className="input__user-data">
                    <ul className="input-list">
                        <li>
                            <label className="input__title" htmlFor="email">Почта
                                <input type="text"
                                       placeholder="example@g.nsu.ru"
                                       className="input"
                                       id="email"
                                       onChange={ (event) => handleChange(event, setEmail) }
                                />
                            </label>
                            {emailError && (
                                <p className="wrong_data">{ emailError }</p>
                            )}
                        </li>
                        <li>
                            <label className="input__title" htmlFor="password">Пароль
                                <input type="password"
                                       placeholder="********"
                                       className="input"
                                       id="password"
                                       onChange={ (event) => handleChange(event, setPassword)}
                                />
                            </label>
                            {passwordError && (
                                <p className="wrong_data">{passwordError}</p>
                            )}
                        </li>
                    </ul>
                </div>
                <div className="login__links">
                    <a className="grey_link" href="../registration">
                        <span>Еще нет аккаунта?</span>
                    </a>
                    <button className="main__link blue_button" onClick={ submit }>Войти</button>
                </div>
            </main>
        </body>
    );
});
export default Form;
