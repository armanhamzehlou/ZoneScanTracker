import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import GradientBackground from '../components/GradientBackground';
import { colors } from '../constants/colors';
import { scheduleData } from '../constants/dummyData';

const ScheduleScreen = () => {
  const scheduleTiles = [
    {
      title: 'Schedule Overview',
      description: scheduleData.overview,
      icon: 'view-dashboard',
    },
    {
      title: 'Schedule Details',
      description: scheduleData.details,
      icon: 'format-list-bulleted',
    },
    {
      title: 'View Draft',
      description: scheduleData.draft,
      icon: 'file-document-edit',
    },
  ];

  return (
    <GradientBackground>
      <View style={styles.container}>
        <View style={styles.tilesContainer}>
          {scheduleTiles.map((tile, index) => (
            <TouchableOpacity key={index} style={styles.tile}>
              <Card style={styles.tileCard}>
                <Card.Content style={styles.tileContent}>
                  <View style={styles.tileHeader}>
                    <Icon name={tile.icon} size={24} color={colors.accent} />
                    <Text style={styles.tileTitle}>{tile.title}</Text>
                  </View>
                  <Text style={styles.tileDescription}>{tile.description}</Text>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          ))}
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
  tilesContainer: {
    flex: 1,
  },
  tile: {
    marginBottom: 16,
  },
  tileCard: {
    backgroundColor: colors.cardBackground,
    elevation: 4,
    borderRadius: 12,
  },
  tileContent: {
    padding: 20,
  },
  tileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tileTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 12,
  },
  tileDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});

export default ScheduleScreen;
