/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View, StatusBar, Image} from 'react-native';
import {Container, Body, Title} from 'native-base';
import { useNavigation, CommonActions } from '@react-navigation/native';
import AsyncStorage from "@react-native-community/async-storage";

const App = () => {
    let navigation = useNavigation()
    setTimeout(() => {
      AsyncStorage.getItem('Login_row').
      then(val => {
        if (val != null) {
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [
                { name: 'Nav' }
              ],
            })
          );
        }else{
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [
                { name: 'Welcome' }
              ],
            })
          );
        }
      });
        
    }, 1000);
  return (
    <Container
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        height: '100%',
      }}>
      <StatusBar barStyle="dark-content" />
      <View>
        <Image source={require('./assets/1.png')} />
      </View>
      <Title style={{fontSize: 20, color: 'lightgray', marginTop: '5%'}}>
        From{' '}
      </Title>
      <Title style={{fontSize: 25, color: 'lightgray',textTransform:'uppercase'}}>Editor Systima </Title>
    </Container>
  );
};

export default App;
