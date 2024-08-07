import React, { useState } from 'react';
import { Album } from '../../types/Album';
import { Band } from '../../types/Band';
import axios from 'axios';
import AddPopUp from '../../Modals/album/AddPopUp';
import EditPopUp from '../../Modals/album/EditPopUp';
import DeleteConfirmPopUp from '../../Modals/album/DeleteConfirmPopUp';
import CantDeletePopUp from '../../Modals/album/CantDeletePopUp';

interface AlbumsProps {
  albumsList: Album[];
  bandsList: Band[];
  setUpdated: (isUpdated: boolean | ((prev: boolean) => boolean)) => void;
}

const Albums: React.FC<AlbumsProps> = ({ albumsList, bandsList, setUpdated }) => {
  const [isAddPopUp, setIsAddPopUp] = useState(false);
  const [isEditPopUp, setIsEditPopUp] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<Album>({
    id: -1,
    name: '',
    release_year: -1,
    band_id: -1,
  });

  const [searchTerm, setSearchTerm] = useState('');

  const [isDeleteAlbumPopUp, setIsDeleteAlbumPopUp] = useState(false);
  const [isCantDeletion, setIsCantDeletion] = useState(false);

  const filteredAlbums = albumsList.filter((album: Album) =>
    album.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAlbumAdd = (name: string, release_year: number, band_id: number) => {
    axios
      .post('http://localhost:3000/php-restful-api/backend/album', { name, release_year, band_id })
      .then(() => {
        setUpdated((prev) => !prev);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAlbumEdit = (album: Album) => {
    axios
      .put('http://localhost:3000/php-restful-api/backend/album', { ...album })
      .then((res) => {
        console.log(res.data);

        setUpdated((prev) => !prev);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAlbumDelete = (albumId: number) => {
    axios
      .delete('http://localhost:3000/php-restful-api/backend/album', { data: { id: albumId } })
      .then(() => {
        setUpdated((prev) => !prev);
      })
      .catch((err) => {
        console.log(err);
        setIsCantDeletion(true);
      });
  };

  const openAddPopUp = () => {
    setIsAddPopUp(true);
  };
  const openEditPopUp = (album: Album) => {
    setSelectedAlbum(album);
    setIsEditPopUp(true);
  };

  return (
    <div className="flex justify-around px-52">
      <AddPopUp
        isOpen={isAddPopUp}
        onClose={() => setIsAddPopUp(false)}
        onAdd={handleAlbumAdd}
        bandsList={bandsList}
      />
      <EditPopUp
        isOpen={isEditPopUp}
        onClose={() => setIsEditPopUp(false)}
        onSave={handleAlbumEdit}
        album={selectedAlbum}
        bandsList={bandsList}
      />

      <DeleteConfirmPopUp
        isOpen={isDeleteAlbumPopUp}
        onClose={() => setIsDeleteAlbumPopUp(false)}
        onYes={handleAlbumDelete}
        album={selectedAlbum}
      />

      <CantDeletePopUp
        isOpen={isCantDeletion}
        onClose={() => setIsCantDeletion(false)}
        album={selectedAlbum}
      />

      <div className="p-4 w-[50%]">
        <div className="max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search for an album"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />

          <ul className="bg-white shadow-lg rounded overflow-y-auto h-[500px]">
            {filteredAlbums.length > 0 ? (
              filteredAlbums.map((album, index) => (
                <li
                  data-id={album.id}
                  key={index}
                  className="cursor-pointer p-2 border-b border-gray-200 last:border-none flex justify-between items-center transition-transform transform hover:bg-blue-100"
                  onClick={() => setSelectedAlbum(album)}
                >
                  <span>
                    {album.name} ({album.release_year})
                  </span>

                  <span>
                    <button
                      className="text-blue-500 hover:text-blue-700 mr-2"
                      onClick={() => openEditPopUp(album)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => {
                        setSelectedAlbum(album);
                        setIsDeleteAlbumPopUp(true);
                      }}
                    >
                      Delete
                    </button>
                  </span>
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500">No albums found</li>
            )}
          </ul>

          <button
            onClick={openAddPopUp}
            className="w-full bg-green-500 text-white my-4 px-4 py-4 rounded hover:bg-green-700"
          >
            Add Album
          </button>
        </div>
      </div>

      <div className="rounded mb-4 p-12 mx-4 grid grid-cols-4">
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
            </div>
          ))
        ) : (
          <p className="p-2 text-gray-500">No bands found</p>
        )}
      </div>
    </div>
  );
};

export default Albums;
