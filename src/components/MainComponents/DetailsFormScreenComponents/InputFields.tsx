import {StyleSheet, View, Text} from 'react-native';
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

  const {
    data: balanceData,
    error: balanceError,
    isLoading: balanceLoading,
    refetch,
  } = useQuery(['userBalance'], async () => {
    const id: string = (await AsyncStorage.getItem('id')) as string;
    return FetchBalance(id);
  });

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

  return (
    <View style={styles.root}>
      <Formik
        initialValues={{name: '', placeOfBirth: ''}}
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
              placeholder="Name*"
              handleChange={handleChange('name')}
              handleBlur={handleBlur('name')}
              value={values.name}
              error={
                errors.name && touched.name ? 'Name field is required' : ''
              }
            />
            <CustomInput
              placeholder="Place of Birth*"
              handleChange={handleChange('placeOfBirth')}
              handleBlur={handleBlur('placeOfBirth')}
              value={values.placeOfBirth}
              error={
                errors.placeOfBirth && touched.placeOfBirth
                  ? 'Place of Birth field is required'
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
              placeholder="Date of Birth*"
              error={dropdownErrors.date ? 'This is a required field' : null}
            />
            <DatePicker
              mode="time"
              setParentDate={setTime}
              placeholder="Time of Birth*"
              error={dropdownErrors.time ? 'This is a required field' : null}
            />
            <CustomDropdown
              placeholder="Gender*"
              value={gender}
              setValue={setGender}
              data={[
                {label: 'Male', value: 'male'},
                {label: 'Female', value: 'female'},
                {label: 'Other', value: 'other'},
              ]}
              error={
                dropdownErrors.gender ? 'This is a required field test ' : null
              }
            />
            <CustomDropdown
              placeholder="Marital Status"
              value={maritalStatus}
              setValue={setMaritalStatus}
              error={
                dropdownErrors.maritalStatus
                  ? 'This is a required field test'
                  : null
              }
              data={[
                {label: 'Single', value: 'single'},
                {label: 'Married', value: 'married'},
              ]}
            />
            <CustomDropdown
              placeholder="Type of Problem"
              value={problem}
              setValue={setProblem}
              error={''}
              data={[
                {
                  label: 'Money',
                  value: 'money',
                },
                {
                  label: 'Health',
                  value: 'health',
                },
                {
                  label: 'Love',
                  value: 'love',
                },
                {
                  label: 'Career',
                  value: 'career',
                },
                {
                  label: 'Family',
                  value: 'family',
                },
              ]}
            />
            <View style={styles.bottomContainer}>
              <Text style={styles.subtitle}>
                {lowBalance ? 'You need atleast 50rs to consult' : ''}
              </Text>
              <View style={styles.buttonContainer}>
                <PrimaryButton
                  title={lowBalance ? 'Recharge and Chat' : 'Start Chat'}
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
                {lowBalance ? 'Current Balance:' : ''}
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
