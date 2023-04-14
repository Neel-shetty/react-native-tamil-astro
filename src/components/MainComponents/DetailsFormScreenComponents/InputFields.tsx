import {StyleSheet, View, Text} from 'react-native';
import React, {useState} from 'react';
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

const InputFields = () => {
  const [gender, setGender] = useState<string>();
  const [maritalStatus, setMaritalStatus] = useState<string>();
  const [problem, setProblem] = useState<string>();
  const [dropdownErrors, setDropdownErrors] = useState({
    gender: false,
    maritalStatus: false,
    problem: false,
  });
  const [lowBalance, setLowBalance] = useState(false);
  const [date, setDate] = useState<Date>();
  console.log('🚀 ~ file: InputFields.tsx:27 ~ InputFields ~ date:', date);

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
          if (!gender) {
            // dropdownErrors.gender = true;
            setDropdownErrors({...dropdownErrors, gender: true});
            return;
          }
          setDropdownErrors({...dropdownErrors, gender: false});
          await SubmitDetails({
            gender: gender,
            name: values.name,
            placeOfBirth: values.placeOfBirth,
            maritialStatus: maritalStatus,
            typeOfProblem: problem,
            time,
          });
          console.log(values);
          // NOTE: Workaround for require cycle, screen name is not dynamic
          navigation.navigate('HomeScreen', {astrologer: '1'});
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
            <CustomDropdown
              placeholder="Gender*"
              value={gender}
              setValue={setGender}
              error={
                dropdownErrors.gender ? 'This is a required field  ' : null
              }
            />
            <DatePicker setParentDate={setDate} placeholder="Time of Birth*" />
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
            <CustomDropdown
              placeholder="Marital Status"
              value={maritalStatus}
              setValue={setMaritalStatus}
              error={''}
            />
            <CustomDropdown
              placeholder="Type of Problem"
              value={problem}
              setValue={setProblem}
              error={''}
            />
            <View style={styles.bottomContainer}>
              <Text style={styles.subtitle}>
                {lowBalance ? 'You need atleast 50rs to consult' : ''}
              </Text>
              <View style={styles.buttonContainer}>
                <PrimaryButton
                  title={lowBalance ? 'Recharge and Chat' : 'Start Chat'}
                  onPress={handleSubmit}
                />
              </View>
              <Text style={styles.subtitle}>
                {lowBalance ? 'Current Balance:' : ''}
                <Text style={styles.red}>{lowBalance ? '29rs' : ''}</Text>
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
