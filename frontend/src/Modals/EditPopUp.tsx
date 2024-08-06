import React, { useState } from 'react';
import { Band } from '../types/Band';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
  band: Band;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave, band }) => {
  const [value, setValue] = useState(band.name);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(band.name);
    onClose();

    // update by band.id
  };

  return (
    <div className="fixed z-20 inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg w-96">
        <h2 className="text-lg font-bold mb-2">Edit Band Name</h2>
        <input
          type="text"
          value={value.length ? value : band.name}
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
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
