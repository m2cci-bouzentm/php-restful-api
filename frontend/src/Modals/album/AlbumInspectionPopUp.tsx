import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Album } from '../../types/Album';
import { Song } from '../../types/Song';

interface AlbumInspectionProps {
    isOpen: boolean;
    onClose: () => void;
    album: Album;
}

const AlbumInspectionPopUp: React.FC<AlbumInspectionProps> = ({ isOpen, onClose, album }) => {
    const [albumSongs, setAlbumSongs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setAlbumSongs([]);
            setIsLoading(true);
            axios
                .get(`http://localhost:3000/php-restful-api/backend/songs?album_id=${album.id}`)
                .then((res) => {
                    setIsLoading(false);
                    console.log(res.data);
                    setAlbumSongs(res.data);
                })
                .catch((err) => {
                    setIsLoading(false);
                    console.log(err);
                });
        }
    }, [album.id]);

    if (!isOpen) return null;

    return (
        <div className="fixed z-20 inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 ">
            <div className="bg-white p-4 rounded shadow-lg w-96 max-h-96 overflow-y-auto">
                <h2 className="text-lg font-bold mb-2 sticky relative top-0 bg-white">All {album.name}'s Songs</h2>
                {isLoading && <span className='text-blue-500'>Loading...</span>}
                <ul className=''>
                    {albumSongs.length ? (
                        albumSongs.map((song: Song) => (
                            <li key={song.id} className="p-2 border-b border-gray-200 last:border-none">
                                <span>{song.name}</span>{' '}
                            </li>
                        ))
                    ) : (
                        <>
                            {
                                !isLoading && <li className="p-2 text-gray-500">No songs found</li>
                            }
                        </>
                    )}
                </ul>

                <button
                    onClick={onClose}
                    // className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-700"
                    className='bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-700 sticky relative bottom-0 left-0 right-0 p-4'
                >
                    Done
                </button>
            </div>
            <div className="flex justify-end">
            </div>
        </div>
    );
};

export default AlbumInspectionPopUp;
