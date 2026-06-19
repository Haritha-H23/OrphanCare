import api from '../api/axios';

export const getAllRequirements = async () => {
  const response = await api.get('/requirements');
  return response.data;
};