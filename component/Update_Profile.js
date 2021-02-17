import React, {useState} from 'react';
import {View, StatusBar, Platform, StyleSheet} from 'react-native';
import {
  Container,
  Button,
  Text,
  Form,
  Item,
  Input,
  Icon,
  Header,
} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from "@react-native-community/async-storage";
import Server from "./Server";
import {useNavigation,CommonActions} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { registerAnimation } from 'react-native-animatable';
import Loader from "./Loader";


const App = (props) => {
  let navigation = useNavigation();
  const [loader, setloader] = React.useState(false);
  

  let [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(1598051730000));

  const [fName, setFname] = useState('shakeel');
  const [lname, setlname] = useState('Ali');
  const [PhoneNo, setPhoneNo] = useState('03214567891');
  const [Education, setEducation] = useState('MSC');
  const [Gender, setGender] = useState('male');
  const [token, setToken] = useState('');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  React.useEffect(()=>{
    init();
  },[]);

  const init =() => {
    setloader(true);
    AsyncStorage.getItem('Login_row').
          then(val => {
              if (val == null) {
                  navigation.navigate('LoginScreen');
              } else {
                  const login_row = JSON.parse(val);
                    Server.get('/api/getuser',{
                      headers:{
                          'Authorization': `Bearer ${login_row.access_token}`
                      }
                    }).
                    then(res => {
                      console.log(res.data)
                      setToken(login_row.access_token);
                      setFname(res.data.fname);
                      setlname(res.data.lname);
                      setPhoneNo(res.data.phone);
                      setEducation(res.data.education);
                      setGender(res.data.gender);
                      // setDate(res.data.dob);
                      setloader(false);
                  }).
                  catch(err => {
                      alert(err);
                      setloader(false);
                  });
              }
          })
  }

  const registerUser = () => {
    setloader(true);
    Server.put('api/update_profile',{
      fname: fName,
      lname:lname ,
      phone: PhoneNo,
      education : Education,
      gender : Gender,
      dob : date
  },{
    headers:{
      'Authorization': `Bearer ${token}`
    }
  }).
    then(res => {
      AsyncStorage.setItem('Login_row',JSON.stringify(res.data)).
      then(res => {
        props.navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              { name: 'Nav' }
            ],
          })
        );
        alert('Profile updated');
        setloader(false);
      })
    }).
    catch(err => {
      alert('There is error to update profile');
    setloader(false);
  });
  }

  return (
      <Container
        style={{
          alignItems: 'center',
          backgroundColor: '#ffffff',
          height: '100%',
        }}>
        <StatusBar barStyle="dark-content" />
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
                color: '#ED553B',
                fontWeight: 'bold',
                fontSize: 18,
              },
            ]}>
            {' '}
            Update Profile
          </Text>
        </Header>

        <Form style={styles.form}>
        <Loader loading={loader} />

          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.inputOuter}>
              <Text style={{marginLeft: '1%', fontSize: 14}}> First Name </Text>
              <Item
                style={{
                  width: '95%',
                  marginLeft: '2%',
                  borderColor: 'black',
                  borderWidth: 1,
                }}
                rounded>
                <Input 
                value={fName}
                onChangeText={(val) => setFname(val)}
                placeholder=""
                style={{height: 40}}
               />
                <Icon
                  active
                  name="account"
                  type="MaterialCommunityIcons"
                  style={{fontSize: 18}}
                />
              </Item>
            </View>
            <View style={styles.inputOuter}>
              <Text style={{marginLeft: '1%', fontSize: 14}}> Last Name </Text>
              <Item
                style={{
                  width: '95%',
                  marginLeft: '2%',
                  borderColor: 'black',
                  borderWidth: 1,
                }}
                rounded>
                <Input 
                value={lname}
                onChangeText={(val) => setlname(val)}
                placeholder=""
                style={{height: 40}}
               />
                <Icon
                  active
                  name="account"
                  type="MaterialCommunityIcons"
                  style={{fontSize: 18}}
                />
              </Item>
            </View>
            <View style={styles.inputOuter}>
              <Text style={{marginLeft: '1%', fontSize: 14}}> Phone </Text>
              <Item
                style={{
                  width: '95%',
                  marginLeft: '2%',
                  borderColor: 'black',
                  borderWidth: 1,
                }}
                rounded>
                <Input 
                value={PhoneNo}
                onChangeText={(val) => setPhoneNo(val)}
                placeholder=""
                style={{height: 40}}
               />
                <Icon
                  active
                  name="phone"
                  type="Entypo"
                  style={{fontSize: 18}}
                />
              </Item>
            </View>
            <View style={styles.inputOuter}>
              <Text style={{marginLeft: '1%', fontSize: 14}}> Education </Text>
              <Item
                style={{
                  width: '95%',
                  marginLeft: '2%',
                  borderColor: 'black',
                  borderWidth: 1,
                }}
                rounded>
                <Input 
                value={Education}
                onChangeText={(val) => setEducation(val)}
                placeholder=""
                style={{height: 40}}
               />
                <Icon
                  active
                  name="book"
                  type="FontAwesome5"
                  style={{fontSize: 18}}
                />
              </Item>
            </View>
            <View style={styles.inputOuter}>
              <Text style={{marginLeft: '1%', fontSize: 14}}> Gender </Text>
              <Item
                style={{
                  width: '95%',
                  marginLeft: '2%',
                  borderColor: 'black',
                  borderWidth: 1,
                }}
                rounded>
                <Input 
                value={Gender}
                onChangeText={(val) => setGender(val)}
                placeholder=""
                style={{height: 40}}
               />
                <Icon
                  active
                  name="human-male-female"
                  type="MaterialCommunityIcons"
                  style={{fontSize: 18}}
                />
              </Item>
            </View>
            <View style={styles.inputOuter}>
              <Text style={{marginLeft: '1%', fontSize: 14}}> DoB </Text>
              <Item
                style={{
                  width: '95%',
                  marginLeft: '2%',
                  borderColor: 'black',
                  borderWidth: 1,
                }}
                rounded>
                <Input
                  placeholder=""
                  style={{height: 40}}
                  value={date.toString().slice(0, 15)}
                  onTouchStart={() => setShow(true)}
                />

                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                  />
                )}
                <Icon
                  active
                  name="calendar-alt"
                  type="FontAwesome5"
                  style={{fontSize: 18}}
                />
              </Item>
            </View>
            <Button onPress={()=> registerUser()} danger={true} style={styles.btns} rounded>
              <Text>Update</Text>
            </Button>
          </KeyboardAwareScrollView>
        </Form>
      </Container>
  );
};

const styles = StyleSheet.create({
  btns: {
    width: '87%',
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    marginVertical: '5%',
  },
  registerTitle: {
    color: 'red',
    textTransform: 'uppercase',
    fontSize: 18,
    marginVertical: '5%',
  },
  form: {
    height: '90%',
    width: '95%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: '3%',
  },
  inputOuter: {
    // marginLeft: '2%',
    // marginTop: 15,
  },
});

export default App;
