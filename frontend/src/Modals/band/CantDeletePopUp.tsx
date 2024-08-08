import { Band } from '../../types/Band';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  band: Band;
}

const CantDeletePopUp: React.FC<ModalProps> = ({ isOpen, onClose, band }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed z-20 inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg w-96">
        <h2 className="text-lg font-bold mb-2">Confirm Band Deletion</h2>
        Oops! You can't delete "{band.name}" because it has existing albums associated with it.
        Please delete the albums first.
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CantDeletePopUp;
