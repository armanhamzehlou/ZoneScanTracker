import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Modal, Portal, Card, Text, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../constants/colors';

interface ConfirmationDialogProps {
  visible: boolean;
  title: string;
  message: string;
  icon: string;
  iconColor: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
  danger?: boolean;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  visible,
  title,
  message,
  icon,
  iconColor,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  danger = false,
}) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onCancel}
        contentContainerStyle={styles.modal}
      >
        <Card style={styles.card}>
          <Card.Content style={styles.content}>
            <View style={styles.iconContainer}>
              <Icon name={icon} size={48} color={iconColor} />
            </View>
            
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
            
            <View style={styles.buttons}>
              <Button
                mode="outlined"
                onPress={onCancel}
                style={[styles.button, styles.cancelButton]}
                textColor={colors.textSecondary}
              >
                {cancelText}
              </Button>
              <Button
                mode="contained"
                onPress={onConfirm}
                style={[styles.button, styles.confirmButton]}
                buttonColor={danger ? colors.error : colors.accent}
                textColor={danger ? colors.text : colors.primary}
              >
                {confirmText}
              </Button>
            </View>
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
    backgroundColor: colors.cardBackground,
    borderRadius: 50,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
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
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
  cancelButton: {
    borderColor: colors.textSecondary,
  },
  confirmButton: {
    elevation: 2,
  },
});

export default ConfirmationDialog;