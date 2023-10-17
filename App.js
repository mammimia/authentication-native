import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { useContext, useEffect, useState } from 'react';
import IconButton from './components/ui/IconButton';
import LoadingOverlay from './components/ui/LoadingOverlay';
import { Colors } from './constants/styles';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import AuthContextProvider, { AuthContext } from './store/AuthContext';

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        cardStyle: { backgroundColor: Colors.primary50 }
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authContext = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        cardStyle: { backgroundColor: Colors.primary100 }
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={authContext.logout}
            />
          )
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authContext = useContext(AuthContext);
  return (
    <NavigationContainer>
      {authContext.isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
function Root() {
  const [isReady, setIsReady] = useState(false);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const token = await AsyncStorage.getItem('token');
      if (token) authContext.authenticate(token);
      setIsReady(true);
    }

    fetchToken();
  }, []);

  if (!isReady) return <LoadingOverlay />;

  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />

      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}
