import React, { useState } from 'react';
import { updateProfileRequest } from '../api/auth';
import { useSelector } from 'react-redux';

const UpdateProfileModal = ({ field, value, onClose }) => {
  const userId = useSelector((state) => state.user.id);
  const [updatedValue, setUpdatedValue] = useState(value);

  const handleInputChange = (e) => {
    setUpdatedValue(e.target.value);
  };

  const handleUpdate = async () => {
    try {
      // Realizar la llamada a la API para actualizar el perfil
      await updateProfileRequest(userId, {
        [field.toLowerCase()]: updatedValue,
      });
  
      // Puedes agregar lógica adicional, como actualizar el estado local con la nueva información, si es necesario
      console.log('Perfil actualizado');
  
      // Cerrar el modal
      onClose();
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      // Manejar el error según tus necesidades (puede mostrar un mensaje de error, etc.)
    }
  };
  

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg md:max-w-md w-full h-4/5 md:h-90vh overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">Editar {field}</h2>
        <div className="mb-4">
          <label className="block mb-2 text-sm text-gray-800">{field}:</label>
          <input
            type="text"
            value={updatedValue}
            onChange={handleInputChange}
            className="w-full border rounded p-2 text-gray-800"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            className="bg-primary text-white px-4 py-2 rounded"
            onClick={handleUpdate}
          >
            Actualizar
          </button>
          <button
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileModal;
