import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import GradientBackground from '../components/GradientBackground';
import InputField from '../components/InputField';
import { colors } from '../constants/colors';
import { settings } from '../constants/dummyData';
import { RootStackParamList } from '../navigation/AppNavigator';

type IPAddressScreenRouteProp = RouteProp<RootStackParamList, 'IPAddress'>;

const IPAddressScreen = () => {
  const route = useRoute<IPAddressScreenRouteProp>();
  const navigation = useNavigation();
  const { title, type } = route.params;
  
  const initialIP = type === 'server' ? settings.serverIP : settings.navigationIP;
  const [ipAddress, setIpAddress] = useState(initialIP);
  const [error, setError] = useState('');

  const validateIP = (ip: string) => {
    const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipRegex.test(ip);
  };

  const handleConnect = () => {
    if (!ipAddress.trim()) {
      setError('IP address is required');
      return;
    }
    
    if (!validateIP(ipAddress)) {
      setError('Please enter a valid IP address');
      return;
    }
    
    // Handle connection logic
    console.log(`Connecting to ${type} at:`, ipAddress);
    navigation.goBack();
  };

  return (
    <GradientBackground>
      <View style={styles.container}>
        <View style={styles.content}>
          <InputField
            label={title}
            value={ipAddress}
            onChangeText={(text) => {
              setIpAddress(text);
              if (error) setError('');
            }}
            placeholder="192.168.1.1"
            keyboardType="numeric"
            error={error}
            required
          />
          
          <Button
            mode="contained"
            onPress={handleConnect}
            style={styles.connectButton}
            buttonColor={colors.accent}
            textColor={colors.primary}
            icon="connection"
          >
            Connect
          </Button>
        </View>
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 40,
  },
  connectButton: {
    marginTop: 32,
    paddingVertical: 8,
  },
});

export default IPAddressScreen;
