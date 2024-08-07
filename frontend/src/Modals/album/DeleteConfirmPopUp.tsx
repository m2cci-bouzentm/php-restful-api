// Cant delete for Album


import React from 'react';
import { Album } from '../../types/Album';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onYes: (albumId: number) => void;
    album: Album;
}

const DeleteConfirmPopUp: React.FC<ModalProps> = ({ isOpen, onClose, onYes, album }) => {
    if (!isOpen) return null;

    const handleDelete = () => {
        onYes(album.id);
        onClose();
    };

    return (
        <div className="fixed z-20 inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-lg w-96">
                <h2 className="text-lg font-bold mb-2">Confirm Album Deletion</h2>
                You sure wanna delete the Album {album.name} ?
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-700"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmPopUp;
