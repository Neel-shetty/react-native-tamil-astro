import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomInput from '../../UI/CustomInput';
import CustomDropdown from '../../UI/CustomDropdown';
import {Formik} from 'formik';
import PrimaryButton from '../../UI/PrimaryButton';
import * as yup from 'yup';
import {SubmitDetails} from '../../../api/SubmitDetails';
import {useNavigation} from '@react-navigation/native';
import {DetailsFormScreenNavigationProp} from '../../../router/types';
// import HomeScreen from '../../../screens/Main/HomeScreen';
import DatePicker from './DatePicker';
import {fonts} from '../../../themes/fonts';
import {colors} from '../../../themes/colors';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store';
import {useQuery} from '@tanstack/react-query';
import {FetchBalance} from '../../../api/FetchBalance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RechargeScreen from '../../../screens/Main/RechargeScreen';
import {FetchUserDetails} from '../../../api/FetchUserDetails';
import {useTranslation} from 'react-i18next';

const InputFields = () => {
  const [gender, setGender] = useState<'male' | 'female' | 'other'>();
  const [maritalStatus, setMaritalStatus] = useState<string>();
  const [problem, setProblem] = useState<string>();
  const [dropdownErrors, setDropdownErrors] = useState({
    gender: false,
    maritalStatus: false,
    problem: false,
    time: false,
    date: false,
  });
  const [lowBalance, setLowBalance] = useState(false);
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<Date>();
  console.log('🚀 ~ file: InputFields.tsx:27 ~ InputFields ~ date:', date);

  const communicationType = useSelector(
    (state: RootState) => state.ui.communicationType,
  );
  console.log(
    '🚀 ~ file: InputFields.tsx:40 ~ InputFields ~ communicationType:',
    communicationType,
  );

  const {t} = useTranslation();

  const {
    data: balanceData,
    error: balanceError,
    isLoading: balanceLoading,
    refetch,
  } = useQuery(['userBalance'], async () => {
    const id: string = (await AsyncStorage.getItem('id')) as string;
    return FetchBalance(id);
  });

  const {
    data: userDetails,
    error: userDetailsError,
    isLoading: userDetailsLoading,
  } = useQuery(['userDetails'], FetchUserDetails);

  useEffect(() => {
    if (balanceData?.balance && Number(balanceData?.balance) < 50) {
      setLowBalance(true);
    }
  }, [balanceData, refetch]);

  function checkLowBalance() {
    if (balanceData?.balance && Number(balanceData?.balance) < 50) {
      setLowBalance(true);
    }
  }

  useEffect(() => {
    refetch();
    // checkLowBalance();
  }, [refetch]);

  const validationSchema = yup.object({
    name: yup
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name must be at most 100 characters')
      .required(),
    placeOfBirth: yup.string().required(),
  });

  const navigation =
    useNavigation<DetailsFormScreenNavigationProp['navigation']>();

  const setInitialValues = React.useCallback(() => {
    if (!userDetails) {
      return;
    }
    setTime(new Date(userDetails?.time_of_birth));
    setDate(new Date(userDetails?.date_of_birth));
    setGender(userDetails?.gender as 'male' | 'female' | 'other');
    setMaritalStatus(userDetails?.marital_status);
    setProblem(userDetails?.type_of_problem);
  }, [userDetails]);

  if (userDetailsLoading) {
    const style = {flex: 1};
    return (
      <ActivityIndicator
        style={style}
        size={'large'}
        color={colors.palette.accent500}
      />
    );
  }

  return (
    <View style={styles.root}>
      <Formik
        initialValues={{
          name: userDetails?.name ?? '',
          placeOfBirth: userDetails?.place_of_birth ?? '',
        }}
        onSubmit={async values => {
          setDropdownErrors({...dropdownErrors, gender: false});
          if (!gender) {
            // dropdownErrors.gender = true;
            setDropdownErrors({...dropdownErrors, gender: true});
            return; // NOTE: uncommnet this later
          }
          setDropdownErrors({...dropdownErrors, gender: false});
          if (!time) {
            setDropdownErrors({...dropdownErrors, time: true});
            return;
          }
          setDropdownErrors({...dropdownErrors, gender: false});
          if (!date) {
            setDropdownErrors({...dropdownErrors, date: true});
            return;
          }
          setDropdownErrors({...dropdownErrors, gender: false});
          await AsyncStorage.setItem('name', values.name);
          await SubmitDetails({
            gender: gender,
            name: values.name,
            placeOfBirth: values.placeOfBirth,
            maritialStatus: maritalStatus,
            typeOfProblem: problem,
            date: date,
            time: time,
          });
          console.log(values);
          // NOTE: Workaround for require cycle, screen name is not dynamic
          navigation.navigate('HomeScreen', {
            astrologer: '1',
            communicationType: communicationType,
            name: values.name,
          });
        }}
        validationSchema={validationSchema}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
        }) => (
          <View>
            <CustomInput
              placeholder={t('Name*')}
              handleChange={handleChange('name')}
              handleBlur={handleBlur('name')}
              value={values.name}
              error={
                errors.name && touched.name ? 'Name field is required' : ''
              }
            />
            <CustomInput
              placeholder={t('Place of Birth*')}
              handleChange={handleChange('placeOfBirth')}
              handleBlur={handleBlur('placeOfBirth')}
              value={values.placeOfBirth}
              error={
                errors.placeOfBirth && touched.placeOfBirth
                  ? t('Place of Birth field is required')
                  : ''
              }
            />
            {/*
            <DatePicker
              mode="time"
              setParentDate={setDate}
              placeholder="Time of Birth*"
            /> */}

            <DatePicker
              mode="date"
              setParentDate={setDate}
              placeholder={t('Date of Birth*')}
              error={dropdownErrors.date ? t('This is a required field') : null}
            />
            <DatePicker
              mode="time"
              setParentDate={setTime}
              placeholder={t('Time of Birth*')}
              error={dropdownErrors.time ? t('This is a required field') : null}
              initialValue={userDetails?.time_of_birth}
            />
            <CustomDropdown
              placeholder={t('Gender*')}
              value={gender}
              setValue={setGender}
              initialValue={userDetails?.date_of_birth}
              data={[
                {label: t('Male'), value: 'male'},
                {label: t('Female'), value: 'female'},
                {label: t('Other'), value: 'other'},
              ]}
              error={
                dropdownErrors.gender
                  ? t('This is a required field test')
                  : null
              }
            />
            <CustomDropdown
              placeholder={t('Marital Status')}
              value={maritalStatus}
              setValue={setMaritalStatus}
              initialValue={userDetails?.marital_status}
              error={
                dropdownErrors.maritalStatus
                  ? t('This is a required field')
                  : null
              }
              data={[
                {label: t('Single'), value: 'single'},
                {label: t('Married'), value: 'married'},
              ]}
            />
            <CustomDropdown
              placeholder={t('Type of Problem')}
              value={problem}
              setValue={setProblem}
              initialValue={userDetails?.type_of_problem}
              error={''}
              data={[
                {
                  label: t('Money'),
                  value: 'money',
                },
                {
                  label: t('Health'),
                  value: 'health',
                },
                {
                  label: t('Love'),
                  value: 'love',
                },
                {
                  label: t('Career'),
                  value: 'career',
                },
                {
                  label: t('Family'),
                  value: 'family',
                },
              ]}
            />
            <View style={styles.bottomContainer}>
              <Text style={styles.subtitle}>
                {lowBalance ? t('You need atleast 50rs to consult') : ''}
              </Text>
              <View style={styles.buttonContainer}>
                <PrimaryButton
                  title={lowBalance ? t('Recharge and Chat') : t('Start Chat')}
                  onPress={
                    lowBalance
                      ? () => {
                          navigation.pop();
                          navigation.navigate(RechargeScreen.name);
                        }
                      : handleSubmit
                  }
                />
              </View>
              <Text style={styles.subtitle}>
                {lowBalance ? t('Current Balance:') : ''}
                <Text style={styles.red}>
                  {lowBalance ? `${balanceData?.balance}rs` : ''}
                </Text>
              </Text>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default InputFields;

const styles = StyleSheet.create({
  root: {},
  bottomContainer: {
    alignItems: 'center',
  },
  subtitle: {
    fontFamily: fonts.interRegular,
    color: colors.palette.gray500,
    fontSize: 14,
  },
  red: {
    color: colors.palette.accent500,
  },
  buttonContainer: {
    marginVertical: 10,
  },
});
