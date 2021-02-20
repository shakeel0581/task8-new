import React from 'react';
import {Button, View, Text, Image} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialIcons';
import MyServices from '../MyServices';
import DrawerContent from './DrawerContent';
const Drawer = createDrawerNavigator();
import Server from "../Server";
import AsyncStorage from '@react-native-community/async-storage';

export default function RouteNav() {
  const [currentUser, setCurrentUser] = React.useState([]);
  React.useEffect(()=>{
    init();
  },[]);
  const init =() => {
    AsyncStorage.getItem('Login_row').
          then(val => {
              if (val == null) {
                  navigation.navigate('LoginScreen');
              } else {
                  const login_row = JSON.parse(val);
                  console.log(login_row)
                    Server.get('/api/getuser',{
                      headers:{
                          'Authorization': `Bearer ${login_row.access_token}`
                      }
                    }).then(res => {
                      setCurrentUser(res.data);
                  }).
                  catch(err => {
                      alert(err);
                  });
              }
          })
  }
  return (
    <Drawer.Navigator initialRouteName="MyServices" drawerPosition="right"  drawerContent={(props) => <DrawerContent {...props} currentUser={currentUser}  />}>
      <Drawer.Screen
        name="MyServices"
        options={{
          // drawerIcon: ({focused, color, size}) => (
          //   <Image
          //     source={require('../../asset/Images/icon_dashboard.png')}
          //     style={{marginLeft: 2}}
          //   />
          // ),
          drawerLabel: ({focused, color}) => (
            <Text style={{color: 'black'}}>Dashboard</Text>
          ),
          unmountOnBlur: () => true,
        }}
      >
        {(props) => <MyServices {...props} currentUser={currentUser} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}
