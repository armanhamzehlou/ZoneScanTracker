import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../constants/colors';
import { RobotStatus } from '../types';

interface StatusCardProps {
  status: RobotStatus;
  emergencyActive?: boolean;
}

const StatusCard: React.FC<StatusCardProps> = ({ status, emergencyActive = false }) => {
  const getBatteryColor = (battery: number) => {
    if (battery > 60) return colors.accent;
    if (battery > 30) return '#FFA500';
    return '#FF4444';
  };

  const getBatteryIcon = (battery: number) => {
    if (battery > 75) return 'battery';
    if (battery > 50) return 'battery-70';
    if (battery > 25) return 'battery-30';
    return 'battery-10';
  };

  return (
    <Card style={styles.card}>
      <LinearGradient
        colors={[colors.surfaceLight, colors.surface]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <MaterialCommunityIcons 
              name="robot" 
              size={24} 
              color={colors.accent} 
            />
            <Text style={styles.title}>Robot Status</Text>
          </View>
          {emergencyActive && (
            <View style={styles.emergencyIndicator}>
              <MaterialCommunityIcons 
                name="alert-circle" 
                size={16} 
                color={colors.emergencyRed} 
              />
            </View>
          )}
        </View>

        <View style={styles.content}>
          <View style={styles.statusRow}>
            <View style={styles.statusItem}>
              <MaterialCommunityIcons 
                name={getBatteryIcon(status.battery)} 
                size={20} 
                color={getBatteryColor(status.battery)} 
              />
              <Text style={styles.label}>Battery</Text>
              <Text style={[styles.value, { color: getBatteryColor(status.battery) }]}>
                {status.battery}%
              </Text>
            </View>

            <View style={styles.statusItem}>
              <MaterialCommunityIcons 
                name={status.isConnected ? "wifi" : "wifi-off"} 
                size={20} 
                color={status.isConnected ? colors.accent : colors.disabled} 
              />
              <Text style={styles.label}>Connection</Text>
              <Text style={[styles.value, { 
                color: status.isConnected ? colors.accent : colors.disabled 
              }]}>
                {status.isConnected ? 'Connected' : 'Disconnected'}
              </Text>
            </View>
          </View>

          <View style={styles.statusRow}>
            <View style={styles.statusItem}>
              <MaterialCommunityIcons 
                name="map-marker" 
                size={20} 
                color={colors.secondary} 
              />
              <Text style={styles.label}>Zone</Text>
              <Text style={styles.value}>{status.currentZone}</Text>
            </View>

            <View style={styles.statusItem}>
              <MaterialCommunityIcons 
                name="cog" 
                size={20} 
                color={colors.secondaryLight} 
              />
              <Text style={styles.label}>Task</Text>
              <Text style={styles.value}>{status.currentTask}</Text>
            </View>
          </View>

          <View style={styles.statusRow}>
            <View style={styles.statusItem}>
              <MaterialCommunityIcons 
                name="clock-outline" 
                size={20} 
                color={colors.textSecondary} 
              />
              <Text style={styles.label}>Next Schedule</Text>
              <Text style={styles.value}>{status.nextSchedule}</Text>
            </View>

            <View style={styles.statusItem}>
              <MaterialCommunityIcons 
                name="speedometer" 
                size={20} 
                color={colors.accent} 
              />
              <Text style={styles.label}>Speed</Text>
              <Text style={styles.value}>{status.speed}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
    elevation: 8,
    borderRadius: 16,
    overflow: 'hidden',
  },
  gradient: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginLeft: 8,
  },
  emergencyIndicator: {
    backgroundColor: colors.emergencyRed,
    borderRadius: 12,
    padding: 4,
  },
  content: {
    gap: 16,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  label: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
});

export default StatusCard;