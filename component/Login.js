import React from 'react';
import {
  View,
  StatusBar,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import {
  Container,
  Button,
  Text,
  Form,
  Item,
  Input,
  Icon,
  CheckBox,
  Header,
  Label,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Server from "./Server";
import AsyncStorage from "@react-native-community/async-storage";

const App = () => {
  let navigation = useNavigation();

  React.useEffect(() => {
    inisilization();
    navigation.addListener('focus', () => {
      inisilization();
    });
  }, []);

  const inisilization = () => {
    AsyncStorage.getItem('Login_row').
      then(val => {
        if (val != null) {
          navigation.goBack();
        } 
      });
  }

  const [email, setEmail] = React.useState('owais.raza@codup.io');
  const [memberId, setMemberId] = React.useState('42201-2399157-3');
  const [password, setPassword] = React.useState('test123');

  const LogIn = () => {
    // navigation.navigate('Nav');
    // console.log(email,memberId,password)
    Server.post('api/login',{
      email: email,
      cnic: memberId,
      password: password
  }).
    then(res => {
      // console.log(res.data)
      AsyncStorage.setItem('Login_row',JSON.stringify(res.data)).
      then(res => {
        navigation.navigate('Nav');
        alert('Login Success');
      })
    }).
    catch(err => alert('Invalid CNIC, Email or Password'));
  }

  return (
    <Container
      style={{
        alignItems: 'center',
        backgroundColor: '#ffffff',
        height: '100%',
      }}>
      <Header
        style={{
          textAlign: 'center',
          alignItems: 'center',
          backgroundColor: '#f2f2f2',
        }}>
        <Text
          style={[
            styles.loginTxt,
            {
              backgroundColor: '#f2f2f2',
              width: '100%',
              textAlign: 'center',
              alignItems: 'center',
            },
          ]}>
          {' '}
          Login
        </Text>
      </Header>
      {/* <Text style={styles.loginTxt}>Login</Text> */}

      <Image
        source={require('./assets/1.png')}
        style={{height: '25%', width: '25%', marginTop: '2%'}}
      />
      <Form style={styles.form}>
        <KeyboardAwareScrollView>
          <View style={styles.inputOuter}>
            <Text style={{marginLeft: '1%', fontSize: 14}}> Member ID </Text>
            <Item
              style={{
                width: '95%',
                marginLeft: '2%',
                marginTop: '5%',
                borderColor: 'black',
                borderWidth: 1,
              }}
              rounded>
              <Input 
              value={memberId}
              onChangeText={(val) => setMemberId(val)}
              placeholder=""
               />
              <Icon active name="contacts" type="AntDesign" />
            </Item>
          </View>

          <View style={styles.inputOuter}>
            <Text style={{marginLeft: '1%', marginTop: '2%', fontSize: 14}}>
              {' '}
              Email{' '}
            </Text>
            <Item
              style={{
                width: '95%',
                marginLeft: '2%',
                borderColor: 'black',
                borderWidth: 1,
              }}
              rounded>
              <Input 
                value={email}
                onChangeText={(val) => setEmail(val)}
                placeholder=""
               />
              <Icon active name="mail" type="Octicons" />
            </Item>
          </View>

          <View style={styles.inputOuter}>
            <Text style={{marginLeft: '1%', marginTop: '2%', fontSize: 14}}>
              {' '}
              Password{' '}
            </Text>
            <Item
              style={{
                width: '95%',
                marginLeft: '2%',
                borderColor: 'black',
                borderWidth: 1,
              }}
              rounded>
              <Input 
                value={password}
                onChangeText={(val) => setPassword(val)}
                placeholder=""
               />
              <Icon active name="lock" type="Octicons" />
            </Item>
          </View>

          <View
            style={[
              styles.inputOuter,
              {
                marginTop: '10%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
            ]}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 16, marginLeft: '4%'}}>
                Forgot Password?
              </Text>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </Form>

      <Button
        danger={true}
        style={styles.btns}
        rounded
        active={true}
        onPressIn={() => LogIn()}
        // onPressIn={() => navigation.navigate('Nav')}
        >
        <Text style={styles.btnTxt}>login</Text>
      </Button>
    </Container>
  );
};

const styles = StyleSheet.create({
  btns: {
    width: '85%',
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    marginTop: '4%',
  },
  loginTxt: {
    color: 'red',
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  form: {
    // borderWidth: 1,
    height: '40%',
    width: '95%',
    marginTop: '10%',
    borderRadius: 20,
    flexDirection: 'column',
    // justifyContent: 'space-evenly',
  },
  inputOuter: {
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    marginLeft: '5%',
  },
  btnTxt: {
    width: '100%',
    textAlign: 'center',
  },
});

export default App;
