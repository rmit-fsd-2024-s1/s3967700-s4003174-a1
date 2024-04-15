const USERS_KEY = "users";
const USER_KEY = "user";

function initUsers() {
  if (localStorage.getItem(USERS_KEY) !== null)
    return;

  const users = [
    {
      
    },
    {
      
    },
  ];

  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getUsers() {
  const data = localStorage.getItem(USERS_KEY);
  return JSON.parse(data) || [];
}

function verifyUser(username, password) {

  const users = JSON.parse(localStorage.getItem('users')) || [];

  const userExists = users.find(user => user.username === username && user.password === password);

  if (userExists) {

    setUser(username);
    return true;
  }
  return false;
}


function saveUser(newUser) {
  const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];

  if (users.some(user => user.username === newUser.username)) {
    return false; 
  }

  // Add new user to the array and save back to local storage
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return true; // New user successfully saved
}

function setUser(username) {
  localStorage.setItem(USER_KEY, username);
}

function getUser() {
  return localStorage.getItem(USER_KEY);
}

function removeUser() {
  localStorage.removeItem(USER_KEY);
}

export {
  initUsers,
  getUsers, 
  verifyUser,
  getUser,
  removeUser,
  saveUser 
};
