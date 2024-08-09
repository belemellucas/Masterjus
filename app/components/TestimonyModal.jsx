import { useState } from "react";
import ConfirmationModal from "../components/ConfirmationModal"
import { toast } from "react-toastify";

function TestimonyModal({ isOpen, onClose }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [testimony, setTestimony] = useState('');

  const handleSubmit = () => {
    toast.success('Depoimento enviado com sucesso!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    // setShowConfirmation(true); 

     onClose(); 

    // setTimeout(() => {
    //   setShowConfirmation(false)
    // }, 8000);

  };

  if (!isOpen) return null;

  return (
    <>
     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-4">Escreva um Depoimento</h2>
        <textarea
          rows="4"
          value={testimony}
          onChange={(e) => setTestimony(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4 "
          placeholder="Escreva seu depoimento aqui..."
        ></textarea>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancelar
          </button>
          <button 
          className="px-4 py-2 bg-blue-800 text-white rounded"
          onClick={handleSubmit}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
    {/* <ConfirmationModal 
    message="Depoimento enviado com sucesso!"
    isOpen={showConfirmation}
    onClose={() => setShowConfirmation(false)}
    /> */}
    </>
   
  );
}

export default TestimonyModal;
