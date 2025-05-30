import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { FAB, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import GradientBackground from '../components/GradientBackground';
import ZoneCard from '../components/ZoneCard';
import { colors } from '../constants/colors';
import { zones } from '../constants/dummyData';
import { Zone } from '../types';
import { RootStackParamList } from '../navigation/AppNavigator';

type ZoneListScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Zones'>;

const ZoneListScreen = () => {
  const navigation = useNavigation<ZoneListScreenNavigationProp>();

  const renderZoneCard = ({ item }: { item: Zone }) => (
    <ZoneCard
      zone={item}
      onPress={() => navigation.navigate('ZoneItem', { zoneId: item.id, zoneName: item.name })}
    />
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.selectText}>Select</Text>
    </View>
  );

  return (
    <GradientBackground>
      <View style={styles.container}>
        {renderHeader()}
        <FlatList
          data={zones}
          renderItem={renderZoneCard}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
        
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => navigation.navigate('AddZone')}
          color={colors.primary}
          customSize={56}
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
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  selectText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  listContainer: {
    padding: 12,
    paddingBottom: 80,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: colors.accent,
  },
});

export default ZoneListScreen;
