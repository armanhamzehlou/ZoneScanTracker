import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Modal, Portal, Card, Text, Button, RadioButton } from 'react-native-paper';
import { colors } from '../constants/colors';

interface Option {
  label: string;
  value: string;
}

interface ModalSelectorProps {
  visible: boolean;
  title: string;
  options: Option[];
  selectedValue: string;
  onSelect: (value: string) => void;
  onDismiss: () => void;
  onSave: () => void;
}

const ModalSelector: React.FC<ModalSelectorProps> = ({
  visible,
  title,
  options,
  selectedValue,
  onSelect,
  onDismiss,
  onSave,
}) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modal}
      >
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.divider} />
            
            <RadioButton.Group onValueChange={onSelect} value={selectedValue}>
              {options.map((option) => (
                <View key={option.value} style={styles.option}>
                  <RadioButton.Item
                    label={option.label}
                    value={option.value}
                    color={colors.accent}
                    uncheckedColor={colors.textSecondary}
                    labelStyle={styles.optionLabel}
                    style={styles.radioItem}
                  />
                </View>
              ))}
            </RadioButton.Group>
          </Card.Content>
          
          <Card.Actions style={styles.actions}>
            <Button
              mode="outlined"
              onPress={onDismiss}
              textColor={colors.textSecondary}
              style={styles.button}
            >
              Close
            </Button>
            <Button
              mode="contained"
              onPress={onSave}
              buttonColor={colors.accent}
              textColor={colors.primary}
              style={styles.button}
            >
              Save
            </Button>
          </Card.Actions>
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
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: colors.textSecondary,
    marginBottom: 16,
  },
  option: {
    marginVertical: 4,
  },
  optionLabel: {
    color: colors.text,
  },
  radioItem: {
    paddingVertical: 8,
  },
  actions: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  button: {
    minWidth: 100,
  },
});

export default ModalSelector;
