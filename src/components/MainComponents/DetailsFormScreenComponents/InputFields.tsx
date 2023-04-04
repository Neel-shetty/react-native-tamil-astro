import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../../UI/CustomInput';
import CustomDropdown from '../../UI/CustomDropdown';
import {Formik} from 'formik';

const InputFields = () => {
  const [gender, setGender] = useState<string>('');
  return (
    <View>
      <Formik
        initialValues={{name: '', placeOfBirth: ''}}
        onSubmit={values => console.log(values)}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <View>
            <CustomInput
              placeholder="Name*"
              handleChange={handleChange('name')}
              handleBlur={handleBlur('name')}
              value={values.name}
              error={''}
            />
            <CustomDropdown
              placeholder="Gender*"
              value={gender}
              setValue={setGender}
              error={''}
            />
            <CustomInput
              placeholder="Place of Birth"
              handleChange={handleChange('placeOfBirth')}
              handleBlur={handleBlur('placeOfBirth')}
              value={values.placeOfBirth}
              error={''}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default InputFields;

const styles = StyleSheet.create({});
