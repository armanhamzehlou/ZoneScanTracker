import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

// Import screens (simplified for demo)
import HomeScreen from '../screens/HomeScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import ReportScreen from '../screens/ReportScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ZoneListScreen from '../screens/ZoneListScreen';

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

const Tab = createBottomTabNavigator<RootStackParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

interface AppNavigatorProps {
  onLogout?: () => void;
}

const AppNavigator = ({ onLogout }: AppNavigatorProps) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Schedule':
              iconName = focused ? 'calendar' : 'calendar-outline';
              break;
            case 'Reports':
              iconName = focused ? 'chart-line' : 'chart-line-variant';
              break;
            case 'Settings':
              iconName = focused ? 'cog' : 'cog-outline';
              break;
            case 'Zones':
              iconName = focused ? 'map-marker' : 'map-marker-outline';
              break;
            default:
              iconName = 'help-circle-outline';
          }

          return <MaterialCommunityIcons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.surfaceLight,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Zones" component={ZoneListScreen} />
      <Tab.Screen name="Schedule" component={ScheduleScreen} />
      <Tab.Screen name="Reports" component={ReportScreen} />
      <Tab.Screen 
        name="Settings" 
        children={() => <SettingsScreen onLogout={onLogout} />}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;