import { useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import AuthService from '../services/AuthService';
import LoadingOverlay from '../components/ui/LoadingOverlay';

function SignupScreen() {
  const [isLoading, setIsLoading] = useState(false);

  async function signupHandler({ email, password }) {
    try {
      await AuthService.createUser(email, password);
    } catch (error) {
      console.log(error);
    }
  }

  if (isLoading) return <LoadingOverlay message="Creating account..." />;

  AuthService.createUser('test@test.com', '123456');

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
