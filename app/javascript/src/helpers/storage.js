const setToLocalStorage = ({ email, userId, userFirstName }) => {
  localStorage.setItem("authEmail", email);
  localStorage.setItem("authId", userId);
  localStorage.setItem("authUserFirstName", userFirstName);
};

const getFromLocalStorage = key => {
  return localStorage.getItem(key);
};

export { setToLocalStorage, getFromLocalStorage };
