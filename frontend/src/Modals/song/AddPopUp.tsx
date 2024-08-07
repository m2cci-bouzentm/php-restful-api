import React, { useState } from 'react';
import { Album } from '../../types/Album';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string, length: number, albumId: number) => void;
  albumsList: Album[];
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onAdd, albumsList }) => {
  const [name, setName] = useState('');
  const [length, setLength] = useState(-1);
  const [albumId, setAlbumId] = useState(-1);

  if (!isOpen) return null;

  const handleAdd = () => {
    onAdd(name, length, albumId);
    onClose();
  };

  return (
    <div className="fixed z-20 inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg w-96">
        <h2 className="text-lg font-bold mb-2">Add a Song</h2>
        <input
          type="text"
          placeholder='Song Name'
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <input
          type="number"
          placeholder='Duration'
          onChange={(e) => setDuration(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <select
          onChange={(e) => setAlbumId(Number(e.target.value))}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        >
          <option selected disabled hidden>
            Select an album
          </option>

          {albumsList.map((album) => (
            <option key={album.id} value={album.id}>
              {album.name}
            </option>
          ))}
        </select>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
