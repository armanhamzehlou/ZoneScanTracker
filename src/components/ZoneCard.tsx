import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../constants/colors';
import { Zone } from '../types';

interface ZoneCardProps {
  zone: Zone;
  onPress: () => void;
}

const ZoneCard: React.FC<ZoneCardProps> = ({ zone, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Card style={styles.card}>
        <Card.Content style={styles.content}>
          <View style={styles.header}>
            <Icon name="map-marker" size={24} color={colors.accent} />
            <Text style={styles.pointCount}>{zone.points.length}</Text>
          </View>
          <Text style={styles.title} numberOfLines={2}>
            {zone.name}
          </Text>
          {zone.description && (
            <Text style={styles.description} numberOfLines={2}>
              {zone.description}
            </Text>
          )}
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
  },
  card: {
    backgroundColor: colors.cardBackground,
    elevation: 4,
    borderRadius: 12,
    minHeight: 120,
  },
  content: {
    padding: 16,
    height: '100%',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  pointCount: {
    fontSize: 12,
    color: colors.textSecondary,
    backgroundColor: colors.surface,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 16,
  },
});

export default ZoneCard;
