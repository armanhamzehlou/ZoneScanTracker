import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Modal, Portal, Card, Text, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../constants/colors';

interface NavigationDialogProps {
  visible: boolean;
  onStop: () => void;
}

const NavigationDialog: React.FC<NavigationDialogProps> = ({
  visible,
  onStop,
}) => {
  const [pulseAnim] = useState(new Animated.Value(1));
  const [rotateAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      // Pulse animation
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      );

      // Rotation animation
      const rotateAnimation = Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        })
      );

      pulseAnimation.start();
      rotateAnimation.start();

      return () => {
        pulseAnimation.stop();
        rotateAnimation.stop();
      };
    }
  }, [visible, pulseAnim, rotateAnim]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Portal>
      <Modal
        visible={visible}
        dismissable={false}
        contentContainerStyle={styles.modal}
      >
        <Card style={styles.card}>
          <Card.Content style={styles.content}>
            <View style={styles.iconContainer}>
              <Animated.View
                style={[
                  styles.pulseContainer,
                  { transform: [{ scale: pulseAnim }] }
                ]}
              >
                <View style={styles.outerRing} />
                <View style={styles.middleRing} />
                <Animated.View
                  style={[
                    styles.innerIcon,
                    { transform: [{ rotate }] }
                  ]}
                >
                  <Icon name="navigation" size={32} color={colors.accent} />
                </Animated.View>
              </Animated.View>
            </View>
            
            <Text style={styles.title}>Navigating to Base</Text>
            <Text style={styles.message}>
              Robot is returning to the charging station.{'\n'}
              You can stop the navigation at any time.
            </Text>
            
            <View style={styles.statusContainer}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Navigation Active</Text>
            </View>
            
            <Button
              mode="contained"
              onPress={onStop}
              style={styles.stopButton}
              buttonColor={colors.error}
              textColor={colors.text}
              icon="stop"
            >
              Stop Navigation
            </Button>
          </Card.Content>
        </Card>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 20,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    elevation: 8,
  },
  content: {
    alignItems: 'center',
    padding: 24,
  },
  iconContainer: {
    marginBottom: 24,
  },
  pulseContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 120,
  },
  outerRing: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: colors.navigationIndicator,
    opacity: 0.3,
  },
  middleRing: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: colors.navigationIndicator,
    opacity: 0.6,
  },
  innerIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.cardBackground,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.accent,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: colors.cardBackground,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.navigationIndicator,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  stopButton: {
    paddingVertical: 4,
    minWidth: 160,
    elevation: 2,
  },
});

export default NavigationDialog;