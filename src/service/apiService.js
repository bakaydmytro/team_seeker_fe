import axiosInstance from './axiosService';

export const getUserData = () => {
  return axiosInstance.get('/me');
};


export const updateUserDataField = async (field, value, id) => {
  try {
    const response = await axiosInstance.put(`/${id}`, { [field]: value });
    return response.data;
  } catch (error) {
    console.error(`Failed to update user ${field}:`, error);
    throw error;
  }
};


