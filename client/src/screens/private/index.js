import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import checkinEnable from '../../assets/images/checkinenable.png';
import checkinDisable from '../../assets/images/checkindisable.png';
import roomEnable from '../../assets/images/roomenable.png';
import roomDisable from '../../assets/images/roomdisable.png';
import customerEnable from '../../assets/images/customerenable.png';
import customerDisable from '../../assets/images/customerdisable.png';
import profileEnable from '../../assets/images/profileenable.png';
import profileDisable from '../../assets/images/profiledisable.png';

import Checkin from './views/Checkin';
import Room from './views/Room';
import Customer from './views/Customer';
import Settings from './views/Settings';

import colors from '../../config/colors';

const CheckinStack = createStackNavigator(
  {
    Checkin: {
      screen: Checkin,
    },
  },
  {
    headerMode: 'none',
  },
);

const RoomStack = createStackNavigator(
  {
    Room: {
      screen: Room,
    },
  },
  {
    headerMode: 'none',
  },
);

const CustomerStack = createStackNavigator(
  {
    Customer: {
      screen: Customer,
    },
  },
  {
    headerMode: 'none',
  },
);

const SettingsStack = createStackNavigator(
  {
    Settings: {
      screen: Settings,
    },
  },
  {
    headerMode: 'none',
  },
);

const AppStack = createBottomTabNavigator(
  {
    Checkin: CheckinStack,
    Room: RoomStack,
    Customer: CustomerStack,
    Settings: SettingsStack,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused}) => {
        const {routeName} = navigation.state;

        if (routeName === 'Checkin') {
          const uri = focused ? checkinEnable : checkinDisable;

          return <Image source={uri} style={styles.roomLogo} />;
        } else if (routeName == 'Room') {
          const uri = focused ? roomEnable : roomDisable;

          return <Image source={uri} style={styles.roomLogo} />;
        } else if (routeName == 'Customer') {
          const uri = focused ? customerEnable : customerDisable;

          return <Image source={uri} style={styles.roomLogo} />;
        } else {
          const uri = focused ? profileEnable : profileDisable;

          return <Image source={uri} style={styles.roomLogo2} />;
        }
      },
    }),
    tabBarOptions: {
      showLabel: false,
      style: {
        height: 60,
        backgroundColor: colors.LIGHT_BLUE,
      },
    },
  },
);

const styles = StyleSheet.create({
  roomLogo: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },
  roomLogo2: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});

export default AppStack;
