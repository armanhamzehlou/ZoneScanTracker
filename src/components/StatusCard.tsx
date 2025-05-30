import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, ProgressBar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../constants/colors';
import { RobotStatus } from '../types';

interface StatusCardProps {
  status: RobotStatus;
  emergencyActive?: boolean;
}

const StatusCard: React.FC<StatusCardProps> = ({ status, emergencyActive = false }) => {
  return (
    <Card style={styles.card}>
      <LinearGradient
        colors={[colors.surface, colors.surfaceDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cardGradient}
      >
        <Card.Content style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Robot Status</Text>
          <View style={styles.statusIcons}>
            <View style={styles.emergencyStatus}>
              <Icon
                name={emergencyActive ? "stop-circle" : "check-circle"}
                size={16}
                color={emergencyActive ? colors.error : colors.success}
              />
              <Text style={[styles.emergencyText, { color: emergencyActive ? colors.error : colors.success }]}>
                {emergencyActive ? "EMERGENCY" : "OPERATIONAL"}
              </Text>
            </View>
            <Icon
              name={status.isConnected ? 'wifi' : 'wifi-off'}
              size={20}
              color={status.isConnected ? colors.success : colors.error}
            />
          </View>
        </View>
        
        <View style={styles.batterySection}>
          <View style={styles.batteryInfo}>
            <Icon name="battery" size={24} color={colors.accent} />
            <Text style={styles.batteryText}>{status.battery}%</Text>
          </View>
          <ProgressBar
            progress={status.battery / 100}
            color={colors.accent}
            style={styles.progressBar}
          />
        </View>

        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Current Zone</Text>
            <Text style={styles.infoValue}>{status.currentZone}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Current Task</Text>
            <Text style={styles.infoValue}>{status.currentTask}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Next Schedule</Text>
            <Text style={styles.infoValue}>{status.nextSchedule}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Speed</Text>
            <Text style={styles.infoValue}>{status.speed}</Text>
          </View>
        </View>
        </Card.Content>
      </LinearGradient>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'transparent',
    marginBottom: 16,
    elevation: 4,
    overflow: 'hidden',
    borderRadius: 12,
  },
  cardGradient: {
    borderRadius: 12,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  emergencyStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceDark,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  emergencyText: {
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 4,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  batterySection: {
    marginBottom: 20,
  },
  batteryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  batteryText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.surface,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  infoItem: {
    width: '48%',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
});

export default StatusCard;
