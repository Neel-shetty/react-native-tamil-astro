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

const HomeScreen = () => {
  const [visible, setVisible] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);

  const route = useRoute<HomeScreenNavigationProp['route']>();

  React.useEffect(() => {
    const astrologer = route.params?.astrologer;
    if (astrologer) {
      setShowModal(true);
    }
  }, [route.params?.astrologer]);

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
      {/* <Modal

        style={styles.modal}
        backdropColor={colors.palette.accent500}
        isVisible={true}>
        <Text>test</Text>
      </Modal> */}
      <AstrologerWaitModal
        astroId={route.params?.astrologer ?? ''}
        visible={showModal}
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
