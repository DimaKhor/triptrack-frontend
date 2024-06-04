import React from 'react';
import AuthService from '../../services/AuthService';

interface DeleteAccountModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
    userKey: string;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({ isOpen, onClose, onDelete, userKey }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <p>Вы точно хотите удалить аккаунт?</p>
                <div className="modal-buttons">
                    <button onClick={onClose}>Нет</button>
                    <button onClick={onDelete}>Да</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteAccountModal;
