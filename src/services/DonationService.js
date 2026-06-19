import api from '../api/axios';

export const donate = async (donationData) => {
  const token = localStorage.getItem('token');

  const response = await api.post(
    '/donations',
    donationData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};