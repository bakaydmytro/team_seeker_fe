import { API_URL, fetchRequest } from "./FetchRequest";

export const getUserData = () => {
  return fetchRequest
    .get(`${API_URL}/api/me`)
    .then((response) => response.data)
    .catch((error) => error.response);
};

export const updateUserDataField = async (field, value, id) => {
  return fetchRequest
    .put(`${API_URL}/api/${id}`, { [field]: value })
    .then((response) => response.data)
    .catch((error) => error.response);
};

export const signupUser = async (userData) => {
  return fetchRequest
    .post(`${API_URL}/api/users/signup`, userData)
    .then((response) => response.data)
    .catch((error) => error.response);
};

export const loginUser = async (userData) => {
  return fetchRequest
    .post(`${API_URL}/api/users/login`, userData)
    .then((response) => response.data)
    .catch((error) => error.response);
};
