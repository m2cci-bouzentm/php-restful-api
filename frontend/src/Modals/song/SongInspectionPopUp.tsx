import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Song } from '../../types/Song';
import { Band } from '../../types/Band';
import { Album } from '../../types/Album';

interface SongInspectionProps {
  isOpen: boolean;
  onClose: () => void;
  song: Song;
}

const SongInspectionPopUp: React.FC<SongInspectionProps> = ({ isOpen, onClose, song }) => {
  const [albumSong, setAlbumSong] = useState<Album>({
    id: -1,
    name: '',
    release_year: -1,
    band_id: -1,
  });
  const [bandSong, setBandSong] = useState<Band>({ id: -1, name: '' });
  const [isLoading, setIsLoading] = useState(false);

  const getAlbumBand = async () => {
    const resAlbum = await axios.get(
      `http://ec2-16-171-4-203.eu-north-1.compute.amazonaws.com/album?id=${song.album_id}`
    );
    const resBand = await axios.get(
      `http://ec2-16-171-4-203.eu-north-1.compute.amazonaws.com/band?id=${resAlbum.data.band_id}`
    );

    setAlbumSong(resAlbum.data);
    setBandSong(resBand.data);
  };
  useEffect(() => {
    if (isOpen) {
      getAlbumBand()
        .then(() => {
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [song.id, isLoading]);

  if (!isOpen) return null;

  // console.log(isLoading);

  return (
    <div className="fixed z-30 inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4">Song Details</h2>
        <p>
          <strong>Song:</strong> {song.name}
        </p>
        <p>
          <strong>Length:</strong> {Math.round(song.length)} minutes
        </p>
        <p>
          <strong>Album:</strong> {albumSong.name}
        </p>
        <p>
          <strong>Band:</strong> {bandSong.name}
        </p>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SongInspectionPopUp;
