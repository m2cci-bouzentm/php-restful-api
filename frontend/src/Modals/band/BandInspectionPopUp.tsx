import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Band } from '../../types/Band';
import { Album } from '../../types/Album';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  band: Band;
}

const BandInspectionPopUp: React.FC<ModalProps> = ({ isOpen, onClose, band }) => {
  const [bandAlbums, setBandAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      axios
        .get(`http://localhost:3000/php-restful-api/backend/albums?band_id=${band.id}`)
        .then((res) => {
          setIsLoading(false);
          console.log(res.data);
          setBandAlbums(res.data);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    }
  }, [band.id]);

  if (!isOpen) return null;

  return (
    <div className="fixed z-20 inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg w-96">
        <h2 className="text-lg font-bold mb-2">All {band.name}'s Albums</h2>
        {isLoading && <span className='text-blue-500'>Loading...</span>}
        <ul>
          {bandAlbums.length ? (
            bandAlbums.map((album: Album) => (
              <li key={album.id} className="p-2 border-b border-gray-200 last:border-none">
                <span>{album.name}</span>{' '}
                <span className="text-gray-500">({album.release_year})</span>
              </li>
            ))
          ) : (
            <>
              {
                !isLoading && <li className="p-2 text-gray-500">No albums found</li>
              }
            </>
          )}
        </ul>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-700"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default BandInspectionPopUp;
