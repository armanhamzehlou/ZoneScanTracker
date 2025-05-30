import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import GradientBackground from '../components/GradientBackground';
import StatusCard from '../components/StatusCard';
import { colors } from '../constants/colors';
import { robotStatus } from '../constants/dummyData';

const HomeScreen: React.FC = () => {
  return (
    <GradientBackground>
      <ScrollView style={styles.container}>
        <StatusCard status={robotStatus} />
        
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <View style={styles.actionGrid}>
            <Card style={styles.actionCard}>
              <View style={styles.actionContent}>
                <MaterialCommunityIcons 
                  name="play-circle" 
                  size={32} 
                  color={colors.accent} 
                />
                <Text style={styles.actionTitle}>Start Patrol</Text>
                <Text style={styles.actionDescription}>Begin scheduled patrol</Text>
              </View>
            </Card>

            <Card style={styles.actionCard}>
              <View style={styles.actionContent}>
                <MaterialCommunityIcons 
                  name="stop-circle" 
                  size={32} 
                  color={colors.error} 
                />
                <Text style={styles.actionTitle}>Emergency Stop</Text>
                <Text style={styles.actionDescription}>Immediate halt</Text>
              </View>
            </Card>

            <Card style={styles.actionCard}>
              <View style={styles.actionContent}>
                <MaterialCommunityIcons 
                  name="home" 
                  size={32} 
                  color={colors.secondary} 
                />
                <Text style={styles.actionTitle}>Return Home</Text>
                <Text style={styles.actionDescription}>Return to base</Text>
              </View>
            </Card>

            <Card style={styles.actionCard}>
              <View style={styles.actionContent}>
                <MaterialCommunityIcons 
                  name="map-search" 
                  size={32} 
                  color={colors.warning} 
                />
                <Text style={styles.actionTitle}>Manual Control</Text>
                <Text style={styles.actionDescription}>Direct navigation</Text>
              </View>
            </Card>
          </View>
        </View>

        <View style={styles.recentActivity}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          
          <Card style={styles.activityCard}>
            <View style={styles.activityItem}>
              <MaterialCommunityIcons 
                name="check-circle" 
                size={20} 
                color={colors.success} 
              />
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Morning patrol completed</Text>
                <Text style={styles.activityTime}>2 hours ago</Text>
              </View>
            </View>
          </Card>

          <Card style={styles.activityCard}>
            <View style={styles.activityItem}>
              <MaterialCommunityIcons 
                name="alert-circle" 
                size={20} 
                color={colors.warning} 
              />
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Low battery warning</Text>
                <Text style={styles.activityTime}>3 hours ago</Text>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  quickActions: {
    margin: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionCard: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: 12,
  },
  actionContent: {
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
  },
  actionDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  recentActivity: {
    margin: 16,
    marginTop: 8,
  },
  activityCard: {
    backgroundColor: colors.surface,
    marginBottom: 8,
    borderRadius: 8,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  activityTime: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
});

export default HomeScreen;