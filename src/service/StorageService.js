export const saveTokens = (accessToken, refreshToken) => {
  localStorage.setItem("token", accessToken);
};

export const saveUserId = (id) => {
  localStorage.setItem("id", id);
};

export const deleteTokens = () => {
  localStorage.removeItem("token");
};

export const deleteUserId = () => {
  localStorage.removeItem("id");
};

export const deleteUserStorage = () => {
  deleteTokens();
  deleteUserId();
};

export const getAccessToken = () => {
  return localStorage.getItem("token");
};

export const getUserId = () => {
  return localStorage.getItem("id");
};

export const UserLoggedIn = () => {
  const userId = getUserId();
  return userId !== null ? Number(userId) : null;
};
