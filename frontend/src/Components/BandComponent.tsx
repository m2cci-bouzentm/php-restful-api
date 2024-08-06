import { useEffect, useState } from 'react';
import { Band } from '../types/Band';
import axios from 'axios';
import EditPopUp from '../Modals/EditPopUp';
import AddPopUp from '../Modals/AddPopUp';

const bunkBandsList: Band[] = [
  { id: 1, name: 'The Beatles' },
  { id: 2, name: 'Led Zeppelin' },
  { id: 3, name: 'Pink Floyd' },
  { id: 4, name: 'The Rolling Stones' },
  { id: 5, name: 'Queen' },
  { id: 6, name: 'The Who' },
  { id: 7, name: 'Nirvana' },
  { id: 8, name: 'U2' },
  { id: 9, name: 'Metallica' },
  { id: 10, name: 'Radiohead' },
];

const BandComponent = () => {
  const [bandsList, setBandsList] = useState(bunkBandsList);
  const [searchTerm, setSearchTerm] = useState('');

  const [isEditPopUp, setIsEditPopUp] = useState(false);
  const [isAddPopUp, setIsAddPopUp] = useState(false);

  const [selectedBand, setSelectedBand] = useState({ id: -1, name: '' });

  const [updated, setUpdated] = useState(false);

  const filteredBands = bandsList.filter((band) =>
    band.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    axios
      .get('http://localhost:3000/php-restful-api/backend/bands')
      .then(function (response) {
        console.log(response.data);
        setBandsList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [updated]);

  const handleBandDelete = (bandId: number) => {
    axios
      .delete(`http://localhost:3000/php-restful-api/backend/band?id=${bandId}`)
      .then((res) => {
        console.log(res);
        setUpdated((prev) => !prev);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleBandSave = (band: Band) => {
    axios
      .put('http://localhost:3000/php-restful-api/backend/band', { ...band })
      .then((res) => {
        console.log('updated ?');
        console.log(res.data);
        setUpdated((prev) => !prev);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleBandAdd = (name: string) => {
    axios
      .post('http://localhost:3000/php-restful-api/backend/band', { name })
      .then((res) => {
        console.log(res.data);
        setUpdated((prev) => !prev);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openEditPopUp = (band: Band) => {
    setSelectedBand(band);
    setIsEditPopUp(true);
  };
  const openAddPopUp = () => {
    setIsAddPopUp(true);
  };

  return (
    <>
      <>
        <EditPopUp
          isOpen={isEditPopUp}
          onClose={() => setIsEditPopUp(false)}
          onSave={handleBandSave}
          band={selectedBand}
        />
        <AddPopUp isOpen={isAddPopUp} onClose={() => setIsAddPopUp(false)} onAdd={handleBandAdd} />

        {/* <DeleteConfimationPopUp /> */}
      </>

      {/* Sho bands components */}
      <div className="p-4">
        <div className="max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search for a band"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <ul className="bg-white shadow-lg rounded">
            {filteredBands.length > 0 ? (
              filteredBands.map((band, index) => (
                <li
                  data-id={band.id}
                  key={index}
                  className="cursor-pointer p-2 border-b border-gray-200 last:border-none flex justify-between items-center transition-transform transform hover:scale-105 hover:bg-blue-100"
                >
                  <span>{band.name}</span>
                  <span>
                    <button
                      className="text-blue-500 hover:text-blue-700 mr-2"
                      onClick={() => openEditPopUp(band)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleBandDelete(band.id)}
                    >
                      Delete
                    </button>
                  </span>
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500">No bands found</li>
            )}
          </ul>

          <button
            onClick={openAddPopUp}
            className="w-full bg-green-500 text-white my-4 px-4 py-4 rounded hover:bg-green-700"
          >
            Add Band
          </button>
        </div>
      </div>
    </>
  );
};

export default BandComponent;
