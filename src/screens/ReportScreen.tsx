import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { DatePickerInput } from 'react-native-paper-dates';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import GradientBackground from '../components/GradientBackground';
import ModalSelector from '../components/ModalSelector';
import { colors } from '../constants/colors';

const ReportScreen = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [timeGrouping, setTimeGrouping] = useState('Day');
  const [showGroupingModal, setShowGroupingModal] = useState(false);

  const groupingOptions = [
    { label: 'Day', value: 'Day' },
    { label: 'Week', value: 'Week' },
    { label: 'Month', value: 'Month' },
  ];

  const handleGenerateReport = () => {
    // Handle report generation
    console.log('Generating report:', { startDate, endDate, timeGrouping });
  };

  return (
    <GradientBackground>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <View style={styles.header}>
              <Icon name="chart-line" size={24} color={colors.accent} />
              <Text style={styles.title}>Generate Report</Text>
            </View>

            <View style={styles.dateSection}>
              <Text style={styles.sectionTitle}>Date Range</Text>
              
              <View style={styles.dateRow}>
                <View style={styles.dateInput}>
                  <Text style={styles.dateLabel}>Start Date</Text>
                  <DatePickerInput
                    locale="en"
                    label=""
                    value={startDate}
                    onChange={setStartDate}
                    inputMode="start"
                    style={styles.datePicker}
                    theme={{
                      colors: {
                        primary: colors.accent,
                        background: colors.cardBackground,
                        surface: colors.surface,
                        text: colors.text,
                      },
                    }}
                  />
                </View>
                
                <View style={styles.dateInput}>
                  <Text style={styles.dateLabel}>End Date</Text>
                  <DatePickerInput
                    locale="en"
                    label=""
                    value={endDate}
                    onChange={setEndDate}
                    inputMode="end"
                    style={styles.datePicker}
                    theme={{
                      colors: {
                        primary: colors.accent,
                        background: colors.cardBackground,
                        surface: colors.surface,
                        text: colors.text,
                      },
                    }}
                  />
                </View>
              </View>
            </View>

            <View style={styles.groupingSection}>
              <Text style={styles.sectionTitle}>Time Grouping</Text>
              <Button
                mode="outlined"
                onPress={() => setShowGroupingModal(true)}
                style={styles.groupingButton}
                textColor={colors.text}
                contentStyle={styles.groupingButtonContent}
              >
                <View style={styles.groupingButtonInner}>
                  <Text style={styles.groupingButtonText}>{timeGrouping}</Text>
                  <Icon name="chevron-down" size={20} color={colors.textSecondary} />
                </View>
              </Button>
            </View>

            <Button
              mode="contained"
              onPress={handleGenerateReport}
              style={styles.generateButton}
              buttonColor={colors.accent}
              textColor={colors.primary}
              icon="file-chart"
            >
              Generate Report
            </Button>
          </Card.Content>
        </Card>

        <ModalSelector
          visible={showGroupingModal}
          title="Select Time Grouping"
          options={groupingOptions}
          selectedValue={timeGrouping}
          onSelect={setTimeGrouping}
          onDismiss={() => setShowGroupingModal(false)}
          onSave={() => setShowGroupingModal(false)}
        />
      </ScrollView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: colors.cardBackground,
    elevation: 4,
    borderRadius: 12,
  },
  cardContent: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 12,
  },
  dateSection: {
    marginBottom: 24,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateInput: {
    flex: 1,
    marginHorizontal: 4,
  },
  dateLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  datePicker: {
    backgroundColor: colors.cardBackground,
  },
  groupingSection: {
    marginBottom: 32,
  },
  groupingButton: {
    borderColor: colors.textSecondary,
    backgroundColor: colors.cardBackground,
  },
  groupingButtonContent: {
    height: 48,
  },
  groupingButtonInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  groupingButtonText: {
    color: colors.text,
    fontSize: 16,
  },
  generateButton: {
    paddingVertical: 8,
  },
});

export default ReportScreen;
