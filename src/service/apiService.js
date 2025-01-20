import axiosInstance from './axiosService';

export const getUserData = () => {
  return axiosInstance.get('');
};