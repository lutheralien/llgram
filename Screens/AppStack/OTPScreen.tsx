import React, { useState, useRef, useContext, useMemo, useEffect } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { Button, Heading } from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import { BaseURL } from '../../services';

const OTPScreen = ({ navigation }) => {
  const { login, email, error } = useContext(AuthContext);
  const [isOtpValid, setIsOtpValid] = useState(false)
  const [otp, setOtp] = useState(Array(6).fill(''));
  const refs = useRef(
    Array(6)
      .fill(0)
      .map(() => React.createRef()),
  );
  const [countdown, setCountdown] = useState(30);
  useEffect(() => {
    const interval = setInterval(() => {
      if (countdown == 1) { handleOpenPress() }
      else if (countdown > 0) {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }

    }, 1000);
    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [countdown]);

  const snapPoints = useMemo(() => ['1%', '15%'], []);
  const bottomSheetRef = useRef<BottomSheet>(null)


  const handleInputChange = (index, value) => {
    const newOtp = [...otp];

    // If value is empty, replace with an empty string
    // Otherwise, replace with the entered value
    newOtp[index] = value === '' ? '' : value;
    setIsOtpValid(newOtp.every(digit => /\d/.test(digit)))
    setOtp(newOtp);

    if (value !== '' && index < 5) {
      // Auto-focus the next TextInput, if available
      refs.current[index + 1]?.focus();
    }
  };

  const handleBlur = index => {
    // If the input is blurred with an empty value, set it to an empty string
    if (otp[index] === '') {
      setOtp(prevOtp => {
        const newOtp = [...prevOtp];
        newOtp[index] = '';
        return newOtp;
      });
    }
  };

  const handleClearInput = () => {
    setOtp(Array(6).fill(''));
    // Focus the first input after clearing
    refs.current[0].focus();
  };


  const handleSubmit = () => {
    const enteredOtp = otp.join('')
    login(email, enteredOtp)
    console.log('in otp');
    console.log(error);

    // if (error) {Alert.alert('Verification Error', `Please make sure your PIN is correct`)}
  };
  const handleResendOTP = () => {
    handleClosePress();
    const verifyUser = async (email) => {
      try {
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
        setCountdown(30)
        navigation.navigate('otp')
      } catch (error) {
        // Handle errors
        console.error('Error fetching data:', error.message);
      }
    }
    verifyUser(email)
  }
  const handleClosePress = () => bottomSheetRef.current?.close()
  const handleOpenPress = () => bottomSheetRef.current?.expand()

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <View style={styles.top}>
          <Heading m="2" color={'#3b82f6'} textAlign={'center'}>
            Verify your email
          </Heading>
          <View style={styles.headText}>
            <Text style={styles.firstText}>
              Waiting to receive a 6-digit OTP code to the email
            </Text>
            <Text style={styles.secondText}>{email}.</Text>
          </View>

          <View>
            <View style={styles.otpContainer}>
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <TextInput
                    key={index}
                    ref={input => (refs.current[index] = input)}
                    style={styles.otpInput}
                    keyboardType="numeric"
                    maxLength={1}
                    value={otp[index]}
                    onChangeText={value => handleInputChange(index, value)}
                    onBlur={() => handleBlur(index)}
                  />
                ))}
            </View>
            <Text style={styles.BottomTextU}>Enter 6-digit code</Text>
            <TouchableOpacity onPress={handleOpenPress}>
              <Text style={styles.BottomTextD}>Didn't receive code?</Text>
            </TouchableOpacity>
            <Text style={styles.BottomTextT}>
              You may request a new code in{' '}
              <Text style={styles.countDownText}>{countdown}</Text>
            </Text>
            {isOtpValid && <Button
              w={'100px'}
              ml={'100px'}
              mt={'8'}
              px={'2.5'}
              backgroundColor={'blue.600'}
              rounded={'50px'}
              onPress={handleSubmit}
            >
              <Text style={styles.butonText}>Next</Text>
            </Button>}
          </View>
        </View>
        <View style={styles.bottom} />
        <BottomSheet snapPoints={snapPoints} ref={bottomSheetRef}>
          <View style={styles.bottomSheetText}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleClosePress}>
              <FontAwesomeIcon icon={faXmark} size={16} />
              <Text style={styles.cancelButtonText}> cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.resendButton} onPress={handleResendOTP}>
              <FontAwesomeIcon icon={faPaperPlane} size={16} />
              <Text style={styles.resendButtonText}> Resend</Text>
            </TouchableOpacity>

          </View>
        </BottomSheet>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dbeafe',
  },
  top: {
    flex: 1,
  },
  headText: {
    marginBottom: 20,
    color: 'blue',
  },
  firstText: {
    color: '#111',
    marginBottom: 10,
  },
  secondText: {
    color: '#111',
    fontWeight: 'bold',
  },
  BottomText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  BottomTextU: {
    color: '#555',
    textAlign: 'center',
    marginBottom: 14,
  },
  BottomTextD: {
    color: '#555',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  BottomTextT: {
    color: '#555',
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  otpInput: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#3b82f6',
    textAlign: 'center',
    marginHorizontal: 5,
    fontSize: 20,
  },
  countDownText: {
    fontWeight: 'bold',
  },
  cancelButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  cancelButtonText: {},
  resendButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  resendButtonText: {
  },

  submitButton: {
    marginTop: 10,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
  bottom: {
    flex: 1,
  },
  bottomSheetText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  butonText: {
    color: '#fff',
    fontWeight: '700',
  }
});

export default OTPScreen;
