import { useState } from 'react';
import { Band } from '../../types/Band';
import EditPopUp from '../../Modals/band/EditPopUp';
import AddPopUp from '../../Modals/band/AddPopUp';
import DeleteConfirmPopUp from '../../Modals/band/DeleteConfirmPopUp';
import CantDeletePopUp from '../../Modals/band/CantDeletePopUp';
import ShowBand from './ShowBand';

import axios from 'axios';
import BandInspectionPopUp from '../../Modals/band/BandInspectionPopUp';

interface BandProps {
  bandsList: Band[];
  setUpdated: (isUpdated: boolean | ((prev: boolean) => boolean)) => void;
}

const BandComponent: React.FC<BandProps> = ({ bandsList, setUpdated }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  const [isEditPopUp, setIsEditPopUp] = useState(false);
  const [isAddPopUp, setIsAddPopUp] = useState(false);
  const [isDeletionConfirmPopUp, setIsDeletionConfirmPopUp] = useState(false);
  const [isCantDeletePopUp, setIsCantDeletePopUp] = useState(false);
  const [isBandInspected, setIsBandInspected] = useState(false);

  const [selectedBand, setSelectedBand] = useState({ id: -1, name: '' });

  const filteredBands = bandsList.filter((band: Band) =>
    band.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBandDelete = (bandId: number) => {
    setIsLoading(true);
    axios
      .delete(`http://ec2-16-171-4-203.eu-north-1.compute.amazonaws.com/band?id=${bandId}`)
      .then(() => {
        setUpdated((prev) => !prev);
      })
      .catch((err) => {
        console.log(err);
        setIsCantDeletePopUp(true);
      })
      .finally(() => setIsLoading(false));
  };

  const handleBandSave = (band: Band) => {
    setIsLoading(true);
    axios
      .put('http://ec2-16-171-4-203.eu-north-1.compute.amazonaws.com/band', { ...band })
      .then(() => {
        setUpdated((prev) => !prev);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  const handleBandAdd = (name: string) => {
    setIsLoading(true);
    axios
      .post('http://ec2-16-171-4-203.eu-north-1.compute.amazonaws.com/band', { name })
      .then(() => {
        setUpdated((prev) => !prev);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  const openEditPopUp = (band: Band) => {
    setSelectedBand(band);
    setIsEditPopUp(true);
  };
  const openAddPopUp = () => {
    setIsAddPopUp(true);
  };

  const openBandInspectionPopUp = (event: React.MouseEvent, band: Band) => {
    const target = event.target as HTMLElement;

    if (target.localName !== 'button') {
      setSelectedBand(band);
      setIsBandInspected(true);
    }
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
        <DeleteConfirmPopUp
          isOpen={isDeletionConfirmPopUp}
          onClose={() => setIsDeletionConfirmPopUp(false)}
          onYes={handleBandDelete}
          band={selectedBand}
        />
        <CantDeletePopUp
          isOpen={isCantDeletePopUp}
          onClose={() => setIsCantDeletePopUp(false)}
          band={selectedBand}
        />
        <BandInspectionPopUp
          isOpen={isBandInspected}
          onClose={() => setIsBandInspected(false)}
          band={selectedBand}
        />
      </>

      {/* Show bands components */}
      <ShowBand
        filteredBands={filteredBands}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        openEditPopUp={openEditPopUp}
        setSelectedBand={setSelectedBand}
        setIsDeletionConfirmPopUp={setIsDeletionConfirmPopUp}
        openAddPopUp={openAddPopUp}
        openBandInspectionPopUp={openBandInspectionPopUp}
        isLoading={isLoading}
      />
    </>
  );
};

export default BandComponent;
