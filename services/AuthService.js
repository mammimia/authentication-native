import axios from 'axios';
import { REACT_APP_AUTH_API_URL, REACT_APP_API_KEY } from '@env';

async function createUser(email, password) {
  const response = await axios.post(
    `${REACT_APP_AUTH_API_URL}accounts:signUp?key=${REACT_APP_API_KEY}`,
    {
      email,
      password,
      returnSecureToken: true
    }
  );
}

export default {
  createUser
};
