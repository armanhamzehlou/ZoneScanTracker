import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import GradientBackground from '../components/GradientBackground';
import { colors } from '../constants/colors';
import { zones } from '../constants/dummyData';
import { Zone } from '../types';

const ZoneListScreen: React.FC = () => {
  const renderZoneCard = ({ item }: { item: Zone }) => (
    <Card style={styles.zoneCard}>
      <View style={styles.cardContent}>
        <View style={styles.zoneHeader}>
          <MaterialCommunityIcons 
            name="map-marker" 
            size={24} 
            color={colors.accent} 
          />
          <View style={styles.zoneInfo}>
            <Text style={styles.zoneName}>{item.name}</Text>
            <Text style={styles.zoneDescription}>{item.description}</Text>
          </View>
          <MaterialCommunityIcons 
            name="chevron-right" 
            size={24} 
            color={colors.textSecondary} 
          />
        </View>
        
        <View style={styles.pointsContainer}>
          <Text style={styles.pointsLabel}>
            {item.points.length} monitoring points
          </Text>
          <View style={styles.pointsList}>
            {item.points.slice(0, 3).map((point, index) => (
              <Text key={point.id} style={styles.pointName}>
                {point.name}{index < Math.min(item.points.length - 1, 2) ? ' • ' : ''}
              </Text>
            ))}
            {item.points.length > 3 && (
              <Text style={styles.morePoints}>+{item.points.length - 3} more</Text>
            )}
          </View>
        </View>
      </View>
    </Card>
  );

  return (
    <GradientBackground>
      <View style={styles.container}>
        <FlatList
          data={zones}
          renderItem={renderZoneCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
  },
  zoneCard: {
    backgroundColor: colors.surface,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 4,
  },
  cardContent: {
    padding: 16,
  },
  zoneHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  zoneInfo: {
    flex: 1,
    marginLeft: 12,
  },
  zoneName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  zoneDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  pointsContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.surfaceLight,
    paddingTop: 12,
  },
  pointsLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 6,
  },
  pointsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  pointName: {
    fontSize: 12,
    color: colors.accent,
  },
  morePoints: {
    fontSize: 12,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
});

export default ZoneListScreen;