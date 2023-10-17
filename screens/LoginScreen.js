import { useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import AuthService from '../services/AuthService';
import { Alert } from 'react-native';

function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function loginHandler({ email, password }) {
    setIsLoading(true);
    try {
      const response = await AuthService.loginUser(email, password);
      console.log('response', response);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  if (error)
    Alert.alert(
      'Authentication failed!',
      'Please check your credentials and try again.',
      [{ text: 'Okay', onPress: () => setError(null) }]
    );
  if (isLoading) return <LoadingOverlay message="Creating account..." />;

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
