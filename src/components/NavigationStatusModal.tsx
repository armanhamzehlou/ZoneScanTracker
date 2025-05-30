import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Modal, Portal, Card, Text, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../constants/colors';

interface NavigationStatusModalProps {
  visible: boolean;
  onStop: () => void;
}

const NavigationStatusModal: React.FC<NavigationStatusModalProps> = ({
  visible,
  onStop,
}) => {
  const pulseValue = new Animated.Value(1);
  const scaleValue = new Animated.Value(0.8);

  useEffect(() => {
    if (visible) {
      // Scale animation for modal entrance
      Animated.spring(scaleValue, {
        toValue: 1,
        tension: 300,
        friction: 7,
        useNativeDriver: true,
      }).start();

      // Pulse animation for navigation icon
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseValue, {
            toValue: 1.2,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseValue, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      );
      pulseAnimation.start();

      return () => {
        pulseAnimation.stop();
      };
    } else {
      scaleValue.setValue(0.8);
      pulseValue.setValue(1);
    }
  }, [visible]);

  return (
    <Portal>
      <Modal
        visible={visible}
        dismissable={false}
        contentContainerStyle={styles.modal}
      >
        <Animated.View style={[styles.animatedContainer, { transform: [{ scale: scaleValue }] }]}>
          <Card style={styles.card}>
            <Card.Content style={styles.content}>
              <Animated.View 
                style={[
                  styles.iconContainer,
                  { transform: [{ scale: pulseValue }] }
                ]}
              >
                <Icon 
                  name="navigation" 
                  size={64} 
                  color={colors.navigationIndicator} 
                />
              </Animated.View>
              
              <Text style={styles.title}>Navigating to Base</Text>
              <Text style={styles.message}>
                The robot is returning to its base station.{'\n'}
                You can stop this navigation at any time.
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
                labelStyle={styles.stopButtonText}
                icon="stop"
              >
                Stop Navigation
              </Button>
            </Card.Content>
          </Card>
        </Animated.View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  animatedContainer: {
    width: '100%',
  },
  card: {
    backgroundColor: colors.surfaceDark,
    borderRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: colors.navigationIndicator,
  },
  content: {
    alignItems: 'center',
    padding: 24,
  },
  iconContainer: {
    marginBottom: 20,
    padding: 16,
    borderRadius: 50,
    backgroundColor: colors.cardBackground,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.cardBackground,
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
    color: colors.navigationIndicator,
    fontWeight: '600',
  },
  stopButton: {
    paddingHorizontal: 24,
    paddingVertical: 4,
    borderRadius: 8,
    elevation: 2,
  },
  stopButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
});

export default NavigationStatusModal;