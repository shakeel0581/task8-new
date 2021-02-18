import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Container, Text, Icon, Item, Input, Card, CardItem} from 'native-base';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import Screen1 from './MyServices1';
import Screen2 from './MyServices2';
import ServicesList from "./TabScreen/services";
import ServiceRequest from "./OurServices";

const Tab = createBottomTabNavigator();

const Services = () => {
  let [currentScreen, setCurrentScreen] = useState();
  let [show, setShow] = useState(false);

  return (
    <Tab.Navigator
      initialRouteName="Home3"
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}>
      <Tab.Screen
        name="Home2"
        component={ServicesList}
        options={{
          tabBarLabel: () => {
            return (
              <Text
                style={{
                  backgroundColor: 'black',
                  width: '120%',
                  color: 'white',
                  textAlign: 'center',
                  fontSize: 10,
                }}>
                Services Request
              </Text>
            );
          },
          tabBarIcon: ({color, size}) => (
            <View
              style={{
                backgroundColor: 'black',
                height: '120%',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => setCurrentScreen(Screen1)}>
              <Image
                source={require('./assets/9.png')}
                style={{height: 30, width: 30}}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Home3"
        component={ServicesList}
        options={{
          tabBarLabel: () => {
            return (
              <Text
                style={{
                  backgroundColor: 'black',
                  width: '100%',
                  color: 'white',
                  textAlign: 'center',
                  fontSize: 12,
                }}>
                Home
              </Text>
            );
          },
          tabBarIcon: ({color, size}) => (
            <View
              style={{
                backgroundColor: 'black',
                height: '120%',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => setCurrentScreen(App)}>
              <Icon
                type="Ionicons"
                name="home"
                style={{fontSize: 25, color: 'white'}}
              />
            </View>
          ),
        }}
      />
      {/* <Tab.Screen
        name="Home"
        component={() => <Text></Text>}
        options={{
          tabBarLabel: () => {
            return (
              <Text
                style={{
                  backgroundColor: 'black',
                  width: '100%',
                }}></Text>
            );
          },
          tabBarIcon: ({color, size}) => (
            <View
              style={{
                backgroundColor: 'black',
                height: '120%',
                width: '100%',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  height: 60,
                  position: 'relative',
                  borderRadius: 50,
                  width: 60,
                  top: -25,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {show && (
                  <Animatable.View
                    animation="zoomInUp"
                    style={{
                      position: 'absolute',
                      zIndex: 122,
                      top: -40,
                      flexDirection: 'row',
                      width: 120,
                      backgroundColor: '#ffffff',
                      justifyContent: 'center',
                      borderRadius: 25,
                      elevation: 10,
                      padding: 5,
                    }}>
                    <Icon
                      type="Zocial"
                      name="statusnet"
                      style={{fontSize: 20, color: 'black'}}
                    />
                    <Text>{'  '} Status</Text>
                  </Animatable.View>
                )}
                <TouchableOpacity
                  style={{
                    backgroundColor: '#fe019a',
                    height: 50,
                    borderRadius: 50,
                    width: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => setShow(!show)}>
                  <Icon
                    type="Feather"
                    name="plus"
                    style={{fontSize: 25, color: 'white'}}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ),
        }}
      /> */}
      <Tab.Screen
        name="Home4"
        component={Screen1}
        options={{
          tabBarLabel: () => {
            return (
              <Text
                style={{
                  backgroundColor: 'black',
                  width: '100%',
                  color: 'white',
                  textAlign: 'center',
                  fontSize: 12,
                }}>
                {' '}
                Approvals
              </Text>
            );
          },
          tabBarIcon: ({color, size}) => (
            <View
              style={{
                backgroundColor: 'black',
                height: '115%',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => setCurrentScreen(Screen1)}>
              <Icon
                type="AntDesign"
                name="checkcircleo"
                style={{fontSize: 25, color: 'white'}}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Home5"
        component={Screen2}
        options={{
          tabBarLabel: () => {
            return (
              <Text
                style={{
                  backgroundColor: 'black',
                  width: '100%',
                  color: 'white',
                  textAlign: 'center',
                  fontSize: 12,
                }}>
                {' '}
                More
              </Text>
            );
          },
          tabBarIcon: ({color, size}) => (
            <View
              style={{
                backgroundColor: 'black',
                height: '115%',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => setCurrentScreen(Screen2)}>
              <Icon
                type="Feather"
                name="menu"
                style={{fontSize: 25, color: 'white'}}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  btns: {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    marginTop: '7%',
  },
  registerTitle: {
    color: 'red',
    textTransform: 'uppercase',
    fontSize: 18,
  },
  form: {
    height: '75%',
    width: '95%',
    marginTop: '10%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  inputOuter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textTransform: 'uppercase',
    fontSize: 14,
  },
});

export default Services;
