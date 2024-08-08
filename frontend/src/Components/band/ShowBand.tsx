import React from 'react';
import { Band } from '../../types/Band';

interface ShowBandProps {
  filteredBands: Band[];
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  openEditPopUp: (band: Band) => void;
  setSelectedBand: (band: Band) => void;
  setIsDeletionConfirmPopUp: (isConfirmation: boolean) => void;
  openAddPopUp: () => void;
  openBandInspectionPopUp: (event: React.MouseEvent, band: Band) => void;
  isLoading: boolean;
}

const ShowBand: React.FC<ShowBandProps> = ({
  filteredBands,
  searchTerm,
  setSearchTerm,
  openEditPopUp,
  setSelectedBand,
  setIsDeletionConfirmPopUp,
  openAddPopUp,
  openBandInspectionPopUp,
  isLoading
}) => {
  return (
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
                onClick={(e) => openBandInspectionPopUp(e, band)}
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
                    onClick={() => {
                      setSelectedBand(band);
                      setIsDeletionConfirmPopUp(true);
                    }}
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
          {isLoading && <span className=' text-blue-500'>Updating...</span>}
      </div>
    </div>
  );
};

export default ShowBand;
