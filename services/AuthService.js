import axios from 'axios';
import { REACT_APP_AUTH_API_URL, REACT_APP_API_KEY } from '@env';

async function authenticate(mode, email, password) {
  const response = await axios.post(
    `${REACT_APP_AUTH_API_URL}accounts:${mode}?key=${REACT_APP_API_KEY}`,
    {
      email,
      password,
      returnSecureToken: true
    }
  );

  return response.data.idToken; // token
}

function loginUser(email, password) {
  return authenticate('signInWithPassword', email, password);
}

function createUser(email, password) {
  return authenticate('signUp', email, password);
}

export default {
  loginUser,
  createUser
};
