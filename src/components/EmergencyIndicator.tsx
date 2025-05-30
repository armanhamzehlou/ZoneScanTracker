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

  useEffect(() => {
    if (isActive) {
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
      blinkValue.setValue(1);
    }
  }, [isActive]);

  return (
    <View style={[styles.container, { opacity: isActive ? 1 : 0.3 }]}>
      <Animated.View 
        style={[
          styles.content,
          { opacity: isActive ? blinkValue : 1 }
        ]}
      >
        <Icon 
          name={isActive ? "stop-circle" : "check-circle"} 
          size={16} 
          color={isActive ? colors.error : colors.success} 
        />
        <Text style={[styles.text, { color: isActive ? colors.error : colors.success }]}>
          {isActive ? "EMERGENCY STOP ACTIVE" : "SYSTEM OPERATIONAL"}
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 40,
    right: 16,
    backgroundColor: colors.surface,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    zIndex: 1000,
    elevation: 4,
    borderWidth: 1,
    borderColor: colors.textSecondary,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 6,
    letterSpacing: 0.3,
  },
});

export default EmergencyIndicator;