import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../../UI/CustomInput';
import CustomDropdown from '../../UI/CustomDropdown';
import {Formik} from 'formik';
import PrimaryButton from '../../UI/PrimaryButton';
import * as yup from 'yup';
import {SubmitDetails} from '../../../api/SubmitDetails';
import {useNavigation} from '@react-navigation/native';
import {DetailsFormScreenNavigationProp} from '../../../router/types';
import HomeScreen from '../../../screens/Main/HomeScreen';

const InputFields = () => {
  const [gender, setGender] = useState<string>();
  const [maritalStatus, setMaritalStatus] = useState<string>();
  const [problem, setProblem] = useState<string>();
  const [dropdownErrors, setDropdownErrors] = useState({
    gender: false,
    maritalStatus: false,
    problem: false,
  });

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
          const result = await SubmitDetails({
            gender: gender,
            name: values.name,
            placeOfBirth: values.placeOfBirth,
            maritialStatus: maritalStatus,
            typeOfProblem: problem,
          });
          console.log(values);
          navigation.navigate(HomeScreen.name, {astrologer: '1'});
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
            <PrimaryButton title="Chat" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default InputFields;

const styles = StyleSheet.create({
  root: {},
});
