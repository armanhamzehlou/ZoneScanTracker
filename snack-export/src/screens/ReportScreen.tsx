import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import GradientBackground from '../components/GradientBackground';
import { colors } from '../constants/colors';

const ReportScreen: React.FC = () => {
  const reportData = {
    totalOperationTime: '24.5 hrs',
    zonesPatrolled: 12,
    incidentsDetected: 3,
    batteryUsage: '75%',
    lastWeekComparison: '+15%',
  };

  return (
    <GradientBackground>
      <ScrollView style={styles.container}>
        <View style={styles.summaryGrid}>
          <Card style={styles.summaryCard}>
            <View style={styles.summaryContent}>
              <MaterialCommunityIcons 
                name="clock-outline" 
                size={24} 
                color={colors.accent} 
              />
              <Text style={styles.summaryValue}>{reportData.totalOperationTime}</Text>
              <Text style={styles.summaryLabel}>Operation Time</Text>
            </View>
          </Card>

          <Card style={styles.summaryCard}>
            <View style={styles.summaryContent}>
              <MaterialCommunityIcons 
                name="map-marker-multiple" 
                size={24} 
                color={colors.secondary} 
              />
              <Text style={styles.summaryValue}>{reportData.zonesPatrolled}</Text>
              <Text style={styles.summaryLabel}>Zones Patrolled</Text>
            </View>
          </Card>

          <Card style={styles.summaryCard}>
            <View style={styles.summaryContent}>
              <MaterialCommunityIcons 
                name="alert-circle" 
                size={24} 
                color={colors.warning} 
              />
              <Text style={styles.summaryValue}>{reportData.incidentsDetected}</Text>
              <Text style={styles.summaryLabel}>Incidents</Text>
            </View>
          </Card>

          <Card style={styles.summaryCard}>
            <View style={styles.summaryContent}>
              <MaterialCommunityIcons 
                name="battery" 
                size={24} 
                color={colors.success} 
              />
              <Text style={styles.summaryValue}>{reportData.batteryUsage}</Text>
              <Text style={styles.summaryLabel}>Battery Used</Text>
            </View>
          </Card>
        </View>

        <View style={styles.detailSection}>
          <Text style={styles.sectionTitle}>Performance Overview</Text>
          
          <Card style={styles.detailCard}>
            <View style={styles.detailContent}>
              <View style={styles.detailRow}>
                <MaterialCommunityIcons 
                  name="trending-up" 
                  size={20} 
                  color={colors.success} 
                />
                <Text style={styles.detailLabel}>Efficiency vs Last Week</Text>
                <Text style={[styles.detailValue, { color: colors.success }]}>
                  {reportData.lastWeekComparison}
                </Text>
              </View>
            </View>
          </Card>

          <Card style={styles.detailCard}>
            <View style={styles.detailContent}>
              <Text style={styles.detailTitle}>Recent Activity Log</Text>
              
              <View style={styles.logItem}>
                <MaterialCommunityIcons 
                  name="check-circle" 
                  size={16} 
                  color={colors.success} 
                />
                <Text style={styles.logText}>Zone A patrol completed successfully</Text>
                <Text style={styles.logTime}>14:30</Text>
              </View>

              <View style={styles.logItem}>
                <MaterialCommunityIcons 
                  name="information" 
                  size={16} 
                  color={colors.accent} 
                />
                <Text style={styles.logText}>Environmental scan initiated</Text>
                <Text style={styles.logTime}>14:15</Text>
              </View>

              <View style={styles.logItem}>
                <MaterialCommunityIcons 
                  name="alert" 
                  size={16} 
                  color={colors.warning} 
                />
                <Text style={styles.logText}>Anomaly detected in Zone C</Text>
                <Text style={styles.logTime}>13:45</Text>
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
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
  },
  summaryCard: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: 12,
  },
  summaryContent: {
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  summaryLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  detailSection: {
    padding: 16,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  detailCard: {
    backgroundColor: colors.surface,
    marginBottom: 12,
    borderRadius: 12,
  },
  detailContent: {
    padding: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  detailLabel: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  logItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 12,
  },
  logText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
  },
  logTime: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});

export default ReportScreen;