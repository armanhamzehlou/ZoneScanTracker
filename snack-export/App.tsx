import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import LoginScreen from './src/screens/LoginScreen';
import { colors } from './src/constants/colors';

const theme = {
  colors: {
    primary: colors.primary,
    accent: colors.accent,
    background: colors.background,
    surface: colors.surface,
    text: colors.text,
  },
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    console.log('Login called in App.tsx');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    console.log('Logout called in App.tsx');
    setIsLoggedIn(false);
  };

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.primary}
          translucent={false}
        />
        {isLoggedIn ? (
          <NavigationContainer>
            <AppNavigator onLogout={handleLogout} />
          </NavigationContainer>
        ) : (
          <LoginScreen onLogin={handleLogin} />
        )}
      </PaperProvider>
    </SafeAreaProvider>
  );
}