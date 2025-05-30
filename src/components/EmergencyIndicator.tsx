import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../constants/colors';

interface EmergencyIndicatorProps {
  isActive: boolean;
}

const EmergencyIndicator: React.FC<EmergencyIndicatorProps> = ({ isActive }) => {
  const blinkValue = new Animated.Value(1);
  const slideValue = new Animated.Value(-100);

  useEffect(() => {
    if (isActive) {
      // Slide in animation
      Animated.timing(slideValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Blinking animation
      const blinkAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(blinkValue, {
            toValue: 0.3,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(blinkValue, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      );
      blinkAnimation.start();

      return () => {
        blinkAnimation.stop();
      };
    } else {
      // Slide out animation
      Animated.timing(slideValue, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }).start();
      blinkValue.setValue(1);
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <Animated.View 
      style={[
        styles.container,
        { 
          transform: [{ translateY: slideValue }],
          opacity: blinkValue 
        }
      ]}
    >
      <View style={styles.content}>
        <Icon name="alert-octagon" size={24} color={colors.text} />
        <Text style={styles.text}>EMERGENCY STOP ACTIVE</Text>
        <Icon name="stop-circle" size={24} color={colors.text} />
      </View>
      <Text style={styles.subtext}>Robot operations are disabled</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.emergencyActive,
    paddingVertical: 12,
    paddingHorizontal: 20,
    zIndex: 1000,
    elevation: 10,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  text: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
    marginHorizontal: 12,
    letterSpacing: 1,
  },
  subtext: {
    fontSize: 12,
    color: colors.text,
    textAlign: 'center',
    opacity: 0.9,
  },
});

export default EmergencyIndicator;