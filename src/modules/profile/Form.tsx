import React, { useState, useEffect } from "react";
// @ts-ignore
import logo from "../../assets/logo.svg";
// @ts-ignore
import settings from "../../assets/gear.svg";
import BeenSection from "./BeenSection";
import WillSection from "./WillSection";
import DeleteAccountModal from "./DeleteAccountModal";
import { authStore } from "../../store/AuthStore";
import { useParams, useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";

const Form: React.FC = () => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { userKey } = useParams<{ userKey: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        if (authStore.userKey !== userKey) {
            navigate('/login');
        }
    }, [userKey, navigate]);

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
            if (authStore.userKey) {
                await AuthService.deleteAccount(authStore.userKey);
                authStore.deleteAccount();
                navigate('/registration'); // Перенаправление на страницу регистрации после удаления аккаунта
            }
        } catch (error) {
            console.error("Ошибка при удалении аккаунта:", error);
        }
    };

    const handleLogout = async () => {
        try {
            if (authStore.userKey) {
                await AuthService.logout(authStore.userKey);
                authStore.logout();
                navigate('/login'); // Перенаправление на страницу логина после выхода из аккаунта
            }
        } catch (error) {
            console.error("Ошибка при выходе из аккаунта:", error);
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
                        <img src={settings} alt="Настройки" />
                    </button>
                    {isSettingsOpen && (
                        <ul className="settings__list">
                            <li>Изменить пароль</li>
                            <li onClick={openModal}>Удалить аккаунт</li>
                            <li onClick={handleLogout}>
                                <a href="#">Выйти</a>
                            </li>
                        </ul>
                    )}
                </div>
            </header>
            <main className="profile__main">
                <h1>Профиль пользователя</h1>
                <p>Ключ пользователя: {userKey}</p>
                <BeenSection />
                <WillSection />
            </main>
            <DeleteAccountModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onDelete={handleDeleteAccount}
                userKey={userKey ?? ''}
            />
        </div>
    );
};

export default Form;
