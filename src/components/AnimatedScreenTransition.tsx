import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions } from 'react-native';

interface AnimatedScreenTransitionProps {
  children: React.ReactNode;
  isVisible: boolean;
}

const { width } = Dimensions.get('window');

const AnimatedScreenTransition: React.FC<AnimatedScreenTransitionProps> = ({
  children,
  isVisible,
}) => {
  const slideAnim = useRef(new Animated.Value(isVisible ? 0 : width)).current;
  const fadeAnim = useRef(new Animated.Value(isVisible ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: isVisible ? 0 : width,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: isVisible ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isVisible]);

  return (
    <Animated.View
      style={{
        flex: 1,
        transform: [{ translateX: slideAnim }],
        opacity: fadeAnim,
      }}
    >
      {children}
    </Animated.View>
  );
};

export default AnimatedScreenTransition;