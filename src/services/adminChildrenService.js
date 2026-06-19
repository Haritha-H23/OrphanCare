import api from '../api/axios';

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});

export const getChildren = async () => {
  const response = await api.get('/children');
  return response.data;
};

export const addChild = async (childData) => {
  const response = await api.post(
    '/children',
    childData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data'
      }
    }
  );

  return response.data;
};

export const updateChild = async (id, childData) => {
  const response = await api.post(
    `/children/update/${id}`,
    childData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data'
      }
    }
  );

  return response.data;
};
export const deleteChild = async (id) => {
  await api.delete(`/children/${id}`, getAuthHeaders());
};