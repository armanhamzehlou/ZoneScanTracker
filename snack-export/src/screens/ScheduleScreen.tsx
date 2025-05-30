import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import GradientBackground from '../components/GradientBackground';
import { colors } from '../constants/colors';
import { scheduleData } from '../constants/dummyData';

const ScheduleScreen: React.FC = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return colors.success;
      case 'pending':
        return colors.warning;
      case 'completed':
        return colors.accent;
      default:
        return colors.textSecondary;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return 'play-circle';
      case 'pending':
        return 'clock-outline';
      case 'completed':
        return 'check-circle';
      default:
        return 'help-circle';
    }
  };

  return (
    <GradientBackground>
      <ScrollView style={styles.container}>
        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <View style={styles.statContent}>
              <MaterialCommunityIcons 
                name="check-circle" 
                size={24} 
                color={colors.success} 
              />
              <Text style={styles.statNumber}>{scheduleData.completedToday}</Text>
              <Text style={styles.statLabel}>Completed Today</Text>
            </View>
          </Card>

          <Card style={styles.statCard}>
            <View style={styles.statContent}>
              <MaterialCommunityIcons 
                name="calendar" 
                size={24} 
                color={colors.accent} 
              />
              <Text style={styles.statNumber}>{scheduleData.totalScheduled}</Text>
              <Text style={styles.statLabel}>Total Scheduled</Text>
            </View>
          </Card>
        </View>

        <View style={styles.scheduleSection}>
          <Text style={styles.sectionTitle}>Active Schedules</Text>
          
          {scheduleData.activeSchedules.map((schedule) => (
            <Card key={schedule.id} style={styles.scheduleCard}>
              <View style={styles.scheduleContent}>
                <View style={styles.scheduleHeader}>
                  <MaterialCommunityIcons 
                    name={getStatusIcon(schedule.status)}
                    size={20} 
                    color={getStatusColor(schedule.status)} 
                  />
                  <View style={styles.scheduleInfo}>
                    <Text style={styles.scheduleName}>{schedule.name}</Text>
                    <Text style={styles.scheduleZone}>{schedule.zone}</Text>
                  </View>
                  <View style={styles.timeContainer}>
                    <Text style={styles.scheduleTime}>{schedule.time}</Text>
                    <Text style={[styles.status, { color: getStatusColor(schedule.status) }]}>
                      {schedule.status.toUpperCase()}
                    </Text>
                  </View>
                </View>
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 12,
  },
  statContent: {
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  scheduleSection: {
    padding: 16,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  scheduleCard: {
    backgroundColor: colors.surface,
    marginBottom: 12,
    borderRadius: 12,
  },
  scheduleContent: {
    padding: 16,
  },
  scheduleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scheduleInfo: {
    flex: 1,
    marginLeft: 12,
  },
  scheduleName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  scheduleZone: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  timeContainer: {
    alignItems: 'flex-end',
  },
  scheduleTime: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.accent,
  },
  status: {
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 2,
  },
});

export default ScheduleScreen;