import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import GradientBackground from '../components/GradientBackground';
import { colors } from '../constants/colors';

const MapViewerScreen = () => {
  const handleClearMap = () => {
    // Handle clear map logic
    console.log('Clearing map');
  };

  const handleSaveMap = () => {
    // Handle save map logic
    console.log('Saving map');
  };

  const handleRefresh = () => {
    // Handle refresh logic
    console.log('Refreshing map');
  };

  return (
    <GradientBackground>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
            <Icon name="refresh" size={24} color={colors.accent} />
          </TouchableOpacity>
        </View>

        <Card style={styles.mapCard}>
          <Card.Content style={styles.mapContent}>
            <View style={styles.mapPlaceholder}>
              <Icon name="map" size={64} color={colors.textSecondary} />
              <Text style={styles.mapPlaceholderText}>Robot Map Preview</Text>
              <Text style={styles.mapSubtext}>
                Current map visualization will appear here
              </Text>
            </View>
          </Card.Content>
        </Card>

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={handleClearMap}
            style={styles.button}
            buttonColor={colors.error}
            textColor={colors.text}
            icon="delete"
          >
            Clear Map
          </Button>
          <Button
            mode="contained"
            onPress={handleSaveMap}
            style={styles.button}
            buttonColor={colors.accent}
            textColor={colors.primary}
            icon="content-save"
          >
            Save Map
          </Button>
        </View>
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  refreshButton: {
    backgroundColor: colors.cardBackground,
    padding: 12,
    borderRadius: 8,
    elevation: 2,
  },
  mapCard: {
    flex: 1,
    backgroundColor: colors.cardBackground,
    elevation: 4,
    borderRadius: 12,
    marginBottom: 20,
  },
  mapContent: {
    flex: 1,
    padding: 20,
  },
  mapPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPlaceholderText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  mapSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
});

export default MapViewerScreen;
