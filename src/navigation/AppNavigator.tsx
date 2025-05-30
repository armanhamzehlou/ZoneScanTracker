import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../constants/colors';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import ReportScreen from '../screens/ReportScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ZoneListScreen from '../screens/ZoneListScreen';
import ZoneItemScreen from '../screens/ZoneItemScreen';
import AddZoneScreen from '../screens/AddZoneScreen';
import MapViewerScreen from '../screens/MapViewerScreen';
import IPAddressScreen from '../screens/IPAddressScreen';
import SavedMapsScreen from '../screens/SavedMapsScreen';

export type RootStackParamList = {
  Home: undefined;
  Schedule: undefined;
  Reports: undefined;
  Settings: undefined;
  Zones: undefined;
  ZoneItem: { zoneId: string; zoneName: string };
  AddZone: undefined;
  MapViewer: undefined;
  IPAddress: { title: string; type: 'server' | 'navigation' };
  SavedMaps: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

interface AppNavigatorProps {
  onLogout?: () => void;
}

const AppNavigator = ({ onLogout }: AppNavigatorProps) => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },
        headerShadowVisible: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{ title: 'Schedule' }}
      />
      <Stack.Screen
        name="Reports"
        component={ReportScreen}
        options={{ title: 'Reports' }}
      />
      <Stack.Screen
        name="Settings"
        options={{ title: 'Settings' }}
      >
        {(props) => <SettingsScreen {...props} onLogout={onLogout} />}
      </Stack.Screen>
      <Stack.Screen
        name="Zones"
        component={ZoneListScreen}
        options={{ title: 'Zone' }}
      />
      <Stack.Screen
        name="ZoneItem"
        component={ZoneItemScreen}
        options={({ route }) => ({
          title: `Zone - ${route.params.zoneName}`,
        })}
      />
      <Stack.Screen
        name="AddZone"
        component={AddZoneScreen}
        options={{ title: 'Add Zone' }}
      />
      <Stack.Screen
        name="MapViewer"
        component={MapViewerScreen}
        options={{ title: 'Robot Map' }}
      />
      <Stack.Screen
        name="IPAddress"
        component={IPAddressScreen}
        options={({ route }) => ({
          title: route.params.title,
        })}
      />
      <Stack.Screen
        name="SavedMaps"
        component={SavedMapsScreen}
        options={{ title: 'View Saved Maps' }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
