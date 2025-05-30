import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import GradientBackground from '../components/GradientBackground';
import InputField from '../components/InputField';
import { colors } from '../constants/colors';

const AddZoneScreen = () => {
  const navigation = useNavigation();
  const [zoneName, setZoneName] = useState('');
  const [zoneDescription, setZoneDescription] = useState('');
  const [nameError, setNameError] = useState('');

  const handleSave = () => {
    if (!zoneName.trim()) {
      setNameError('Zone name is required');
      return;
    }
    
    // Handle save logic
    console.log('Saving zone:', { zoneName, zoneDescription });
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <GradientBackground>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <InputField
            label="Zone Name"
            value={zoneName}
            onChangeText={(text) => {
              setZoneName(text);
              if (nameError) setNameError('');
            }}
            placeholder="Enter zone name"
            required
            error={nameError}
          />
          
          <InputField
            label="Zone Description"
            value={zoneDescription}
            onChangeText={setZoneDescription}
            placeholder="Optional description"
            multiline
          />
          
          <View style={styles.buttonContainer}>
            <Button
              mode="outlined"
              onPress={handleCancel}
              style={styles.button}
              textColor={colors.textSecondary}
            >
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={handleSave}
              style={styles.button}
              buttonColor={colors.accent}
              textColor={colors.primary}
            >
              Save Zone
            </Button>
          </View>
        </View>
      </ScrollView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
});

export default AddZoneScreen;
