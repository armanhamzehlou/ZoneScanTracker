import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Card, Text, Button, FAB, Portal, Modal } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import GradientBackground from '../components/GradientBackground';
import InputField from '../components/InputField';
import DirectionalControl from '../components/DirectionalControl';
import { colors } from '../constants/colors';
import { zones } from '../constants/dummyData';
import { Point } from '../types';
import { RootStackParamList } from '../navigation/AppNavigator';

type ZoneItemScreenRouteProp = RouteProp<RootStackParamList, 'ZoneItem'>;
type ZoneItemScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ZoneItem'>;

const ZoneItemScreen = () => {
  const route = useRoute<ZoneItemScreenRouteProp>();
  const navigation = useNavigation<ZoneItemScreenNavigationProp>();
  const { zoneId } = route.params;
  
  const zone = zones.find(z => z.id === zoneId);
  const [activeTab, setActiveTab] = useState<'info' | 'points' | 'register'>('info');
  const [zoneName, setZoneName] = useState(zone?.name || '');
  const [zoneDescription, setZoneDescription] = useState(zone?.description || '');
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [pointName, setPointName] = useState('');
  const [pointDescription, setPointDescription] = useState('');

  if (!zone) {
    return (
      <GradientBackground>
        <View style={styles.container}>
          <Text style={styles.errorText}>Zone not found</Text>
        </View>
      </GradientBackground>
    );
  }

  const TabButton = ({ title, isActive, onPress }: any) => (
    <TouchableOpacity
      style={[styles.tabButton, isActive && styles.activeTabButton]}
      onPress={onPress}
    >
      <Text style={[styles.tabText, isActive && styles.activeTabText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const PointCard = ({ item }: { item: Point }) => (
    <TouchableOpacity style={styles.pointCard}>
      <Card style={styles.pointCardContent}>
        <Card.Content style={styles.pointCardInner}>
          <Text style={styles.pointName}>{item.name}</Text>
          {item.description && (
            <Text style={styles.pointDescription}>{item.description}</Text>
          )}
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  const handleSavePoint = () => {
    // Handle save point logic
    console.log('Saving point:', { pointName, pointDescription });
    setPointName('');
    setPointDescription('');
    setShowRegisterModal(false);
  };

  const renderZoneInfo = () => (
    <View style={styles.tabContent}>
      <InputField
        label="Zone Name"
        value={zoneName}
        onChangeText={setZoneName}
        required
      />
      <InputField
        label="Zone Description"
        value={zoneDescription}
        onChangeText={setZoneDescription}
        placeholder="Optional"
        multiline
      />
      
      <View style={styles.actionButtons}>
        <Button
          mode="contained"
          buttonColor={colors.error}
          textColor={colors.text}
          style={styles.actionButton}
          onPress={() => {}}
        >
          Delete
        </Button>
        <Button
          mode="outlined"
          textColor={colors.textSecondary}
          style={styles.actionButton}
          onPress={() => navigation.goBack()}
        >
          Cancel
        </Button>
        <Button
          mode="contained"
          buttonColor={colors.accent}
          textColor={colors.primary}
          style={styles.actionButton}
          onPress={() => {}}
        >
          Save
        </Button>
      </View>
    </View>
  );

  const renderPointsList = () => (
    <View style={styles.tabContent}>
      <View style={styles.pointsHeader}>
        <Text style={styles.selectText}>Select</Text>
      </View>
      <FlatList
        data={zone.points}
        renderItem={PointCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.pointsList}
        showsVerticalScrollIndicator={false}
      />
      <FAB
        style={styles.pointsFab}
        icon="plus"
        onPress={() => setShowRegisterModal(true)}
        color={colors.primary}
        customSize={56}
      />
    </View>
  );

  const renderPointRegister = () => (
    <View style={styles.tabContent}>
      <View style={styles.registerContent}>
        <View style={styles.controlSection}>
          <DirectionalControl />
        </View>
        
        <View style={styles.inputSection}>
          <InputField
            label="Point Name"
            value={pointName}
            onChangeText={setPointName}
            placeholder="Required"
            required
          />
          <InputField
            label="Point Description"
            value={pointDescription}
            onChangeText={setPointDescription}
            placeholder="Optional"
          />
          
          <Text style={styles.instructionText}>
            Move the VirVrix to the scanning location{'\n'}
            then tap "Save Point"
          </Text>
          
          <View style={styles.registerButtons}>
            <Button
              mode="outlined"
              textColor={colors.textSecondary}
              style={styles.registerButton}
              onPress={() => setActiveTab('points')}
            >
              Cancel
            </Button>
            <Button
              mode="contained"
              buttonColor={colors.accent}
              textColor={colors.primary}
              style={styles.registerButton}
              onPress={handleSavePoint}
            >
              Save Point
            </Button>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <GradientBackground>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.selectText}>Select</Text>
        </View>
        
        <View style={styles.tabsContainer}>
          <TabButton
            title="Zone Information"
            isActive={activeTab === 'info'}
            onPress={() => setActiveTab('info')}
          />
          <TabButton
            title="List Of Points"
            isActive={activeTab === 'points'}
            onPress={() => setActiveTab('points')}
          />
          <TabButton
            title="Point Register"
            isActive={activeTab === 'register'}
            onPress={() => setActiveTab('register')}
          />
        </View>

        <View style={styles.content}>
          {activeTab === 'info' && renderZoneInfo()}
          {activeTab === 'points' && renderPointsList()}
          {activeTab === 'register' && renderPointRegister()}
        </View>

        {/* Register Point Modal */}
        <Portal>
          <Modal
            visible={showRegisterModal}
            onDismiss={() => setShowRegisterModal(false)}
            contentContainerStyle={styles.modal}
          >
            <Card style={styles.modalCard}>
              <Card.Content>
                <View style={styles.modalContent}>
                  <DirectionalControl />
                  <InputField
                    label="Point Name"
                    value={pointName}
                    onChangeText={setPointName}
                    placeholder="Required"
                    required
                  />
                  <InputField
                    label="Point Description"
                    value={pointDescription}
                    onChangeText={setPointDescription}
                    placeholder="Optional"
                  />
                  
                  <Text style={styles.instructionText}>
                    Move the VirVrix to the scanning location{'\n'}
                    then tap "Save Point"
                  </Text>
                  
                  <View style={styles.modalButtons}>
                    <Button
                      mode="outlined"
                      textColor={colors.textSecondary}
                      onPress={() => setShowRegisterModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      mode="contained"
                      buttonColor={colors.accent}
                      textColor={colors.primary}
                      onPress={handleSavePoint}
                    >
                      Save Point
                    </Button>
                  </View>
                </View>
              </Card.Content>
            </Card>
          </Modal>
        </Portal>
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  selectText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabButton: {
    borderBottomColor: colors.accent,
  },
  tabText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  activeTabText: {
    color: colors.accent,
  },
  content: {
    flex: 1,
  },
  tabContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  pointsHeader: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  pointsList: {
    paddingBottom: 80,
  },
  pointCard: {
    flex: 1,
    margin: 8,
  },
  pointCardContent: {
    backgroundColor: colors.cardBackground,
    elevation: 4,
    borderRadius: 12,
    minHeight: 80,
  },
  pointCardInner: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  pointName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  pointDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  pointsFab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: colors.accent,
  },
  registerContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  controlSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  inputSection: {
    flex: 1,
  },
  instructionText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginVertical: 20,
    lineHeight: 20,
  },
  registerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  registerButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  modal: {
    margin: 20,
  },
  modalCard: {
    backgroundColor: colors.surface,
  },
  modalContent: {
    alignItems: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 24,
  },
  errorText: {
    fontSize: 18,
    color: colors.error,
    textAlign: 'center',
    marginTop: 50,
  },
});

export default ZoneItemScreen;
