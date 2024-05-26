import React, { useState } from "react";
// @ts-ignore
import logo from "../../assets/logo.svg";
// @ts-ignore
import settings from "../../assets/gear.svg";
import BeenSection from "./BeenSection";
import WillSection from "./WillSection";
import DeleteAccountModal from "./DeleteAccountModal";
import {authStore} from "../../store/AuthStore";
import DeleteAccount from '../../services/DeleteAccount';

const Form: React.FC = () => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const userId = 1; // замените на фактический ID пользователя

    const toggleSettings = () => {
        setIsSettingsOpen(!isSettingsOpen);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleDeleteAccount = async () => {
        try {
            // await deleteTraveler(userId);
            authStore.logout();
            window.location.href = "/login";
        } catch (error) {
            console.error("Ошибка при удалении аккаунта:", error);
        }
    };

    return (
        <div className="profile">
            <header className="main__header">
                <div className="main__logo">
                    <img src={logo} alt="Логотип сайта" />
                </div>
                <div className="settings">
                    <button className="settings__button" onClick={toggleSettings}>
                        <img src={settings} alt="Settings" />
                    </button>
                    {isSettingsOpen && (
                        <ul className="settings__list">
                            <li>Изменить пароль</li>
                            <li onClick={openModal}>Удалить аккаунт</li>
                            <li>
                                <a href="../triptrack">Выйти</a>
                            </li>
                        </ul>
                    )}
                </div>
            </header>
            <main className="profile__main">
                <BeenSection />
                <WillSection />
            </main>
            <DeleteAccountModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onDelete={handleDeleteAccount}
            />
        </div>
    );
};

export default Form;
