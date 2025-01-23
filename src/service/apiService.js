import axiosInstance from './axiosService';

export const getUserData = () => {
  return axiosInstance.get('/me');
};



export const changePassword = async (id,password) => {
  return  axiosInstance.post( "/:id", {
      id: id,
      password: password,
  }).then((response) => {
      return response.data
  });
};

export const changeEmail = () => {
  return axiosInstance.post('/:id');
};