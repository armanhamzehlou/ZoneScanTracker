import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../constants/colors';

interface GradientBackgroundProps {
  children: React.ReactNode;
  style?: any;
}

const GradientBackground: React.FC<GradientBackgroundProps> = ({ children, style }) => {
  // Use solid background on mobile for better compatibility
  if (Platform.OS === 'android' || Platform.OS === 'ios') {
    return (
      <SafeAreaView style={[styles.container, styles.fallbackBackground, style]}>
        {children}
      </SafeAreaView>
    );
  }

  return (
    <LinearGradient
      colors={[colors.gradientStart, colors.gradientEnd]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container, style]}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fallbackBackground: {
    backgroundColor: colors.background,
  },
});

export default GradientBackground;