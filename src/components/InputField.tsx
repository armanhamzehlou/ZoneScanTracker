import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Text, HelperText } from 'react-native-paper';
import { colors } from '../constants/colors';

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  multiline?: boolean;
  error?: string;
  required?: boolean;
  keyboardType?: 'default' | 'numeric' | 'email-address';
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
  error,
  required = false,
  keyboardType = 'default',
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}>*</Text>}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        multiline={multiline}
        numberOfLines={multiline ? 3 : 1}
        style={styles.input}
        theme={{
          colors: {
            primary: colors.accent,
            text: colors.text,
            placeholder: colors.placeholder,
            background: colors.cardBackground,
            outline: colors.textSecondary,
          },
        }}
        keyboardType={keyboardType}
        error={!!error}
      />
      {error && (
        <HelperText type="error" style={styles.errorText}>
          {error}
        </HelperText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 8,
    fontWeight: '500',
  },
  required: {
    color: colors.error,
  },
  input: {
    backgroundColor: colors.cardBackground,
  },
  errorText: {
    color: colors.error,
  },
});

export default InputField;
