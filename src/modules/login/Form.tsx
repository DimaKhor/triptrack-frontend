import React, {useEffect, useState} from "react";
// @ts-ignore
import {observer} from "mobx-react";
// @ts-ignore
import logo from "../../assets/logo.svg";



const Form = observer(() => {

    return (
        <body>
            <header className="login__header">
                <div className="main__logo">
                    <img src={logo} alt="Логотип сайта"/>
                </div>
            </header>
            <main className="login__main">
                <h1 className="login__title">С возвращением в TripTrack!</h1>
                <div className="input__user-data">
                    <ul className="login__input-list">
                        <li>
                            <h3 className="login__input__title">Имя пользователя</h3>
                            <input type="text" placeholder="Имя пользователя" className="login__input"/>
                        </li>
                        <li>
                            <h3 className="login__input__title">Пароль</h3>
                            <input type="password" placeholder="Пароль" className="login__input"/>
                        </li>
                    </ul>
                </div>
                <div className="login__links">
                    <a className="grey_link">
                        <span>Еще нет аккаунта?</span>
                    </a>
                    <button className="main__link blue_button">Войти</button>
                </div>
            </main>
        </body>
    );
});
export default Form;
