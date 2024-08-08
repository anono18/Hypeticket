// import React, { useState } from 'react';

// const Modal = ({ fieldToEdit, currentValue, onSave, onClose, fieldType }) => {
//   const [newValue, setNewValue] = useState(currentValue);

//   const handleSave = () => {
//     onSave(newValue);
//   };

//   // Determine the type of input based on fieldType
//   const getInputType = () => {
//     switch (fieldType) {
//       case 'date':
//         return 'date';
//       case 'number':
//         return 'number';
//       case 'url':
//         return 'url';
//       default:
//         return 'text';
//     }
//   };

//   return (
//     <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
//       <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
//         <h3 className='text-xl font-bold mb-4'>Modifier {fieldToEdit}</h3>
//         <input
//           type={getInputType()} // Set the input type based on fieldType
//           value={newValue}
//           onChange={(e) => setNewValue(e.target.value)}
//           className='w-full p-2 border rounded-lg mb-4'
//         />
//         <div className='flex justify-end space-x-4'>
//           <button onClick={onClose} className='bg-gray-300 px-4 py-2 rounded-lg'>
//             Annuler
//           </button>
//           <button onClick={handleSave} className='bg-blue-600 text-white px-4 py-2 rounded-lg'>
//             Enregistrer
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Modal;

import React, { useState } from 'react';

const Modal = ({ fieldToEdit, currentValue, onSave, onClose, fieldType }) => {
  const [newValue, setNewValue] = useState(currentValue);

  const handleSave = () => {
    onSave(newValue);
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
        <h3 className='text-xl font-bold mb-4'>Modifier {fieldToEdit}</h3>
        <input
          type={fieldType} // Utilise fieldType pour déterminer le type d'entrée
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          className='w-full p-2 border rounded-lg mb-4'
        />
        <div className='flex justify-end space-x-4'>
          <button onClick={onClose} className='bg-gray-300 px-4 py-2 rounded-lg'>
            Annuler
          </button>
          <button onClick={handleSave} className='bg-blue-600 text-white px-4 py-2 rounded-lg'>
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
