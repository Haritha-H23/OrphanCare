import api from '../api/axios';

export const getMyDonations = async () => {
  const token = localStorage.getItem('token');

  const response = await api.get('/donations/my', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};

export const getRequirements = async () => {
  const response = await api.get('/requirements');
  return response.data;
};

export const getProfile = async () => {
  const token = localStorage.getItem('token');

  const response = await api.get('/users/profile', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};