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
  const users = getUsers();

  if (users.some(user => user.username === newUser.username)) {
    return false; 
  }


  const userWithDate = {
    ...newUser,
    joinDate: new Date().toISOString() // Store the join date in ISO format
  };

  users.push(userWithDate);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return true;
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
