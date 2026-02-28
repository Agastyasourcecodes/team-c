import React, { useEffect, useState } from 'react';
import { usePetitions } from '../context/PetitionContext';
import PetitionCard from '../components/PetitionCard';
import CreatePetition from '../components/CreatePetition';
import './PetitionsPage.css';

const PetitionsPage = () => {
  const { petitions, loading, error, fetchPetitions, user } = usePetitions();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPetitions();
  }, []);

  const filteredPetitions = petitions.filter(petition => {
    // Filter by status
    if (filter !== 'all' && petition.status !== filter) {
      return false;
    }
    
    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return petition.title.toLowerCase().includes(searchLower) ||
             petition.description.toLowerCase().includes(searchLower) ||
             petition.category.toLowerCase().includes(searchLower) ||
             petition.location.toLowerCase().includes(searchLower);
    }
    
    return true;
  });

  return (
    <div className="petitions-page">
      <div className="page-header">
        <h1>Petitions</h1>
        {user && (
          <button 
            className="create-btn"
            onClick={() => setShowCreateModal(true)}
          >
            Create Petition
          </button>
        )}
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search petitions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Petitions</option>
          <option value="active">Active</option>
          <option value="under_review">Under Review</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {loading && <div className="loading">Loading petitions...</div>}
      {error && <div className="error">{error}</div>}

      <div className="petitions-list">
        {filteredPetitions.length > 0 ? (
          filteredPetitions.map(petition => (
            <PetitionCard key={petition._id} petition={petition} />
          ))
        ) : (
          !loading && <p className="no-petitions">No petitions found</p>
        )}
      </div>

      {showCreateModal && (
        <CreatePetition onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
};

export default PetitionsPage;