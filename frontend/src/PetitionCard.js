import React from 'react';
import { usePetitions } from '../context/PetitionContext';
import './PetitionCard.css';

const PetitionCard = ({ petition }) => {
  const { signExistingPetition, user } = usePetitions();

  const handleSign = async () => {
    if (!user) {
      alert('Please login to sign this petition');
      return;
    }
    const result = await signExistingPetition(petition._id);
    if (result.success) {
      alert('Successfully signed the petition!');
    } else {
      alert(result.error || 'Error signing petition');
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'green';
      case 'under_review': return 'orange';
      case 'closed': return 'red';
      default: return 'gray';
    }
  };

  return (
    <div className="petition-card">
      <div className="petition-header">
        <h3>{petition.title}</h3>
        <span className="status" style={{ backgroundColor: getStatusColor(petition.status) }}>
          {petition.status}
        </span>
      </div>
      
      <p className="description">{petition.description.substring(0, 150)}...</p>
      
      <div className="petition-details">
        <p><strong>Category:</strong> {petition.category}</p>
        <p><strong>Location:</strong> {petition.location}</p>
        <p><strong>Created:</strong> {new Date(petition.createdAt).toLocaleDateString()}</p>
      </div>

      <div className="signature-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${(petition.signatureCount / petition.signatureGoal) * 100}%` }}
          ></div>
        </div>
        <p className="signature-count">
          {petition.signatureCount} / {petition.signatureGoal} signatures
        </p>
      </div>

      {petition.status === 'active' && (
        <button 
          onClick={handleSign}
          className="sign-button"
          disabled={petition.creator === user?._id}
        >
          {petition.creator === user?._id ? 'Your Petition' : 'Sign Petition'}
        </button>
      )}
    </div>
  );
};

export default PetitionCard;