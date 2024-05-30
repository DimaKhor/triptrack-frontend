import React from 'react';
import DeleteAccount from '../../services/DeleteAccount'; // Подставьте правильный путь к файлу DeleteAccount

interface DeleteAccountModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({ isOpen, onClose, onDelete }) => {
    if (!isOpen) return null;

    const handleDelete = async () => {
        try {
            await DeleteAccount.delete(4);
            onDelete();
        } catch (error) {
            console.error("Ошибка при удалении аккаунта:", error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <p>Вы точно хотите удалить аккаунт?</p>
                <div className="modal-buttons">
                    <button onClick={onClose}>Нет</button>
                    <button onClick={handleDelete}>Да</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteAccountModal;
