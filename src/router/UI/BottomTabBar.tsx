import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import History from '../../../assets/icons/Navigation/history.svg';
import Home from '../../../assets/icons/Navigation/home.svg';
import {colors} from '../../themes/colors';
import {fonts} from '../../themes/fonts';
import DrawerNavigator from '../DrawerNavigator';
import TabStackNavigator from '../TabStackNavigator';
import HomeScreen from '../../screens/Main/HomeScreen';
import {useDispatch} from 'react-redux';
import {setFlow, setShowGenderOptions} from '../../store/UiSlice';

const BottomTabBar = ({state, descriptors, navigation}: BottomTabBarProps) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.root}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true, params: {}});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <View
            key={index}
            // onPress={onPress}
            // onLongPress={onLongPress}
            style={styles.otherButton}>
            {label === 'Home' && (
              <View style={styles.otherButton}>
                <TouchableOpacity
                  accessibilityRole="button"
                  accessibilityState={isFocused ? {selected: true} : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  testID={options.tabBarTestID}
                  onLongPress={onLongPress}
                  onPress={onPress}>
                  <Home />
                </TouchableOpacity>
                <View>
                  <Text style={styles.title}>Home</Text>
                </View>
              </View>
            )}
            {label === 'ConsultAstrologer' && (
              <View style={styles.circleRoot}>
                <View style={styles.space} />
                {/* <View style={styles.middleTabSpace} /> */}
                <View style={styles.circleBorder}>
                  <View style={styles.circleBorderMask} />
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate(DrawerNavigator.name, {
                        screen: TabStackNavigator.name,
                        params: {
                          screen: HomeScreen.name,
                        },
                      });
                      dispatch(setShowGenderOptions(true));
                      dispatch(setFlow('category'));
                    }}
                    style={styles.touchable}>
                    <Image
                      source={require('../../../assets/images/consult.png')}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{}}>
                  <Text style={styles.title}>Consult Astrologer</Text>
                </View>
              </View>
            )}
            {label === 'History' && (
              <View style={styles.otherButton}>
                <TouchableOpacity
                  accessibilityRole="button"
                  accessibilityState={isFocused ? {selected: true} : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  testID={options.tabBarTestID}
                  onLongPress={onLongPress}
                  onPress={onPress}>
                  <History />
                </TouchableOpacity>
                <View>
                  <Text style={styles.title}>History</Text>
                </View>
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
};

export default BottomTabBar;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderColor: colors.palette.accent500,
    backgroundColor: 'pink',
  },
  otherButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.palette.white,
    justifyContent: 'center',
    height: 40,
  },
  circleBorder: {
    position: 'absolute',
    top: -24,
    alignSelf: 'center',
    backgroundColor: colors.palette.white,
    borderRadius: 30,
    height: 55,
    width: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: colors.palette.accent500,
  },
  touchable: {
    borderRadius: 30,
    height: 55,
    width: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleBorderMask: {
    position: 'absolute',
    width: 60,
    backgroundColor: colors.palette.white,
    height: 31,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleImage: {},
  space: {height: 26},
  title: {
    fontFamily: fonts.contageRegular,
    fontSize: 10,
    color: colors.text,
    textAlign: 'center',
    padding: 0,
  },
  circleRoot: {flex: 1, width: 100},
});
