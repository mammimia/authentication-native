import { useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import AuthService from '../services/AuthService';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Alert } from 'react-native';

function SignupScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function signupHandler({ email, password }) {
    setIsLoading(true);
    try {
      await AuthService.createUser(email, password);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  if (error) {
    Alert.alert(
      'Authentication failed!',
      'Please check your credentials and try again.',
      [{ text: 'Okay', onPress: () => setError(null) }]
    );
  }
  if (isLoading) return <LoadingOverlay message="Creating account..." />;

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
