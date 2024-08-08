import React, { useState, useEffect } from 'react';
import { Song } from '../../types/Song';
import { Album } from '../../types/Album';

interface EditPopUpProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (songId: number, name: string, length: number, albumId: number) => void;
  song: Song;
  albumsList: Album[];
}

const EditPopUp: React.FC<EditPopUpProps> = ({ isOpen, onClose, onSave, song, albumsList }) => {
  const [name, setName] = useState('');
  const [length, setLength] = useState(-1);
  const [albumId, setAlbumId] = useState(-1);

  useEffect(() => {
    setName(song.name);
    setLength(song.length);
    setAlbumId(song.album_id);
  }, [song]);

  const handleSave = () => {
    onSave(song.id, name, length, albumId);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded p-4 w-96">
        <h2 className="text-xl mb-4">Add New song</h2>
        <input
          type="text"
          placeholder="song Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="number"
          placeholder="Release length"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
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
