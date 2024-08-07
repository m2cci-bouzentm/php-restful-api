import React, { useState, useEffect } from 'react';
import { Album } from '../../types/Album';
import { Band } from '../../types/Band';

interface EditPopUpProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (album: Album) => void;
  album: Album;
  bandsList: Band[];
}

const EditPopUp: React.FC<EditPopUpProps> = ({ isOpen, onClose, onSave, album, bandsList }) => {
  const [name, setName] = useState('');
  const [year, setYear] = useState(-1);
  const [bandId, setBandId] = useState(-1);

  useEffect(() => {
    setName(album.name);
    setYear(album.release_year);
    setBandId(album.band_id);
  }, [album]);

  const handleSave = () => {
    onSave({ id: album.id, name, release_year: year, band_id: bandId });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded p-4 w-96">
        <h2 className="text-xl mb-4">Add New Album</h2>
        <input
          type="text"
          placeholder="Album Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="number"
          placeholder="Release Year"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <select
          onChange={(e) => setBandId(Number(e.target.value))}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        >
          <option selected disabled hidden>
            Select a band
          </option>

          {bandsList.map((band) => (
            <option key={band.id} value={band.id}>
              {band.name}
            </option>
          ))}
        </select>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
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

export default EditPopUp;
