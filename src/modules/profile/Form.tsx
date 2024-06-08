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
import UserService from "../../services/UserService";

const Form: React.FC = () => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userLogin, setUserLogin] = useState<string | null>(null);
    const { userKey } = useParams<{ userKey: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        if (authStore.userKey !== userKey) {
            navigate('/login');
        } else {
            UserService.getUserInfo(authStore.userKey).then(login => {
                setUserLogin(login);
            }).catch(error => {
                console.error("Ошибка при получении информации о пользователе:", error);
            });
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
            if (authStore.userKey && userLogin) {
                await AuthService.deleteAccount(authStore.userKey);

                localStorage.removeItem(`selectedBeenItems_${userLogin}`);
                localStorage.removeItem(`cityBeenImages_${userLogin}`);
                localStorage.removeItem(`selectedWillItems_${userLogin}`);
                localStorage.removeItem(`cityWillImages_${userLogin}`);

                authStore.deleteAccount();
                navigate('../registration');
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
                navigate('/login');
            }
        } catch (error) {
            console.error("Ошибка при выходе из аккаунта:", error);
        }
    };

    if (!userKey) {
        return null;
    }

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
                            <li onClick={openModal}>Удалить аккаунт</li>
                            <li onClick={handleLogout}>
                                <a href="#">Выйти</a>
                            </li>
                        </ul>
                    )}
                </div>
            </header>
            <main className="profile__main">
                <BeenSection userKey={userKey} />
                <WillSection userKey={userKey} />
            </main>
            <DeleteAccountModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onDelete={handleDeleteAccount}
                userKey={userKey}
            />
        </div>
    );
};

export default Form;
