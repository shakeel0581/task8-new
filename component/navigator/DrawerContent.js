import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  List,
  Switch,
} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {useNavigation, CommonActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-community/async-storage';
import Server from "../Server";

export default function DrawerContent(props) {
  const [currentUser, setCurrentUser] = React.useState([]);
  const [expanded, setExpanded] = useState([false,false,false,false,false,false,false,false]);
  const {navigation} = props;
  useEffect(()=>{
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

  const logoutHandaler = ()=>{
    AsyncStorage.clear();
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: 'Welcome' }
        ],
      })
    );
  }
  
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Avatar.Image
                source={{
                  uri: 'https://api.adorable.io/avatars/50/abott@adorable.png',
                }}
                size={50}
              />
              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Title style={styles.title}>
                 {currentUser.fname} {currentUser.lname}
                </Title>
                <Caption style={styles.caption}>
                {currentUser.email}
                </Caption>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate('HomeScreen');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icons name="staro" color={color} size={size} />
              )}
              label="Overview"
              onPress={() => {
                props.navigation.navigate('Featured');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icons name="like2" color={color} size={size} />
              )}
              label="Update Profile"
              onPress={() => {
                props.navigation.navigate('Update_Profile');
              }}
            />
           
            <DrawerItem 
              onPress={() => navigation.navigate('Announcements')}
              icon={({color, size}) => (
                <Icon name="exit-to-app" color={color} size={size} />
              )}
              label="Announcement"
            />
            <DrawerItem 
              onPress={() => navigation.navigate('Events')}
              icon={({color, size}) => (
                <Icon name="exit-to-app" color={color} size={size} />
              )}
              label="Events"
            />
            {currentUser.isAdmin == '1' &&
            <DrawerItem 
              onPress={() => navigation.navigate('Budget')}
              icon={({color, size}) => (
                <Icon name="exit-to-app" color={color} size={size} />
              )}
              label="Add Budget"
            />
            }
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="exit-to-app" color={color} size={size} />
              )}
              label="Donate Now"
            />
            <DrawerItem
              onPress={logoutHandaler}
              icon={({color, size}) => (
                <Icon name="exit-to-app" color={color} size={size} />
              )}
              label="Logout"
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
