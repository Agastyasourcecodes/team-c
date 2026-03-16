import axios from 'axios';

const API_URL = 'http://localhost:5000/api/polls'; // Apne backend port ke hisaab se check karein

export const createPoll = (pollData) => axios.post(`${API_URL}/create`, pollData);
export const getActivePolls = (location) => axios.get(`${API_URL}?location=${location}`);
export const submitVote = (voteData) => axios.post(`${API_URL}/vote`, voteData);