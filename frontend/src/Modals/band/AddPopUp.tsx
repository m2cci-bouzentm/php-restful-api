import React, { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (bandName: string) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [value, setValue] = useState('');

  if (!isOpen) return null;

  const handleAdd = () => {
    onAdd(value);
    onClose();
  };

  return (
    <div className="fixed z-20 inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg w-96">
        <h2 className="text-lg font-bold mb-2">Add a Band Name</h2>
        <input
          type="text"
          onChange={(e) => setValue(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
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
