import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useContext, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../../context/AuthContext';
import { Button, Heading, Input } from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons/faEnvelope';
import { BaseURL } from '../../services';
import axios from 'axios';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Provide a valid email address')
    .required('Required'),
});

const VerificationScreen = ({ navigation }) => {

  const { login, email, setEmail } = useContext(AuthContext);

  const inValidForm = () => {
    Alert.alert('Invalid Form', 'Please provide all required fields', [
      {
        text: 'Continue',
        onPress: () => { },
      },
      { defaultIndex: 1 },
    ]);
  };

  const registerUser = values => {
    Alert.alert(
      'Confirm Email Address: ',
      `You entered the email address: ${'\n\n'} ${values.email} ${'\n\n'} Is this OK, or would you like to edit the \n email?`,
      [
        { text: 'Edit', onPress: () => console.log('Edit presed') },
        { text: 'OK', onPress: () => verifyUser(values.email) },

      ],
    );
  };

  // const makeRequest =   ()=> {
  //   verifyUser()
  //   console.log('hey');

  //   navigation.navigate('otp')
  // }

  const verifyUser = async (email) => {
    try {
      setEmail(email)
      const data = { email }
      console.log(data);
      const options = {
        headers: {
          "Content-Type": "application/json",
          'Accept': '*/*',
        }
      }
      // Make an API call using Axios
      const response = await axios.post(`${BaseURL}/api/v1/user/generate-otp`, data, options);

      // Access the data from the response
      const responseData = response.data;

      // Use the data as needed
      console.log(responseData);
      navigation.navigate('otp')
    } catch (error) {
      // Handle errors
      console.error('Error fetching data:', error.message);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Heading m="16" color={'lightBlue.100'}>
          Enter your email Address
        </Heading>
        <Text style={styles.headText}>
          LLGram will need to verify your Account.
        </Text>
      </View>
      <View style={styles.footer}>
        <Formik
          initialValues={{
            email: '',
          }}
          validationSchema={validationSchema}
          onSubmit={values => registerUser(values)}>
          {({
            handleChange,
            handleBlur,
            touched,
            handleSubmit,
            values,
            errors,
            isValid,
            setFieldTouched,
          }) => (
            <View>
              <View>
                <View style={styles.formikInputParent}>
                  <View>
                    <Input
                      onFocus={() => {
                        setFieldTouched('email');
                      }}
                      onBlur={() => {
                        setFieldTouched('email', '');
                      }}
                      value={values.email}
                      onChangeText={handleChange('email')}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                      variant={'underlined'}
                      placeholder="email"
                      mx={'2.5'}
                      backgroundColor={'blue.100'}
                      InputLeftElement={
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          size={18}
                          color="blue"
                          secondaryColor="red"
                          secondaryOpacity={0.4}
                          style={styles.icon}
                        />
                      }
                    />
                    {touched.email && errors.email && (
                      <Text>{errors.email}</Text>
                    )}
                  </View>

                  <Button
                    w={'100px'}
                    ml={'150px'}
                    mt={'10'}
                    px={'2.5'}
                    backgroundColor={'blue.600'}
                    rounded={'50px'}
                    onPress={isValid ? handleSubmit : inValidForm}
                    isValid>
                    <Text style={styles.butonText}>Next</Text>
                  </Button>
                </View>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default VerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: '#3b82f6',
  },
  header: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#3b82f6',
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#dbeafe',
  },
  footerButton: {
    width: 100,
    margin: 'auto',
  },
  headText: {
    color: '#fff',
  },
  formikInputParent: {},
  icon: {
    marginRight: 20,
  },
  butonText: {
    color: '#fff',
    fontWeight: '700',
  },
});
