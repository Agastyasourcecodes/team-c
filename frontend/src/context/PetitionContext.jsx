import React, { createContext, useState, useContext, useEffect } from 'react';
import * as api from '../api'; 

const PetitionContext = createContext();

export const usePetitions = () => useContext(PetitionContext);

export const PetitionProvider = ({ children }) => {
  const [petitions, setPetitions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const fetchPetitions = async () => {
    setLoading(true);
    try {
      const { data } = await api.fetchPetitions();
      setPetitions(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching petitions');
    } finally {
      setLoading(false);
    }
  };

  const createNewPetition = async (petitionData) => {
    setLoading(true);
    try {
      const { data } = await api.createPetition(petitionData);
      setPetitions([data.petition, ...petitions]);
      setError(null);
      return { success: true, data: data.petition };
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating petition');
      return { success: false, error: err.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  const signExistingPetition = async (id) => {
    try {
      const { data } = await api.signPetition(id);
      
      // FIX: Yahan voters array ko update karna zaroori hai
      setPetitions(prevPetitions => prevPetitions.map(p => 
        p._id === id ? { 
          ...p, 
          signatureCount: data.currentSignatures,
          // Agar backend voters list bhej raha hai toh wo use karo, 
          // nahi toh manually current user ki ID push kardo state mein
          voters: data.voters || [...(p.voters || []), user?._id],
          status: data.currentSignatures >= p.signatureGoal ? 'active' : p.status
        } : p
      ));

      // Extra Safety: Backend se fresh data sync karlo
      // await fetchPetitions(); 

      return { success: true, data };
    } catch (err) {
      setError(err.response?.data?.message || 'Error signing petition');
      return { success: false, error: err.response?.data?.message };
    }
  };

  const deleteExistingPetition = async (id) => {
    try {
      await api.deletePetition(id);
      setPetitions(petitions.filter(p => p._id !== id));
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || 'Error deleting petition');
      return { success: false, error: err.response?.data?.message };
    }
  };

  const editExistingPetition = async (id, updatedData) => {
    try {
      const { data } = await api.updatePetition(id, updatedData);
      setPetitions(petitions.map(p => p._id === id ? data.petition : p));
      return { success: true, data: data.petition };
    } catch (err) {
      setError(err.response?.data?.message || 'Error editing petition');
      return { success: false, error: err.response?.data?.message };
    }
  };

  return (
    <PetitionContext.Provider value={{
      petitions,
      loading,
      error,
      user,
      setUser,
      fetchPetitions,
      createNewPetition,
      signExistingPetition,
      deleteExistingPetition,
      editExistingPetition 
    }}>
      {children}
    </PetitionContext.Provider>
  );
};