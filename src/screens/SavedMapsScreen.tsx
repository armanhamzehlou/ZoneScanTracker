import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Card, Text, RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import GradientBackground from '../components/GradientBackground';
import { colors } from '../constants/colors';
import { savedMaps } from '../constants/dummyData';
import { SavedMap } from '../types';

const SavedMapsScreen = () => {
  const [selectedMapId, setSelectedMapId] = useState(
    savedMaps.find(map => map.isActive)?.id || ''
  );

  const renderMapItem = ({ item }: { item: SavedMap }) => (
    <TouchableOpacity onPress={() => setSelectedMapId(item.id)}>
      <Card style={styles.mapCard}>
        <Card.Content style={styles.cardContent}>
          <View style={styles.mapInfo}>
            <Text style={styles.mapName}>{item.name}</Text>
            <Text style={styles.mapDate}>
              Modified: {item.lastModified.toLocaleDateString()}
            </Text>
          </View>
          <RadioButton
            value={item.id}
            status={selectedMapId === item.id ? 'checked' : 'unchecked'}
            onPress={() => setSelectedMapId(item.id)}
            color={colors.accent}
            uncheckedColor={colors.textSecondary}
          />
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerText}>Only 1 map can be set as Current Map</Text>
    </View>
  );

  return (
    <GradientBackground>
      <View style={styles.container}>
        {renderHeader()}
        <FlatList
          data={savedMaps}
          renderItem={renderMapItem}
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
  header: {
    padding: 20,
    alignItems: 'flex-end',
  },
  headerText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'right',
  },
  listContainer: {
    padding: 20,
    paddingTop: 0,
  },
  mapCard: {
    backgroundColor: colors.cardBackground,
    marginBottom: 12,
    elevation: 4,
    borderRadius: 12,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  mapInfo: {
    flex: 1,
  },
  mapName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  mapDate: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});

export default SavedMapsScreen;
