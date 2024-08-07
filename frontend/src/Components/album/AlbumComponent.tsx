import React, { useState } from 'react';
import { Album } from '../../types/Album';
import { Band } from '../../types/Band';
import Modal from '../Modal'; // Assuming you have a Modal component for adding albums

interface AlbumsProps {
  albumsList: Album[];
  bandsList: Band[];
  setUpdated: (isUpdated: boolean | ((prev: boolean) => boolean)) => void;
}

const Albums: React.FC<AlbumsProps> = ({ albumsList, bandsList, setUpdated }) => {
  // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // const [currentBand, setCurrentBand] = useState<Band | null>(null);

  // const handleAddAlbumClick = (band: Band) => {
  //   setCurrentBand(band);
  //   setIsModalOpen(true);
  // };

  // const handleSaveAlbum = (albumName: string, releaseYear: number) => {
  //   if (currentBand) {
  //     const newAlbum: Album = {
  //       id: albumsList.length + 1,
  //       band_id: currentBand.id,
  //       name: albumName,
  //       release_year: releaseYear,
  //     };
  //     albumsList.push(newAlbum);
  //     setUpdated((prev) => !prev);
  //   }
  //   setIsModalOpen(false);
  // };

  return (
    <div className="bg-gray-100 rounded mb-4 p-20 grid grid-cols-4 gap-20">
      {bandsList.length > 0 ? (
        bandsList.map((band) => (
          <div key={band.id} className="mb-4">
            <h2 className="font-bold text-lg mb-2">{band.name}</h2>
            <ul className="bg-white rounded p-2">
              {albumsList.filter((album) => album.band_id === band.id).length > 0 ? (
                albumsList
                  .filter((album) => album.band_id === band.id)
                  .map((album) => (
                    <li key={album.id} className="p-2 border-b border-gray-200 last:border-none">
                      <span>{album.name}</span>{' '}
                      <span className="text-gray-500">({album.release_year})</span>
                    </li>
                  ))
              ) : (
                <li className="p-2 text-gray-500">No albums found</li>
              )}
            </ul>
            <button
              // onClick={() => handleAddAlbumClick(band)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add Album
            </button>
          </div>
        ))
      ) : (
        <p className="p-2 text-gray-500">No bands found</p>
      )}
      {/* {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveAlbum}
          initialName=""
          initialYear={new Date().getFullYear()}
        />
      )} */}
    </div>
  );
};

export default Albums;
