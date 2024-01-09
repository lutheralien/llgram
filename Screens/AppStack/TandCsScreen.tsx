import {Linking, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button, Heading} from 'native-base';

const TandCsScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <View style={styles.footer}>
        <Heading m="20" width={'5/6'} color={'lightBlue.100'}>
          Welcome to LLGram
        </Heading>
        <View style={styles.footerEnd}>
          <Text style={styles.footerText}>
            Read our{' '}
            <Text
              onPress={() => {
                Linking.openURL('https://www.google.com');
              }}
              style={styles.inline}>
              Privacy Policy.
            </Text>
            Tap "Agree and continue" to accept the Terms of Service.
          </Text>
          <Button
            size="sm"
            mt={'1/2'}
            mb={'16'}
            variant={'subtle'}
            p={'2.5'}
            backgroundColor={'blueGray.50'}
            rounded={'full'}
            onPress={() => navigation.navigate('verification')}>
            <Text style={styles.butonText}>Agree and continue</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default TandCsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A54F8',
  },
  header: {
    flex: 1,
  },
  footer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  footerEnd: {
    justifyContent: 'space-evenly',
  },
  footerText: {
    color: 'white',
  },
  inline: {
    color: '#555',
  },
  butonText: {
    color: '#1A54F8',
    fontSize: 18,
    fontWeight: '700',
  },
});
