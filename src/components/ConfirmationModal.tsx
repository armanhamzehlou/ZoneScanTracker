import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Modal, Portal, Card, Text, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../constants/colors';

interface ConfirmationModalProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: 'warning' | 'danger' | 'info';
  icon?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  title,
  message,
  confirmText = 'Yes',
  cancelText = 'No',
  onConfirm,
  onCancel,
  type = 'info',
  icon,
}) => {
  const scaleValue = new Animated.Value(0.8);

  React.useEffect(() => {
    if (visible) {
      Animated.spring(scaleValue, {
        toValue: 1,
        tension: 300,
        friction: 7,
        useNativeDriver: true,
      }).start();
    } else {
      scaleValue.setValue(0.8);
    }
  }, [visible]);

  const getIconColor = () => {
    switch (type) {
      case 'danger':
        return colors.error;
      case 'warning':
        return colors.warning;
      default:
        return colors.accent;
    }
  };

  const getIconName = () => {
    if (icon) return icon;
    switch (type) {
      case 'danger':
        return 'alert-circle';
      case 'warning':
        return 'alert';
      default:
        return 'help-circle';
    }
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onCancel}
        contentContainerStyle={styles.modal}
      >
        <Animated.View style={[styles.animatedContainer, { transform: [{ scale: scaleValue }] }]}>
          <Card style={styles.card}>
            <Card.Content style={styles.content}>
              <View style={styles.iconContainer}>
                <Icon 
                  name={getIconName()} 
                  size={48} 
                  color={getIconColor()} 
                />
              </View>
              
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.message}>{message}</Text>
              
              <View style={styles.buttonContainer}>
                <Button
                  mode="outlined"
                  onPress={onCancel}
                  style={[styles.button, styles.cancelButton]}
                  labelStyle={styles.cancelButtonText}
                >
                  {cancelText}
                </Button>
                <Button
                  mode="contained"
                  onPress={onConfirm}
                  style={[styles.button, styles.confirmButton]}
                  buttonColor={type === 'danger' ? colors.error : colors.accent}
                  labelStyle={styles.confirmButtonText}
                >
                  {confirmText}
                </Button>
              </View>
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
  },
  content: {
    alignItems: 'center',
    padding: 24,
  },
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
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
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
    borderRadius: 8,
  },
  cancelButton: {
    borderColor: colors.textSecondary,
    backgroundColor: 'transparent',
  },
  confirmButton: {
    elevation: 2,
  },
  cancelButtonText: {
    color: colors.textSecondary,
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ConfirmationModal;