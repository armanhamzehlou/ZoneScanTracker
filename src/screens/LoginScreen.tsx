import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { Card, Text, Button, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../constants/colors';

interface LoginScreenProps {
  onLogin: () => void;
}

const { width } = Dimensions.get('window');

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleLogin = async () => {
    setError('');
    setLoading(true);

    // Simulate loading
    setTimeout(() => {
      if (email === 'arman.hamzehlou@globaldws.com' && password === 'arman123') {
        onLogin();
      } else {
        setError('Invalid credentials. Please try again.');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <LinearGradient
      colors={[colors.primaryDark, colors.primary, colors.surfaceLight]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Animated.View
          style={[
            styles.logoContainer,
            { transform: [{ scale: logoScale }] },
          ]}
        >
          <LinearGradient
            colors={[colors.accent, colors.secondary]}
            style={styles.logoBackground}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Icon name="shield-lock" size={48} color={colors.text} />
          </LinearGradient>
          <Text style={styles.companyName}>GlobalDWS</Text>
          <Text style={styles.subtitle}>Cybersecurity & Environmental Scanning</Text>
        </Animated.View>

        <Card style={styles.loginCard}>
          <LinearGradient
            colors={[colors.surface, colors.surfaceDark]}
            style={styles.cardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Card.Content style={styles.cardContent}>
              <Text style={styles.loginTitle}>Secure Access</Text>
              
              <View style={styles.inputContainer}>
                <TextInput
                  label="Email Address"
                  value={email}
                  onChangeText={setEmail}
                  style={styles.input}
                  mode="outlined"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  left={<TextInput.Icon icon="email" />}
                  theme={{
                    colors: {
                      primary: colors.accent,
                      outline: colors.textSecondary,
                      background: colors.surfaceDark,
                      text: colors.text,
                    },
                  }}
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  label="Password"
                  value={password}
                  onChangeText={setPassword}
                  style={styles.input}
                  mode="outlined"
                  secureTextEntry={!showPassword}
                  left={<TextInput.Icon icon="lock" />}
                  right={
                    <TextInput.Icon
                      icon={showPassword ? 'eye-off' : 'eye'}
                      onPress={() => setShowPassword(!showPassword)}
                    />
                  }
                  theme={{
                    colors: {
                      primary: colors.accent,
                      outline: colors.textSecondary,
                      background: colors.surfaceDark,
                      text: colors.text,
                    },
                  }}
                />
              </View>

              {error ? (
                <Text style={styles.errorText}>{error}</Text>
              ) : null}

              <LinearGradient
                colors={[colors.accent, colors.secondary]}
                style={styles.loginButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Button
                  mode="contained"
                  onPress={handleLogin}
                  style={styles.loginButton}
                  labelStyle={styles.loginButtonText}
                  loading={loading}
                  disabled={loading || !email || !password}
                  icon="login"
                >
                  {loading ? 'Authenticating...' : 'Secure Login'}
                </Button>
              </LinearGradient>
            </Card.Content>
          </LinearGradient>
        </Card>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Secure access to VirBrix Control System
          </Text>
          <View style={styles.securityIndicators}>
            <Icon name="shield-check" size={16} color={colors.success} />
            <Text style={styles.securityText}>End-to-End Encrypted</Text>
          </View>
        </View>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoBackground: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    elevation: 8,
  },
  companyName: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    fontWeight: '500',
  },
  loginCard: {
    width: Math.min(width - 48, 400),
    borderRadius: 16,
    elevation: 12,
  },
  cardGradient: {
    borderRadius: 16,
  },
  cardContent: {
    padding: 32,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: colors.surfaceDark,
  },
  errorText: {
    color: colors.error,
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 14,
  },
  loginButtonGradient: {
    borderRadius: 8,
    marginTop: 8,
  },
  loginButton: {
    backgroundColor: 'transparent',
    paddingVertical: 4,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  footer: {
    alignItems: 'center',
    marginTop: 32,
  },
  footerText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  securityIndicators: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  securityText: {
    fontSize: 12,
    color: colors.success,
    marginLeft: 4,
    fontWeight: '600',
  },
});

export default LoginScreen;