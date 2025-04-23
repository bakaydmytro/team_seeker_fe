import { API_URL, fetchRequest } from "./FetchRequest";
import axios from "axios";
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

export const getAllUsersData = async (username = "", appid) => {
  console.log("GET Request to:", `${API_URL}/api/users/search?query=${username}&appid=${appid}`);

  try {
    const encodedUsername = encodeURIComponent(username);  
    const response = await fetchRequest.get(`${API_URL}/api/users/search?query=${encodedUsername}&appid=${appid}`);

    console.log("API Response (getAllUsersData):", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error (getAllUsersData):", error.response);
    return { data: [] };  
  }
};




export const updateUserDataField = async (field, value, id) => {
  console.log("PUT Request to:", `${API_URL}/api/users/${id}`);
  console.log("Payload:", JSON.stringify({ [field]: value }));

  try {
    const response = await fetchRequest.put(`${API_URL}/api/users/${id}`, { [field]: value });
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

// export const UpdateUserAvatar = async (userData) => {
//   console.log("POST Request to:", `${API_URL}/api/users/avatar`);
//   console.log("Payload:", JSON.stringify(userData));

//   try {
//     const response = await fetchRequest.put(`${API_URL}/api/users/avatar`, userData);
//     console.log("API Response (signupUser):", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("API Error (signupUser):", error.response);
//     return error.response;
//   }
// };

export const UpdateUserAvatar = async (formData) => {
  console.log("PUT Request to:", `${API_URL}/api/users/avatar`);
  console.log("Payload: FormData");

  try {
    const response = await axios.put(`${API_URL}/api/users/avatar`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log("API Response (UpdateUserAvatar):", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error (UpdateUserAvatar):", error.response);
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


export const sendRequestFriend = async (addresseeId) => {
  console.log("POST Request to:", `${API_URL}/api/friends/request`);
  try {
    const response = await fetchRequest.post(`${API_URL}/api/friends/request`, 
      {
        addressee_id: addresseeId
      }
    );
    console.log("API Response (sendRequestFriend):", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error (sendRequestFriend):", error.response);
    return error.response;
  }
};

export const getAllFriends = async () => {
  console.log("POST Request to:", `${API_URL}/api/users/friends`);

  try {
    const response = await fetchRequest.get(`${API_URL}/api/users/friends`
    );
    console.log("API Response (getAllFriends):", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error (getAllFriends):", error.response);
    return error.response;
  }
};


export const getRequestFriend = async () => {
  console.log("POST Request to:", `${API_URL}/api/users/requests`);

  try {
    const response = await fetchRequest.get(`${API_URL}/api/users/requests`
    );
    console.log("API Response (sendRequestFriend):", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error (sendRequestFriend):", error.response);
    return error.response;
  }
};

export const acceptRequestFriend = async (requester_id) => {
  console.log("POST Request to:", `${API_URL}/api/friends/request`);
  try {
    const response = await fetchRequest.post(`${API_URL}/api/friends/accept`, 
      {
        requester_id
      }
    );
    console.log("API Response (acceptRequestFriend):", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error (acceptRequestFriend):", error.response);
    return error.response;
  }
};

export const rejectRequestFriend = async (requester_id) => {
  try {
    const response = await fetchRequest.delete(
      `${API_URL}/api/friends/reject?requester_id=${requester_id}`
    );
    return response.data;
  } catch (error) {
    console.error("API Error (rejectRequestFriend):", error.response);
    return error.response;
  }
};




export const steamRedirect = async () => {
  window.location.href = `${API_URL}/api/users/steam`;
  const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

  try {
    const response = await fetchRequest.get(`${API_URL}/api/users/steam`);
    console.log("API Response (steam):", response.data);
    if (token) {
      localStorage.setItem("token", token);
      window.history.replaceState(null, "", window.location.pathname);
      // navigate("/ProfilePage"); 
    }
    return response.data;
  } catch (error) {
    console.error("API Error (steam):", error.response);
    return error.response;
  }
};

