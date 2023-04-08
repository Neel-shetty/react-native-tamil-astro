import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {leftIconStyle, spacer} from './DrawerNavigator';

export const LeftIcons = ({navigation}: {navigation: any}) => {
  return (
    <View style={leftIconStyle}>
      <TouchableOpacity
        onPress={() => {
          navigation.openDrawer();
        }}>
        <Image source={require('../../assets/images/hamburgerMenu.png')} />
      </TouchableOpacity>
      <View style={spacer} />
      <Image source={require('../../assets/images/headerLogo.png')} />
    </View>
  );
};
