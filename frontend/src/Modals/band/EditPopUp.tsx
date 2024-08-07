import React, { useState, useEffect } from 'react';
import { Band } from '../../types/Band';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (band: Band) => void;
  band: Band;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave, band }) => {
  const [value, setValue] = useState(band.name);

  useEffect(() => {
    setValue(band.name);
  }, [band]);

  if (!isOpen) return null;

  const handleSave = () => {
    // if the old name is the same as the new one. we avoid the db solicitation by NOT calling the onSave method
    if (value !== band.name) {
      onSave({ id: band.id, name: value });
    }
    onClose();
  };

  return (
    <div className="fixed z-20 inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg w-96">
        <h2 className="text-lg font-bold mb-2">Edit Band Name</h2>
        <input
          type="text"
          value={value}
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
