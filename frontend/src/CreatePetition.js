import React, { useState } from 'react';
import { usePetitions } from './PetitionContext';
import './CreatePetition.css';

const CreatePetition = ({ onClose }) => {
  const { createNewPetition, user } = usePetitions();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Environment',
    location: '',
    signatureGoal: 100
  });

  const categories = [
    'Environment',
    'Education',
    'Healthcare',
    'Infrastructure',
    'Women Safety',
    'Other'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please login to create a petition');
      return;
    }

    setIsSubmitting(true);
    const result = await createNewPetition(formData);
    setIsSubmitting(false);

    if (result.success) {
      alert('Petition created successfully! It is currently under review.');
      onClose();
    } else {
      alert(result.error || 'Failed to create petition');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create New Petition</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              maxLength="200"
              required
            />
          </div>

          <div className="form-group">
            <label>Description (optional):</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              /* required and minLength are removed from here! */
            />
          </div>

          <div className="form-group">
            <label>Category:</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Signature Goal:</label>
            <input
              type="number"
              name="signatureGoal"
              value={formData.signatureGoal}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          <div className="modal-actions">
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Petition'}
            </button>
            <button type="button" onClick={onClose} className="cancel-btn" disabled={isSubmitting}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePetition;