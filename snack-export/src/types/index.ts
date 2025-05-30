export interface Point {
  id: string;
  name: string;
  description?: string;
}

export interface Zone {
  id: string;
  name: string;
  description?: string;
  points: Point[];
}

export interface RobotStatus {
  battery: number;
  currentZone: string;
  currentTask: string;
  nextSchedule: string;
  isConnected: boolean;
  speed: string;
}

export interface SavedMap {
  id: string;
  name: string;
  isActive: boolean;
  lastModified: Date;
}

export interface ScheduleItem {
  id: string;
  name: string;
  time: string;
  zone: string;
  status: 'active' | 'pending' | 'completed';
}