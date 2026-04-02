import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/polls`;
// Helper to attach JWT token for authenticated routes
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const createPoll = (pollData) => axios.post(`${API_URL}`, pollData, getAuthHeaders());
export const getActivePolls = () => axios.get(`${API_URL}`);
export const submitVote = (pollId, voteData) => axios.post(`${API_URL}/${pollId}/vote`, voteData, getAuthHeaders());
export const updatePoll = (pollId, pollData) => axios.put(`${API_URL}/${pollId}`, pollData, getAuthHeaders());
export const deletePoll = (pollId) => axios.delete(`${API_URL}/${pollId}`, getAuthHeaders());