import api from '../api/axios';

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});

export const getRequirements = async () => {
  const response = await api.get('/requirements');
  return response.data;
};

export const addRequirement = async (requirementData) => {
  const response = await api.post(
    '/requirements',
    requirementData,
    getAuthHeaders()
  );

  return response.data;
};

export const updateRequirement = async (id, requirementData) => {
  const response = await api.put(
    `/requirements/${id}`,
    requirementData,
    getAuthHeaders()
  );

  return response.data;
};

export const deleteRequirement = async (id) => {
  await api.delete(
    `/requirements/${id}`,
    getAuthHeaders()
  );
};