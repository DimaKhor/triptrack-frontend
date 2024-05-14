import React, { useState } from "react";
// @ts-ignore
import logo from "../../assets/logo.svg";
// @ts-ignore
import settings from "../../assets/gear.svg";
import BeenSection from "./BeenSection";
import WillSection from "./WillSection";

const Form = () => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const toggleSettings = () => {
        setIsSettingsOpen(!isSettingsOpen);
    };

    return (
        <div className="profile">
            <header className="main__header">
                <div className="main__logo">
                    <img src={logo} alt="Логотип сайта" />
                </div>
                <div className="settings">
                    <button className="settings__button" onClick={toggleSettings}>
                    </button>
                    {isSettingsOpen && (
                        <ul className="settings__list">
                            <li>Изменить пароль</li>
                            <li>
                                <a href="../triptrack">
                                    Выйти
                                </a>
                            </li>
                        </ul>
                    )}
                </div>
            </header>
            <main className="profile__main">
                <BeenSection />
                <WillSection />
            </main>
        </div>
    );
};

export default Form;
