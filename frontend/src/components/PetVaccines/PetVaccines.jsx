import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../data/constants';

const PetVaccines = ({ pet }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef();
  const [vaccines, setVaccines] = useState([]);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    setVaccines(pet.vaccines);
  }, [pet.vaccines]);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleCloseModal = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setModalOpen(false);
    }
  };

  const handleVaccineChange = (index, field, value) => {
    const updatedVaccines = [...vaccines];
    updatedVaccines[index][field] = value;
    setVaccines(updatedVaccines);
  };

  const handleCreateVaccine = () => {
    const newVaccine = { name: '', date: '', next_dosis: '' };
    setVaccines([...vaccines, newVaccine]);
  };

  const handleDeleteVaccine = (index) => {
    const updatedVaccines = [...vaccines];
    updatedVaccines.splice(index, 1);
    setVaccines(updatedVaccines);
  };

  const handleUpdateVaccines = async () => {
    console.log('Vaccines:', vaccines);

    try {
      const updatedPet = {
        vaccines: vaccines,
      };

      console.log('Updated Pet:', updatedPet);

      const responseAdoption = await axios.put(
        `${API_URL}/pets/${pet._id}/vaccines`,
        updatedPet
      );

      console.log('Server Response (Vaccines):', responseAdoption.data);

      toggleModal();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='flex'>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white text-xl font-bold py-2 px-4 rounded'
        onClick={toggleModal}
      >
        Vaccines
      </button>

      {modalOpen && (
        <>
          <div className='modal fixed w-full h-full top-0 left-0 flex items-center justify-center z-50'>
            <div
              className='modal-overlay absolute w-full h-full bg-gray-900 opacity-50'
              onClick={() => setShowModal(false)}
            ></div>

            <div className='modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto'>
              <div className='modal-content py-4 text-left px-6'>
                <div className='modal-header'>
                  <h3 className='text-2xl font-bold'>Edit Vaccines</h3>
                </div>

                <div className='modal-body'>
                  <ul>
                    {Array.isArray(vaccines) && vaccines.length > 0 ? (
                      vaccines.map((vaccine, index) => (
                        <div key={index} className='flex'>
                          <div>
                            <label>Vaccine Name:</label>
                            <input
                              type='text'
                              value={vaccine.name}
                              onChange={(e) =>
                                handleVaccineChange(index, 'name', e.target.value)
                              }
                              className='border rounded-md px-2 py-1 mt-2'
                            />
                            <br></br>
                            <label>Date:</label>
                            <input
                              type='text'
                              value={vaccine.date}
                              onChange={(e) =>
                                handleVaccineChange(index, 'date', e.target.value)
                              }
                              className='border rounded-md px-2 py-1 mt-2'
                            />
                            <br></br>
                            <label>Next Dose:</label>
                            <input
                              type='text'
                              value={vaccine.next_dosis}
                              onChange={(e) =>
                                handleVaccineChange(index, 'next_dosis', e.target.value)
                              }
                              className='border rounded-md px-2 py-1 mt-2'
                            />
                            <button
                              onClick={() => handleDeleteVaccine(index)}
                              className='bg-red-500 text-white font-semibold py-1 px-2 rounded-md ml-2'
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No vaccines found.</p>
                    )}
                  </ul>
                </div>
                <div>
                  <button
                    onClick={handleCreateVaccine}
                    className='bg-blue-500 text-white font-semibold py-2 px-4 rounded-md mx-2 my-4'
                  >
                    New
                  </button>
                </div>
              </div>
              <div className='modal-footer justify-end'>
                <button
                  onClick={handleUpdateVaccines}
                  className='bg-green-500 text-white font-semibold py-2 px-4 rounded-md mr-2'
                >
                  Confirm
                </button>
                <button
                  onClick={(handleCloseModal, toggleModal)}
                  className='bg-red-500 text-white font-semibold py-2 px-4 rounded-md'
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PetVaccines;
