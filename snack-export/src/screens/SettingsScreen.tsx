import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { List, Card, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import GradientBackground from '../components/GradientBackground';
import { colors } from '../constants/colors';
import { settings } from '../constants/dummyData';

interface SettingsScreenProps {
  onLogout?: () => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ onLogout }) => {
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: onLogout },
      ]
    );
  };

  return (
    <GradientBackground>
      <ScrollView style={styles.container}>
        <Card style={styles.section}>
          <List.Section>
            <List.Subheader style={styles.sectionHeader}>Robot Configuration</List.Subheader>
            
            <List.Item
              title="Server IP Address"
              description={settings.serverIp}
              left={() => <MaterialCommunityIcons name="server" size={24} color={colors.accent} />}
              right={() => <MaterialCommunityIcons name="chevron-right" size={24} color={colors.textSecondary} />}
              titleStyle={styles.listTitle}
              descriptionStyle={styles.listDescription}
              style={styles.listItem}
            />

            <List.Item
              title="Navigation IP Address"
              description={settings.navigationIp}
              left={() => <MaterialCommunityIcons name="navigation" size={24} color={colors.secondary} />}
              right={() => <MaterialCommunityIcons name="chevron-right" size={24} color={colors.textSecondary} />}
              titleStyle={styles.listTitle}
              descriptionStyle={styles.listDescription}
              style={styles.listItem}
            />

            <List.Item
              title="Robot Speed"
              description={settings.robotSpeed}
              left={() => <MaterialCommunityIcons name="speedometer" size={24} color={colors.warning} />}
              right={() => <MaterialCommunityIcons name="chevron-right" size={24} color={colors.textSecondary} />}
              titleStyle={styles.listTitle}
              descriptionStyle={styles.listDescription}
              style={styles.listItem}
            />
          </List.Section>
        </Card>

        <Card style={styles.section}>
          <List.Section>
            <List.Subheader style={styles.sectionHeader}>Application Settings</List.Subheader>
            
            <List.Item
              title="Time Before Start"
              description={settings.timeBeforeStart}
              left={() => <MaterialCommunityIcons name="timer" size={24} color={colors.accent} />}
              right={() => <MaterialCommunityIcons name="chevron-right" size={24} color={colors.textSecondary} />}
              titleStyle={styles.listTitle}
              descriptionStyle={styles.listDescription}
              style={styles.listItem}
            />

            <List.Item
              title="Screen Lock"
              description={settings.screenLockEnabled ? 'Enabled' : 'Disabled'}
              left={() => <MaterialCommunityIcons name="lock" size={24} color={colors.secondary} />}
              right={() => <MaterialCommunityIcons name="chevron-right" size={24} color={colors.textSecondary} />}
              titleStyle={styles.listTitle}
              descriptionStyle={styles.listDescription}
              style={styles.listItem}
            />

            <List.Item
              title="Active Map"
              description={settings.activeMap}
              left={() => <MaterialCommunityIcons name="map" size={24} color={colors.success} />}
              right={() => <MaterialCommunityIcons name="chevron-right" size={24} color={colors.textSecondary} />}
              titleStyle={styles.listTitle}
              descriptionStyle={styles.listDescription}
              style={styles.listItem}
            />
          </List.Section>
        </Card>

        <Card style={styles.section}>
          <List.Section>
            <List.Subheader style={styles.sectionHeader}>System</List.Subheader>
            
            <List.Item
              title="About"
              description="GlobalDWS VirBrix Control v1.0"
              left={() => <MaterialCommunityIcons name="information" size={24} color={colors.accent} />}
              right={() => <MaterialCommunityIcons name="chevron-right" size={24} color={colors.textSecondary} />}
              titleStyle={styles.listTitle}
              descriptionStyle={styles.listDescription}
              style={styles.listItem}
            />
          </List.Section>
        </Card>

        <View style={styles.logoutContainer}>
          <Button
            mode="outlined"
            onPress={handleLogout}
            style={styles.logoutButton}
            buttonColor="transparent"
            textColor={colors.error}
            icon="logout"
          >
            Logout
          </Button>
        </View>
      </ScrollView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    margin: 16,
    backgroundColor: colors.surface,
    borderRadius: 12,
  },
  sectionHeader: {
    color: colors.accent,
    fontWeight: 'bold',
    fontSize: 14,
  },
  listItem: {
    paddingVertical: 8,
  },
  listTitle: {
    color: colors.text,
    fontSize: 16,
  },
  listDescription: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  logoutContainer: {
    padding: 16,
    paddingTop: 8,
  },
  logoutButton: {
    borderColor: colors.error,
    borderWidth: 1,
  },
});

export default SettingsScreen;