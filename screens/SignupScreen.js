import { useContext, useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import AuthService from '../services/AuthService';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Alert } from 'react-native';
import { AuthContext } from '../store/AuthContext';

function SignupScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const authContext = useContext(AuthContext);

  async function signupHandler({ email, password }) {
    setIsLoading(true);
    try {
      const token = await AuthService.createUser(email, password);
      authContext.authenticate(token);
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
