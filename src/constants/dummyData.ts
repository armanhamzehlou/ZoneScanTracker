import { Zone, Point, RobotStatus, SavedMap } from '../types';

export const robotStatus: RobotStatus = {
  battery: 85,
  currentZone: 'Home Zone',
  currentTask: 'Patrolling',
  nextSchedule: '14:30 - Office Patrol',
  isConnected: true,
  speed: 'Medium',
};

export const zones: Zone[] = [
  {
    id: '1',
    name: 'Home Zone',
    description: 'Main entry area',
    points: [
      { id: 'p1', name: 'a1', description: 'Entry point' },
      { id: 'p2', name: 'a2', description: 'Exit point' },
    ],
  },
  {
    id: '2',
    name: 'w2_dock2',
    description: 'Secondary docking station',
    points: [
      { id: 'p3', name: 'dock_entry', description: 'Dock entrance' },
    ],
  },
  {
    id: '3',
    name: 'Daily Schedules',
    description: 'Regular patrol routes',
    points: [],
  },
  {
    id: '4',
    name: 'Innisfil Floor 2',
    description: 'Second floor operations',
    points: [
      { id: 'p4', name: 'a6857', description: 'Checkpoint 1' },
      { id: 'p5', name: 'a4_6858', description: 'Checkpoint 2' },
      { id: 'p6', name: 'a5_6859', description: 'Checkpoint 3' },
      { id: 'p7', name: 'a6_6860', description: 'Checkpoint 4' },
      { id: 'p8', name: 'a7_6861', description: 'Checkpoint 5' },
      { id: 'p9', name: 'a8_6862', description: 'Checkpoint 6' },
    ],
  },
  {
    id: '5',
    name: 'TESTZ',
    description: 'Test zone for validation',
    points: [],
  },
  {
    id: '6',
    name: 'tabletTestZone',
    description: 'Tablet interface testing',
    points: [],
  },
  {
    id: '7',
    name: 'Office',
    description: 'Office patrol area',
    points: [],
  },
  {
    id: '8',
    name: 'GlobalDWS',
    description: 'Global detection system',
    points: [],
  },
];

export const savedMaps: SavedMap[] = [
  {
    id: '1',
    name: 'VB02_dock01',
    isActive: true,
    lastModified: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'GlobalOffice',
    isActive: false,
    lastModified: new Date('2024-01-10'),
  },
];

export const scheduleData = {
  overview: 'Daily patrol schedule active',
  details: '4 zones scheduled for today',
  draft: '2 pending schedule changes',
};

export const settings = {
  robotSpeed: 'Medium (0.5m / sec)',
  serverIP: '192.168.99.3',
  scanningDelay: 15,
  preScheduleWait: 30,
  screenLockTime: 45,
  navigationIP: '192.168.1.100',
};
