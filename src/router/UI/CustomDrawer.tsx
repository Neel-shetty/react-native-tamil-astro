import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import Close from '../../../assets/icons/ChatScreen/close.svg';
import TabStackNavigator from '../TabStackNavigator';
import RechargeScreen from '../../screens/Main/RechargeScreen';
import {fonts} from '../../themes/fonts';
import {colors} from '../../themes/colors';
import {useDispatch} from 'react-redux';
import {setShowGenderOptions} from '../../store/UiSlice';
import HistoryScreen from '../../screens/Main/HistoryScreen';
import TransactionHistoryScreen from '../../screens/Main/TransactionHistoryScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setLoggedIn} from '../../store/UserSlice';

const Item = ({
  label,
  icon,
  onPress,
}: {
  label: string;
  icon: React.ReactNode;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <View style={styles.logoContainer}>{icon}</View>
      <Text style={styles.itemTitle}>{label}</Text>
    </TouchableOpacity>
  );
};

const CustomDrawer = (props: DrawerContentComponentProps) => {
  const dispatch = useDispatch();
  const screens = [
    {
      label: 'Home',
      onPress: () => {
        props.navigation.navigate(TabStackNavigator.name);
      },
      icon: (
        <Image source={require('../../../assets/images/drawer/home.png')} />
      ),
    },
    {
      label: 'Chat with Astrologer',
      onPress: () => {
        props.navigation.navigate(TabStackNavigator.name);
        dispatch(setShowGenderOptions(true));
      },
      icon: (
        <Image source={require('../../../assets/images/drawer/chat.png')} />
      ),
    },
    {
      label: 'Call with Astrologer',
      onPress: () => {
        props.navigation.navigate(TabStackNavigator.name);
        dispatch(setShowGenderOptions(true));
      },
      icon: (
        <Image source={require('../../../assets/images/drawer/call.png')} />
      ),
    },
    {
      label: 'Balance Recharge',
      onPress: () => {
        props.navigation.navigate(RechargeScreen.name);
      },
      icon: (
        <Image source={require('../../../assets/images/drawer/wallet.png')} />
      ),
    },
    {
      label: 'Transaction History',
      onPress: () => {
        props.navigation.navigate(TransactionHistoryScreen.name);
      },
      icon: (
        <Image source={require('../../../assets/images/drawer/file.png')} />
      ),
    },
    {
      label: 'Past Astrologer Talks',
      onPress: () => {
        props.navigation.navigate(HistoryScreen.name);
      },
      icon: (
        <Image source={require('../../../assets/images/drawer/history.png')} />
      ),
    },
    {
      label: 'Support',
      onPress: () => {
        props.navigation.navigate(TabStackNavigator.name);
      },
      icon: (
        <Image source={require('../../../assets/images/drawer/service.png')} />
      ),
    },
    {
      label: 'Log Out',
      onPress: async () => {
        await AsyncStorage.removeItem('loggedIn');
        dispatch(setLoggedIn(false));
      },
      icon: (
        <Image source={require('../../../assets/images/drawer/logout.png')} />
      ),
    },
  ];
  return (
    <View style={styles.root}>
      <DrawerContentScrollView {...props}>
        <View style={styles.headerContainer}>
          <Image source={require('../../../assets/images/drawerLogo.png')} />
          <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
            <Close />
          </TouchableOpacity>
        </View>
        {/* <DrawerItemList {...props} /> */}
        <View style={styles.itemContainer}>
          {screens.map((item, index) => (
            <Item
              key={index}
              icon={item.icon}
              label={item.label}
              onPress={item.onPress}
            />
          ))}
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  itemContainer: {
    // backgroundColor: 'pink',
    paddingLeft: 20,
    marginTop: 30,
  },
  item: {
    // backgroundColor: 'violet',
    flexDirection: 'row',
    height: 24,
    alignItems: 'center',
    marginVertical: 5,
  },
  itemTitle: {
    fontFamily: fonts.contageLight,
    fontSize: 16,
    color: colors.text,
  },
  logoContainer: {
    marginRight: 8,
    width: 20,
    justifyContent: 'center',
  },
});
