import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../constants/colors';

interface DirectionalControlProps {
  onDirectionPress?: (direction: 'up' | 'down' | 'left' | 'right' | 'center') => void;
}

const DirectionalControl: React.FC<DirectionalControlProps> = ({ onDirectionPress }) => {
  const handlePress = (direction: 'up' | 'down' | 'left' | 'right' | 'center') => {
    onDirectionPress?.(direction);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity
          style={styles.directionButton}
          onPress={() => handlePress('up')}
        >
          <Icon name="triangle" size={30} color={colors.accent} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.middleRow}>
        <TouchableOpacity
          style={styles.directionButton}
          onPress={() => handlePress('left')}
        >
          <Icon name="triangle" size={30} color={colors.accent} style={{ transform: [{ rotate: '-90deg' }] }} />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.directionButton, styles.centerButton]}
          onPress={() => handlePress('center')}
        >
          <Icon name="circle" size={40} color={colors.primary} />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.directionButton}
          onPress={() => handlePress('right')}
        >
          <Icon name="triangle" size={30} color={colors.accent} style={{ transform: [{ rotate: '90deg' }] }} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.bottomRow}>
        <TouchableOpacity
          style={styles.directionButton}
          onPress={() => handlePress('down')}
        >
          <Icon name="triangle" size={30} color={colors.accent} style={{ transform: [{ rotate: '180deg' }] }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 150,
  },
  topRow: {
    alignItems: 'center',
    marginBottom: 10,
  },
  middleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  bottomRow: {
    alignItems: 'center',
  },
  directionButton: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerButton: {
    backgroundColor: colors.cardBackground,
    borderRadius: 25,
    width: 50,
    height: 50,
  },
});

export default DirectionalControl;
