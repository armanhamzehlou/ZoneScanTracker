import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
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
    disabled: colors.disabled,
    placeholder: colors.placeholder,
    backdrop: colors.backdrop,
  },
  dark: true,
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <PaperProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.primary}
        translucent={false}
      />
      {isLoggedIn ? (
        <NavigationContainer>
          <AppNavigator onLogout={() => setIsLoggedIn(false)} />
        </NavigationContainer>
      ) : (
        <LoginScreen onLogin={handleLogin} />
      )}
    </PaperProvider>
  );
}
