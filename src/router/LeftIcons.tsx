import React, {useMemo} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {leftIconStyle, spacer} from './DrawerNavigator';

export const LeftIcons = ({navigation}: {navigation: any}) => {
  const imageStyle = useMemo(() => {
    return {height: 35, width: 35};
  }, []);

  return (
    <View style={leftIconStyle}>
      <TouchableOpacity
        onPress={() => {
          navigation.openDrawer();
        }}>
        <Image source={require('../../assets/images/hamburgerMenu.png')} />
      </TouchableOpacity>
      <View style={spacer} />
      <Image
        style={imageStyle}
        source={require('../../assets/images/TamilAstro_logo1.png')}
      />
    </View>
  );
};
