import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Text, List, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import GradientBackground from '../components/GradientBackground';
import ModalSelector from '../components/ModalSelector';
import { colors } from '../constants/colors';
import { settings } from '../constants/dummyData';
import { RootStackParamList } from '../navigation/AppNavigator';

type SettingsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Settings'>;

const SettingsScreen = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const [showSpeedModal, setShowSpeedModal] = useState(false);
  const [showScanDelayModal, setShowScanDelayModal] = useState(false);
  const [showWaitTimeModal, setShowWaitTimeModal] = useState(false);
  const [showLockTimeModal, setShowLockTimeModal] = useState(false);
  
  const [robotSpeed, setRobotSpeed] = useState('Medium');
  const [scanDelay, setScanDelay] = useState('15');
  const [waitTime, setWaitTime] = useState('30');
  const [lockTime, setLockTime] = useState('45');

  const speedOptions = [
    { label: 'Slow (0.2m / sec)', value: 'Slow' },
    { label: 'Medium (0.5m / sec)', value: 'Medium' },
    { label: 'Fast (1m / sec)', value: 'Fast' },
  ];

  const lockTimeOptions = [
    { label: '30 minutes', value: '30' },
    { label: '45 minutes', value: '45' },
    { label: '60 minutes', value: '60' },
  ];

  const waitTimeOptions = [
    { label: '15 seconds', value: '15' },
    { label: '30 seconds', value: '30' },
    { label: '45 seconds', value: '45' },
    { label: '60 seconds', value: '60' },
  ];

  const scanDelayOptions = [
    { label: '10 seconds', value: '10' },
    { label: '15 seconds', value: '15' },
    { label: '20 seconds', value: '20' },
    { label: '30 seconds', value: '30' },
  ];

  const SettingItem = ({ title, value, onPress, icon }: any) => (
    <TouchableOpacity onPress={onPress}>
      <List.Item
        title={title}
        description={value}
        left={(props) => <List.Icon {...props} icon={icon} color={colors.accent} />}
        right={(props) => <List.Icon {...props} icon="chevron-right" color={colors.textSecondary} />}
        titleStyle={styles.settingTitle}
        descriptionStyle={styles.settingDescription}
        style={styles.settingItem}
      />
    </TouchableOpacity>
  );

  return (
    <GradientBackground>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Robot Settings */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Robot Settings</Text>
            <SettingItem
              title="Robot Speed"
              value={`${robotSpeed} (0.5m / sec)`}
              icon="speedometer"
              onPress={() => setShowSpeedModal(true)}
            />
            <SettingItem
              title="Server IP Address"
              value={settings.serverIP}
              icon="server"
              onPress={() => navigation.navigate('IPAddress', { title: 'Server IP Address', type: 'server' })}
            />
            <SettingItem
              title="Duration of Scanning Methods"
              value={`${scanDelay} seconds`}
              icon="timer-sand"
              onPress={() => setShowScanDelayModal(true)}
            />
            <SettingItem
              title="Time before schedule start"
              value={`${waitTime} seconds`}
              icon="clock-start"
              onPress={() => setShowWaitTimeModal(true)}
            />
            <SettingItem
              title="Time before Screen Lock"
              value={`${lockTime} minutes`}
              icon="lock-clock"
              onPress={() => setShowLockTimeModal(true)}
            />
          </Card.Content>
        </Card>

        {/* Navigation Settings */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Navigation Settings</Text>
            <SettingItem
              title="Robot Map"
              value="View and manage robot map"
              icon="map"
              onPress={() => navigation.navigate('MapViewer')}
            />
            <SettingItem
              title="Virtual Walls"
              value="Configure virtual boundaries"
              icon="wall"
              onPress={() => {}}
            />
            <SettingItem
              title="View Saved Maps"
              value="Manage saved map configurations"
              icon="content-save-all"
              onPress={() => navigation.navigate('SavedMaps')}
            />
            <SettingItem
              title="Navigation IP Address"
              value={settings.navigationIP}
              icon="ip-network"
              onPress={() => navigation.navigate('IPAddress', { title: 'Navigation IP Address', type: 'navigation' })}
            />
          </Card.Content>
        </Card>

        {/* Network Settings */}
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.networkHeader}>
              <Icon name="lock" size={20} color={colors.accent} />
              <Text style={styles.sectionTitle}>Network Settings</Text>
            </View>
            <Text style={styles.comingSoon}>Configuration options coming soon</Text>
          </Card.Content>
        </Card>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutContainer}>
          <Card style={[styles.card, styles.logoutCard]}>
            <Card.Content style={styles.logoutContent}>
              <Icon name="logout" size={24} color={colors.error} />
              <Text style={styles.logoutText}>Logout</Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>

        {/* Modals */}
        <ModalSelector
          visible={showSpeedModal}
          title="Select VirBrix Speed"
          options={speedOptions}
          selectedValue={robotSpeed}
          onSelect={setRobotSpeed}
          onDismiss={() => setShowSpeedModal(false)}
          onSave={() => setShowSpeedModal(false)}
        />

        <ModalSelector
          visible={showLockTimeModal}
          title="Select Time Before Lock"
          options={lockTimeOptions}
          selectedValue={lockTime}
          onSelect={setLockTime}
          onDismiss={() => setShowLockTimeModal(false)}
          onSave={() => setShowLockTimeModal(false)}
        />

        <ModalSelector
          visible={showWaitTimeModal}
          title="Set Wait Time Before Scanning Start (in sec)"
          options={waitTimeOptions}
          selectedValue={waitTime}
          onSelect={setWaitTime}
          onDismiss={() => setShowWaitTimeModal(false)}
          onSave={() => setShowWaitTimeModal(false)}
        />

        <ModalSelector
          visible={showScanDelayModal}
          title="Set Scanning Delay (in sec)"
          options={scanDelayOptions}
          selectedValue={scanDelay}
          onSelect={setScanDelay}
          onDismiss={() => setShowScanDelayModal(false)}
          onSave={() => setShowScanDelayModal(false)}
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
    marginBottom: 16,
    elevation: 4,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  settingItem: {
    paddingVertical: 4,
  },
  settingTitle: {
    color: colors.text,
    fontSize: 16,
  },
  settingDescription: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  networkHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  comingSoon: {
    color: colors.textSecondary,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 20,
  },
  logoutContainer: {
    marginBottom: 20,
  },
  logoutCard: {
    backgroundColor: colors.cardBackground,
  },
  logoutContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.error,
    marginLeft: 12,
  },
});

export default SettingsScreen;
