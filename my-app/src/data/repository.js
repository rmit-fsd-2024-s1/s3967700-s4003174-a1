const USERS_KEY = "users";
const USER_KEY = "currentUser";

function initUsers() {
  if (localStorage.getItem(USERS_KEY) !== null)
    return;

  const users = [];
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getUsers() {
  const data = localStorage.getItem(USERS_KEY);
  return JSON.parse(data) || [];
}

function verifyUser(username, password) {
  const users = getUsers();
  const userExists = users.find(user => user.username === username && user.password === password);

  if (userExists) {
    const { password, ...userWithoutPassword } = userExists;
    setUser(userWithoutPassword);
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
    joinDate: new Date().toISOString() 
  };

  users.push(userWithDate);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  setUser(userWithDate); 
  return true;
}

function setUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function getUser() {
  const userString = localStorage.getItem(USER_KEY);
  try {
    return JSON.parse(userString);
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
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
  saveUser,
  setUser
};
