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
  const users = getUsers();
  for (const user of users) {
    if (username === user.username && password === user.password) {
      setUser(username);
      return true;
    }
  }
  return false;
}

function saveUser(username, password) {
  const users = getUsers();

  // Check if username already exists
  if (users.some(user => user.username === username)) {
    return false; // Username exists, cannot save the user
  }

  // Add new user to array and save back to local storage
  users.push({ username, password });
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
