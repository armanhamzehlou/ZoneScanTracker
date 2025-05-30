import { RobotStatus, Zone, SavedMap, Point } from '../types';

export const robotStatus: RobotStatus = {
  battery: 85,
  currentZone: 'Zone A - Main Corridor',
  currentTask: 'Environmental Scan',
  nextSchedule: 'Security Patrol - 14:30',
  isConnected: true,
  speed: 'Normal',
};

export const zones: Zone[] = [
  {
    id: '1',
    name: 'Zone A - Main Corridor',
    description: 'Primary surveillance area with high foot traffic',
    points: [
      { id: '1', name: 'Point A1', description: 'Main entrance monitoring' },
      { id: '2', name: 'Point A2', description: 'Central corridor scan' },
      { id: '3', name: 'Point A3', description: 'Exit monitoring station' },
    ],
  },
  {
    id: '2',
    name: 'Zone B - Server Room',
    description: 'Critical infrastructure monitoring zone',
    points: [
      { id: '4', name: 'Point B1', description: 'Server rack monitoring' },
      { id: '5', name: 'Point B2', description: 'Temperature monitoring' },
    ],
  },
  {
    id: '3',
    name: 'Zone C - Perimeter',
    description: 'External boundary security monitoring',
    points: [
      { id: '6', name: 'Point C1', description: 'North perimeter scan' },
      { id: '7', name: 'Point C2', description: 'East perimeter scan' },
      { id: '8', name: 'Point C3', description: 'South perimeter scan' },
      { id: '9', name: 'Point C4', description: 'West perimeter scan' },
    ],
  },
];

export const savedMaps: SavedMap[] = [
  {
    id: '1',
    name: 'Corporate HQ Layout',
    isActive: true,
    lastModified: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Backup Layout v2.1',
    isActive: false,
    lastModified: new Date('2024-01-10'),
  },
  {
    id: '3',
    name: 'Emergency Layout',
    isActive: false,
    lastModified: new Date('2024-01-08'),
  },
];

export const scheduleData = {
  activeSchedules: [
    {
      id: '1',
      name: 'Morning Security Patrol',
      time: '08:00',
      zone: 'Zone A - Main Corridor',
      status: 'active' as const,
    },
    {
      id: '2',
      name: 'Server Room Check',
      time: '12:00',
      zone: 'Zone B - Server Room',
      status: 'pending' as const,
    },
    {
      id: '3',
      name: 'Perimeter Scan',
      time: '16:00',
      zone: 'Zone C - Perimeter',
      status: 'pending' as const,
    },
  ],
  completedToday: 3,
  totalScheduled: 8,
};

export const settings = {
  serverIp: '192.168.1.100',
  navigationIp: '192.168.1.101',
  robotSpeed: 'Normal',
  timeBeforeStart: '5 seconds',
  screenLockEnabled: true,
  activeMap: 'Corporate HQ Layout',
};