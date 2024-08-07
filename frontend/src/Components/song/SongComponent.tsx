import React, { useState } from 'react';
import { Song } from '../../types/Song';
import { Album } from '../../types/Album';
import { Band } from '../../types/Band';
import axios from 'axios';
import AddPopUp from '../../Modals/song/AddPopUp';

interface SongComponentProps {
    bandsList: Band[];
    albumsList: Album[];
    songsList: Song[];
    setUpdated: (isUpdated: boolean | ((prev: boolean) => boolean)) => void;
}

const SongComponent: React.FC<SongComponentProps> = ({
    bandsList,
    albumsList,
    songsList,
    setUpdated,
}) => {
    const [isAddPopUp, setIsAddPopUp] = useState(false);
    // const [isEditPopUp, setIsEditPopUp] = useState(false);
    // const [isDeleteSongPopUp, setIsDeleteSongPopUp] = useState(false);

    const [selectedSong, setSelectedSong] = useState<Song>({
        id: -1,
        name: '',
        length: -1,
        album_id: -1,
    });

    const [searchTerm, setSearchTerm] = useState('');

    const handleSongAdd = (name: string, length: number, album_id: number) => {
        axios
            .post('http://localhost:3000/php-restful-api/backend/song', { name, length, album_id })
            .then(() => {
                setUpdated((prev) => !prev);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const filteredSongs = songsList.filter((song: Song) =>
        song.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const openAddPopUp = () => {
        setIsAddPopUp(true);
    };

    return (
        <>
            <AddPopUp
                isOpen={isAddPopUp}
                onClose={() => setIsAddPopUp(false)}
                onAdd={handleSongAdd}
                albumsList={albumsList}
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
                                onClick={() => setSelectedSong(song)}
                            >
                                <span>
                                    {song.name} ({song.length.toFixed(2)}mn)
                                </span>

                                <span>
                                    <button
                                        className="text-blue-500 hover:text-blue-700 mr-2"
                                    // onClick={() => openEditPopUp(album)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() => {
                                            setSelectedSong(song);
                                            // setIsDeleteSongPopUp(true);
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
                    Add Song
                </button>
            </div>
        </>
    );
};

export default SongComponent;