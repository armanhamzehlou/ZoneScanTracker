import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Text, Button, FAB } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import GradientBackground from '../components/GradientBackground';
import StatusCard from '../components/StatusCard';
import { colors } from '../constants/colors';
import { robotStatus } from '../constants/dummyData';
import { RootStackParamList } from '../navigation/AppNavigator';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const navigationTiles = [
    {
      title: 'Schedule',
      icon: 'calendar-clock',
      onPress: () => navigation.navigate('Schedule'),
    },
    {
      title: 'Zones',
      icon: 'map-marker-multiple',
      onPress: () => navigation.navigate('Zones'),
    },
    {
      title: 'Reports',
      icon: 'chart-line',
      onPress: () => navigation.navigate('Reports'),
    },
    {
      title: 'Settings',
      icon: 'cog',
      onPress: () => navigation.navigate('Settings'),
    },
  ];

  return (
    <GradientBackground>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>VirBrix Control</Text>
          <Text style={styles.subtitle}>Robot Management System</Text>
        </View>

        <StatusCard status={robotStatus} />

        <View style={styles.controlButtons}>
          <Button
            mode="contained"
            icon="home"
            buttonColor={colors.accent}
            textColor={colors.primary}
            style={styles.controlButton}
            onPress={() => {}}
          >
            Send Home
          </Button>
          <Button
            mode="contained"
            icon="stop"
            buttonColor={colors.error}
            textColor={colors.text}
            style={styles.controlButton}
            onPress={() => {}}
          >
            Emergency Stop
          </Button>
        </View>

        <View style={styles.tilesContainer}>
          {navigationTiles.map((tile, index) => (
            <TouchableOpacity
              key={index}
              style={styles.tile}
              onPress={tile.onPress}
            >
              <Card style={styles.tileCard}>
                <Card.Content style={styles.tileContent}>
                  <Icon name={tile.icon} size={32} color={colors.accent} />
                  <Text style={styles.tileTitle}>{tile.title}</Text>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  controlButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  tilesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  tile: {
    width: '48%',
    marginBottom: 16,
  },
  tileCard: {
    backgroundColor: colors.cardBackground,
    elevation: 4,
    borderRadius: 12,
  },
  tileContent: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  tileTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginTop: 12,
  },
});

export default HomeScreen;
