import { API_URL, fetchRequest } from "./FetchRequest";

export const getUserData = async () => {
  console.log("GET Request to:", `${API_URL}/api/users/me`);

  try {
    const response = await fetchRequest.get(`${API_URL}/api/users/me`);
    console.log("API Response (getUserData):", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error (getUserData):", error.response);
    return error.response;
  }
};

export const getAllUsersData = async (username = "") => {
  console.log("GET Request to:", `${API_URL}/api/users/search?query=${username}`);

  try {
    const encodedUsername = encodeURIComponent(username);  
    const response = await fetchRequest.get(`${API_URL}/api/users/search?query=${encodedUsername}`);

    console.log("API Response (getAllUsersData):", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error (getAllUsersData):", error.response);
    return { data: [] };  
  }
};


export const updateUserDataField = async (field, value, id) => {
  console.log("PUT Request to:", `${API_URL}/api/${id}`);
  console.log("Payload:", JSON.stringify({ [field]: value }));

  try {
    const response = await fetchRequest.put(`${API_URL}/api/${id}`, { [field]: value });
    console.log("API Response (updateUserDataField):", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error (updateUserDataField):", error.response);
    return error.response;
  }
};

export const signupUser = async (userData) => {
  console.log("POST Request to:", `${API_URL}/api/users/signup`);
  console.log("Payload:", JSON.stringify(userData));

  try {
    const response = await fetchRequest.post(`${API_URL}/api/users/signup`, userData);
    console.log("API Response (signupUser):", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error (signupUser):", error.response);
    return error.response;
  }
};

export const loginUser = async (userData) => {
  console.log("POST Request to:", `${API_URL}/api/users/login`);
  console.log("Payload:", JSON.stringify(userData));

  try {
    const response = await fetchRequest.post(`${API_URL}/api/users/login`, userData);
    console.log("API Response (loginUser):", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error (loginUser):", error.response);
    return error.response;
  }
};
