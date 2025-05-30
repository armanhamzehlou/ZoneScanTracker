import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { Card, Text, Button, FAB } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import GradientBackground from '../components/GradientBackground';
import StatusCard from '../components/StatusCard';
import ConfirmationModal from '../components/ConfirmationModal';
import NavigationStatusModal from '../components/NavigationStatusModal';
import EmergencyIndicator from '../components/EmergencyIndicator';
import { colors } from '../constants/colors';
import { robotStatus } from '../constants/dummyData';
import { RootStackParamList } from '../navigation/AppNavigator';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [showSendHomeDialog, setShowSendHomeDialog] = useState(false);
  const [showEmergencyDialog, setShowEmergencyDialog] = useState(false);
  const [showNavigationDialog, setShowNavigationDialog] = useState(false);
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [tileAnimations] = useState([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]);

  useEffect(() => {
    // Staggered tile animations on mount
    const animations = tileAnimations.map((anim, index) => 
      Animated.timing(anim, {
        toValue: 1,
        duration: 600,
        delay: index * 100,
        useNativeDriver: true,
      })
    );

    Animated.stagger(100, animations).start();
  }, []);

  const handleSendHome = () => {
    if (emergencyActive) return;
    setShowSendHomeDialog(true);
  };

  const handleSendHomeConfirm = () => {
    setShowSendHomeDialog(false);
    setShowNavigationDialog(true);
  };

  const handleEmergencyStop = () => {
    setShowEmergencyDialog(true);
  };

  const handleEmergencyConfirm = () => {
    setShowEmergencyDialog(false);
    setEmergencyActive(true);
    setShowNavigationDialog(false);
  };

  const handleStopNavigation = () => {
    setShowNavigationDialog(false);
  };

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
          <Text style={styles.title}>GlobalDWS VirBrix Control</Text>
          <Text style={styles.subtitle}>Environmental Scanning & Security</Text>
        </View>

        <StatusCard status={robotStatus} emergencyActive={emergencyActive} />

        <View style={styles.controlButtons}>
          <Button
            mode="contained"
            icon="home"
            buttonColor={colors.accent}
            textColor={colors.primary}
            style={styles.controlButton}
            onPress={handleSendHome}
            disabled={emergencyActive}
          >
            Send Home
          </Button>
        </View>

        <View style={styles.tilesContainer}>
          {navigationTiles.map((tile, index) => {
            const translateY = tileAnimations[index].interpolate({
              inputRange: [0, 1],
              outputRange: [50, 0],
            });

            const opacity = tileAnimations[index];

            return (
              <Animated.View
                key={index}
                style={[
                  styles.tile,
                  {
                    opacity,
                    transform: [{ translateY }],
                  },
                ]}
              >
                <TouchableOpacity
                  onPress={emergencyActive ? undefined : tile.onPress}
                  disabled={emergencyActive}
                >
                  <Card style={[
                    styles.tileCard,
                    emergencyActive && { opacity: 0.5 }
                  ]}>
                    <Card.Content style={styles.tileContent}>
                      <Icon 
                        name={tile.icon} 
                        size={32} 
                        color={emergencyActive ? colors.disabled : colors.accent} 
                      />
                      <Text style={[
                        styles.tileTitle,
                        emergencyActive && { color: colors.disabled }
                      ]}>
                        {tile.title}
                      </Text>
                    </Card.Content>
                  </Card>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>
      </ScrollView>

      <ConfirmationModal
        visible={showSendHomeDialog}
        title="Send Robot Home"
        message="Are you sure you want to send the robot back to the charging station?"
        icon="home"
        confirmText="Yes"
        cancelText="No"
        onConfirm={handleSendHomeConfirm}
        onCancel={() => setShowSendHomeDialog(false)}
        type="info"
      />

      <ConfirmationModal
        visible={showEmergencyDialog}
        title="Emergency Stop"
        message="This will immediately stop all robot operations. The robot will be unable to perform any tasks until reset."
        icon="alert-octagon"
        confirmText="Yes"
        cancelText="No"
        onConfirm={handleEmergencyConfirm}
        onCancel={() => setShowEmergencyDialog(false)}
        type="danger"
      />

      <NavigationStatusModal
        visible={showNavigationDialog}
        onStop={handleStopNavigation}
      />
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
