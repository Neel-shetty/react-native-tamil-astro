import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../themes/colors';
import {layout} from '../../constants/layout';
import {fonts} from '../../themes/fonts';
import CategoryList from '../../components/MainComponents/HomeScreenComponents/CategoryList';
import AstrologerList from '../../components/MainComponents/HomeScreenComponents/AstrologerList';
import GenderOptions from '../../components/MainComponents/HomeScreenComponents/GenderOptions';
import AstrologerWaitModal from '../../components/MainComponents/HomeScreenComponents/AstrologerWaitModal';
import {useRoute} from '@react-navigation/native';
import {HomeScreenNavigationProp} from '../../router/types';
import AstrologerOptions from '../../components/MainComponents/HomeScreenComponents/AtrologerOptions';

const HomeScreen = () => {
  const [visible, setVisible] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [astrologerOptionsVisible, setAstrologerOptionsVisible] =
    React.useState(false);
  const [flow, setFlow] = React.useState<'astrologer' | 'category'>('category');
  console.log('🚀 ~ file: HomeScreen.tsx:20 ~ HomeScreen ~ flow:', flow);

  const route = useRoute<HomeScreenNavigationProp['route']>();

  React.useEffect(() => {
    const astrologer = route.params?.astrologer;
    if (astrologer) {
      setShowModal(true);
    }
  }, [route.params?.astrologer]);

  // function showAstrologerOptions() {
  //   console.log('running');
  //   setAstrologerOptionsVisible(true);
  // }

  React.useEffect(() => {
    return () => {
      setFlow('category');
    };
  }, []);

  return (
    <View style={styles.root}>
      <View style={styles.padding1} />
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>
          In which area of life do you want guidance?
        </Text>
      </View>
      <CategoryList
        onPress={() => {
          console.log('pressed');
          setFlow('category');
          setVisible(true);
        }}
      />
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Choose Astrologer Category</Text>
      </View>
      <AstrologerList
        onPress={() => {
          setFlow('astrologer');
        }}
        setVisible={setVisible}
      />
      <GenderOptions
        showAstrologerOptions={setAstrologerOptionsVisible}
        flow={flow}
        visible={visible}
        setVisible={setVisible}
      />
      <AstrologerOptions
        visible={astrologerOptionsVisible}
        setVisible={setAstrologerOptionsVisible}
      />
      <AstrologerWaitModal
        astroId={route.params?.astrologer ?? ''}
        visible={showModal}
        setVisible={setShowModal}
      />
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
  // modal: {
  //   backgroundColor: 'white',
  //   // padding: 22,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderRadius: 4,
  // },
});
