const USER_KEY = 'user';
const TIMEOUT = 1500;
const SUCCESS_STATUS = 'OK';

const readUser = () => JSON.parse(localStorage.getItem(USER_KEY));
const saveUser = (user) => localStorage.setItem(USER_KEY, JSON.stringify(user));

// --------------------------------------------------------------------
// A função simulateRequest simula uma requisição para uma API externa
// --------------------------------------------------------------------

const simulateRequest = (response) => (callback) => {
  setTimeout(() => {
    callback(response);
  }, TIMEOUT);
};

export const getUser = () => new Promise((resolve) => {
  let user = readUser();
  if (user === null) {
    user = {};
  }
  simulateRequest(user)(resolve);
});

export const createUser = (user) => new Promise((resolve) => {
  const emptyUser = {
    username: '',
    email: '',
    password: '',
  };
  saveUser({ ...emptyUser, ...user });
  simulateRequest(SUCCESS_STATUS)(resolve);
});

export const updateUser = (updatedUser) => new Promise((resolve) => {
  saveUser({ ...updatedUser });
  simulateRequest(SUCCESS_STATUS)(resolve);
});
