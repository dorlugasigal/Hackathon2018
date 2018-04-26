import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import MapScreen from '../screens/MapScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AboutScreen from '../screens/AboutScreen';
import SignInScreen from '../screens/SignInScreen';
import ContactsScreen from "../screens/ContactsScreen";

export default TabNavigator(
  {
    SignIn: {
      screen: SignInScreen,
    },
    Map: {
      screen: MapScreen,
    },
    Profile: {
      screen: ProfileScreen,
    },
    About: {
      screen: AboutScreen,
    },
    Contacts: {
      screen: ContactsScreen
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Map':
            iconName ='ios-navigate';
            break;  
          case 'Profile':
            iconName = 'md-person';
            break;
          case 'About':
            iconName ='ios-help-circle-outline';
            break;
          case 'SignIn':
            iconName ='ios-log-in-outline';
            break;
          case 'Contacts':
            iconName ='md-people';
            break;
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3, width: 25 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);
