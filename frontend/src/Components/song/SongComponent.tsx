import React, { useState } from 'react';
import { Song } from '../../types/Song';
import { Album } from '../../types/Album';
import axios from 'axios';
import AddPopUp from '../../Modals/song/AddPopUp';
import EditPopUp from '../../Modals/song/EditPopUp';
import DeleteConfirmPopUp from '../../Modals/song/DeleteConfirmPopUp';
import SongInspectionPopUp from '../../Modals/song/SongInspectionPopUp';

interface SongComponentProps {
  albumsList: Album[];
  songsList: Song[];
  setUpdated: (isUpdated: boolean | ((prev: boolean) => boolean)) => void;
}

const SongComponent: React.FC<SongComponentProps> = ({ albumsList, songsList, setUpdated }) => {
  const [isAddPopUp, setIsAddPopUp] = useState(false);
  const [isEditPopUp, setIsEditPopUp] = useState(false);
  const [isDeleteSongPopUp, setIsDeleteSongPopUp] = useState(false);
  const [songInspectionPopUp, setSongInspectionPopUp] = useState(false);

  const [selectedSong, setSelectedSong] = useState<Song>({
    id: -1,
    name: '',
    length: -1,
    album_id: -1,
  });
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSongs = songsList.filter((song: Song) =>
    song.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSongAdd = (name: string, length: number, albumId: number) => {
    axios
      .post('http://localhost:3000/php-restful-api/backend/song', {
        name,
        length,
        album_id: albumId,
      })
      .then(() => {
        setUpdated((prev) => !prev);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSongEdit = (songId: number, name: string, length: number, albumId: number) => {
    axios
      .put('http://localhost:3000/php-restful-api/backend/song', {
        id: songId,
        name,
        length,
        album_id: albumId,
      })
      .then(() => {
        setUpdated((prev) => !prev);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSongDelete = (songId: number) => {
    axios
      .delete(`http://localhost:3000/php-restful-api/backend/song?id=${songId}`)
      .then(() => {
        setUpdated((prev) => !prev);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openAddPopUp = () => {
    setIsAddPopUp(true);
  };
  const openEditPopUp = (song: Song) => {
    setSelectedSong(song);
    setIsEditPopUp(true);
  };
  const openDeletePopUp = (song: Song) => {
    setSelectedSong(song);
    setIsDeleteSongPopUp(true);
  };
  const openSongInspectionPopUp = (event: React.MouseEvent, song: Song) => {
    const target = event.target as HTMLElement;
    if (target.localName !== 'button') {
      setSelectedSong(song);
      setSongInspectionPopUp(true);
    }
  };

  return (
    <>
      <SongInspectionPopUp
        isOpen={songInspectionPopUp}
        onClose={() => setSongInspectionPopUp(false)}
        song={selectedSong}
      />

      <AddPopUp
        isOpen={isAddPopUp}
        onClose={() => setIsAddPopUp(false)}
        onAdd={handleSongAdd}
        albumsList={albumsList}
      />
      <EditPopUp
        isOpen={isEditPopUp}
        onClose={() => setIsEditPopUp(false)}
        onSave={handleSongEdit}
        song={selectedSong}
        albumsList={albumsList}
      />

      <DeleteConfirmPopUp
        isOpen={isDeleteSongPopUp}
        onClose={() => setIsDeleteSongPopUp(false)}
        onYes={handleSongDelete}
        song={selectedSong}
      />

      <div className="max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search for an album"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <ul className="bg-white shadow-lg rounded overflow-y-auto h-[500px]">
          {filteredSongs.length > 0 ? (
            filteredSongs.map((song, index) => (
              <li
                data-id={song.id}
                key={index}
                className="cursor-pointer p-2 border-b border-gray-200 last:border-none flex justify-between items-center transition-transform transform hover:bg-blue-100"
                onClick={(e) => openSongInspectionPopUp(e, song)}
              >
                <span>
                  {song.name} ({song.length.toFixed(2)}mn)
                </span>

                <span>
                  <button
                    className="text-blue-500 hover:text-blue-700 mr-2"
                    onClick={() => openEditPopUp(song)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => openDeletePopUp(song)}
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
          Add Song
        </button>
      </div>
    </>
  );
};

export default SongComponent;
