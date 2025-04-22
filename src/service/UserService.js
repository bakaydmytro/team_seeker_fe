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


// export const getUsersByGame = async (appid, query = "", page = 1, limit = 10) => {
//   // Перевірка на наявність appid
//   if (!appid) {
//     console.error("API Error: appid is required");
//     return { data: [] };
//   }

//   const url = `${API_URL}/api/users/search?query=${encodeURIComponent(query)}&appid=${appid}&page=${page}&limit=${limit}`;
  
//   try {
//     console.log(`GET Request to: ${url}`);
//     const response = await fetchRequest.get(url);
    
//     // Перевірка наявності даних
//     if (response.data && Array.isArray(response.data)) {
//       // Для кожного користувача, додати поле playtime_forever
//       const usersWithPlaytime = response.data.map(user => ({
//         ...user,
//         playtime_forever: user.playtime_forever || 0 // Якщо дані про години відсутні, ставимо 0
//       }));
//       console.log("playtime_forever", usersWithPlaytime);
//       return usersWithPlaytime;
//     } else {
//       console.error("No valid user data found:", response.data);
//       return { data: [] };
//     }
//   } catch (error) {
//     console.error(`API Error (getUsersByGame appid=${appid}):`, error.response || error);
//     return { data: [] };
//   }
// };





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
        // НЕ став `Content-Type`, Axios сам поставить multipart/form-data!
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

// export  const handleSteamLogin = () => {

//   window.location.href = `${API_URL}/api/users/steam`;
// };