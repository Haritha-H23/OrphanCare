import api from '../api/axios';

export const getAllChildren = async () => {
  const response = await api.get('/children');
  return response.data;
};