import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import GradientBackground from '../components/GradientBackground';
import { colors } from '../constants/colors';

const { width } = Dimensions.get('window');

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('arman.hamzehlou@globaldws.com');
  const [password, setPassword] = useState('arman123');
  const [isLoading, setIsLoading] = useState(false);

  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);
  const logoScale = new Animated.Value(0.8);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 50,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleLogin = async () => {
    if (username.trim() && password.trim()) {
      setIsLoading(true);
      // Simulate authentication delay
      setTimeout(() => {
        setIsLoading(false);
        onLogin();
      }, 1500);
    }
  };

  return (
    <GradientBackground>
      <View style={styles.container}>
        <Animated.View 
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: logoScale }
              ]
            }
          ]}
        >
          <MaterialCommunityIcons 
            name="robot" 
            size={80} 
            color={colors.accent} 
          />
          <Text style={styles.title}>GlobalDWS VirBrix Control</Text>
          <Text style={styles.subtitle}>Robotic System Management</Text>
        </Animated.View>

        <Animated.View 
          style={[
            styles.formContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <TextInput
            label="Email"
            value={username}
            onChangeText={setUsername}
            mode="outlined"
            style={styles.input}
            theme={{
              colors: {
                primary: colors.accent,
                outline: colors.disabled,
                background: colors.surface,
                onSurface: colors.text,
              }
            }}
            textColor={colors.text}
            left={<TextInput.Icon icon="email" iconColor={colors.accent} />}
          />

          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            secureTextEntry
            style={styles.input}
            theme={{
              colors: {
                primary: colors.accent,
                outline: colors.disabled,
                background: colors.surface,
                onSurface: colors.text,
              }
            }}
            textColor={colors.text}
            left={<TextInput.Icon icon="lock" iconColor={colors.accent} />}
          />

          <Button
            mode="contained"
            onPress={handleLogin}
            loading={isLoading}
            disabled={!username.trim() || !password.trim() || isLoading}
            style={styles.loginButton}
            buttonColor={colors.accent}
            textColor={colors.primary}
            contentStyle={styles.buttonContent}
          >
            {isLoading ? 'Authenticating...' : 'Login'}
          </Button>

          <View style={styles.securityNote}>
            <MaterialCommunityIcons 
              name="shield-check" 
              size={16} 
              color={colors.textSecondary} 
            />
            <Text style={styles.securityText}>
              Secure connection to GlobalDWS systems
            </Text>
          </View>
        </Animated.View>
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginTop: 20,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    letterSpacing: 0.5,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  input: {
    marginBottom: 20,
    backgroundColor: colors.surface,
  },
  loginButton: {
    marginTop: 20,
    marginBottom: 30,
    borderRadius: 12,
    elevation: 4,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  securityText: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default LoginScreen;