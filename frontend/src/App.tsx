import { useState, useEffect } from 'react';

import Footer from './Components/Footer';
import Nav from './Components/Nav';

import BandComponent from './Components/band/BandComponent';
import AlbumComponent from './Components/album/AlbumComponent';
import SongComponent from './Components/song/SongComponent';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import axios from 'axios';

import { Band } from './types/Band';
import { Album } from './types/Album';
import { Song } from './types/Song';

function App() {
  const [bandsList, setBandsList] = useState<Band[]>([]);
  const [albumsList, setAlbumsList] = useState<Album[]>([]);
  const [songsList, setSongsList] = useState<Song[]>([]);

  const [updated, setUpdated] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get('https://php-rest-api.fly.dev/php-restful-api/backend/bands')
      .then(function (response) {
        setBandsList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get('https://php-rest-api.fly.dev/php-restful-api/backend/albums')
      .then(function (response) {
        setAlbumsList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get('https://php-rest-api.fly.dev/php-restful-api/backend/songs')
      .then(function (response) {
        setSongsList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [updated]);

  return (
    <Router>
      <Nav />

      <Routes>
        <Route path="/" element={<BandComponent bandsList={bandsList} setUpdated={setUpdated} />} />
        <Route
          path="/albums"
          element={
            <AlbumComponent albumsList={albumsList} bandsList={bandsList} setUpdated={setUpdated} />
          }
        />
        <Route
          path="/songs"
          element={
             <SongComponent albumsList={albumsList} songsList={songsList} setUpdated={setUpdated} />
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
