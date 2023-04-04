import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../themes/colors';
import {layout} from '../../constants/layout';
import {fonts} from '../../themes/fonts';
import CategoryList from '../../components/MainComponents/HomeScreenComponents/CategoryList';
import AstrologerList from '../../components/MainComponents/HomeScreenComponents/AstrologerList';
import BottomSheet from '@gorhom/bottom-sheet';
import GenderOptions from '../../components/MainComponents/HomeScreenComponents/GenderOptions';

const HomeScreen = () => {
  const [visible, setVisible] = React.useState(false);
  console.log('🚀 ~ file: HomeScreen.tsx:13 ~ HomeScreen ~ visible:', visible);
  return (
    <View style={styles.root}>
      <View style={styles.padding1} />
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>
          In which area of life do you want guidance?
        </Text>
      </View>
      <CategoryList />
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Choose Astrologer Category</Text>
      </View>
      <AstrologerList setVisible={setVisible} />
      <GenderOptions visible={visible} setVisible={setVisible} />
    </View>
  );
};

export default {component: HomeScreen, name: 'HomeScreen' as const};

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.palette.white,
    width: layout.width,
    flex: 1,
  },
  headingContainer: {
    width: layout.width,
    backgroundColor: colors.palette.accent100,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.palette.blackOpacity10,
  },
  heading: {
    fontSize: 16,
    fontFamily: fonts.contageRegular,
    color: colors.text,
    paddingVertical: 5,
  },
  padding1: {
    height: layout.height * 0.02,
  },
});
