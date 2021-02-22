import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import {Container, Text, Icon, Item, Input, Card, CardItem} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';
import Server from "../Server";
import Loader from "../Loader";

export default App = () => {
    let navigation = useNavigation();
    let [show, setShow] = useState(false);
    let [loader, setLoader] = useState(true);
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
                      Server.get('/api/getuser',{
                        headers:{
                            'Authorization': `Bearer ${login_row.access_token}`
                        }
                      }).then(res => {
                        setCurrentUser(res.data);
                        setLoader(false);
                    }).
                    catch(err => {
                        alert(err);
                        setLoader(false);
                    });
                }
            })
    }

    if (loader) {
      return  <Loader />
    }
  
    return (
      <Container
        style={styles.container}>
        
        <View
          style={{
            height: '13%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{marginLeft: '4%', fontSize: 20, fontWeight: 'bold'}}>
              Dashboard
            </Text>
          </View>
            
          <View
            style={{
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '3%',
              flexDirection: 'row',
            }}>
            <Icon
            name="menu"
            type="Entypo"
            style={{marginRight: '2%', fontSize: 40}}
            onPress={() => navigation.openDrawer()}
          />
          </View>
        </View>
        {currentUser.isAdmin == '1' ?
         <ScrollView>
         <View
           style={{
             flexDirection: 'row',
             justifyContent: 'center',
             marginTop: '3%',
           }}>
           <TouchableOpacity style={{width: '40%'}} 
               onPress={()=> navigation.navigate('OurServices')}
               >
               <Card >
               <CardItem
                   cardBody
                   style={{height: 100, flex: 1, justifyContent: 'center'}}>
                   <Image
                   source={require('../assets/25.png')}
                   style={{height: 100, width: 100}}
                   />
               </CardItem>
               <CardItem style={{justifyContent: 'center'}}>
                   <Text style={styles.text}>Services Approval</Text>
               </CardItem>
               </Card>
           </TouchableOpacity>

           <TouchableOpacity style={{width: '40%', marginLeft: '3%'}} 
               onPress={()=> navigation.navigate('Announcements',{type: 'Education'})}
               >
           <Card >
             <CardItem
               cardBody
               style={{height: 100, flex: 1, justifyContent: 'center'}}>
               <Image
                 source={require('../assets/26.png')}
                 style={{height: 100, width: 100}}
               />
             </CardItem>
             <CardItem style={{justifyContent: 'center'}}>
               <Text style={styles.text}>Add Announcement</Text>
             </CardItem>
           </Card>
           </TouchableOpacity>
         </View>

         <View
           style={{
             flexDirection: 'row',
             justifyContent: 'center',
             marginTop: '3%',
           }}>
           <TouchableOpacity style={{width: '40%'}} 
               onPress={()=> navigation.navigate('Events',{type: 'House Help'})}
               > 
           <Card>
             <CardItem
               cardBody
               style={{height: 100, flex: 1, justifyContent: 'center'}}>
               <Image
                 source={require('../assets/27.png')}
                 style={{height: 90, width: 90}}
               />
             </CardItem>
             <CardItem style={{justifyContent: 'center'}}>
               <Text style={styles.text}>Add Event</Text>
             </CardItem>
           </Card>
           </TouchableOpacity>
           <TouchableOpacity style={{width: '40%', marginLeft: '3%'}}
               onPress={()=> navigation.navigate('Budget',{type: 'Medical'})}
               > 
           <Card >
             <CardItem
               cardBody
               style={{height: 100, flex: 1, justifyContent: 'center'}}>
               <Image
                 source={require('../assets/23.png')}
                 style={{height: 70, width: 70}}
               />
             </CardItem>
             <CardItem style={{justifyContent: 'center'}}>
               <Text style={styles.text}>Add Budget </Text>
             </CardItem>
           </Card>
           </TouchableOpacity>
         </View>

         
         <View
           style={{
             flexDirection: 'row',
             justifyContent: 'center',
             marginTop: '3%',
           }}>
               <TouchableOpacity style={{width: '40%'}} 
               onPress={()=> navigation.navigate('UserList',{type: 'Youth and IT'})}
               > 
           <Card>
             <CardItem
               cardBody
               style={{height: 100, flex: 1, justifyContent: 'center'}}>
               <Image
                 source={require('../assets/28.png')}
                 style={{height: 80, width: 80}}
               />
             </CardItem>
             <CardItem style={{justifyContent: 'center'}}>
               <Text style={styles.text}>All Users</Text>
             </CardItem>
           </Card>
           </TouchableOpacity>
         </View>
       </ScrollView>
        :
        <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: '3%',
          }}>
          <TouchableOpacity style={{width: '40%'}} 
              onPress={()=> navigation.navigate('OurServices',{type: 'Marriage Help'})}
              >
              <Card >
              <CardItem
                  cardBody
                  style={{height: 100, flex: 1, justifyContent: 'center'}}>
                  <Image
                  source={require('../assets/29.png')}
                  style={{height: 100, width: 100}}
                  />
              </CardItem>
              <CardItem style={{justifyContent: 'center'}}>
                  <Text style={styles.text}>Marriage Help</Text>
              </CardItem>
              </Card>
          </TouchableOpacity>

          <TouchableOpacity style={{width: '40%', marginLeft: '3%'}} 
              onPress={()=> navigation.navigate('OurServices',{type: 'Education'})}
              >
          <Card >
            <CardItem
              cardBody
              style={{height: 100, flex: 1, justifyContent: 'center'}}>
              <Image
                source={require('../assets/30.png')}
                style={{height: 80, width: 80}}
              />
            </CardItem>
            <CardItem style={{justifyContent: 'center'}}>
              <Text style={styles.text}>Education</Text>
            </CardItem>
          </Card>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: '3%',
          }}>
          <TouchableOpacity style={{width: '40%'}} 
              onPress={()=> navigation.navigate('OurServices',{type: 'Membership Community'})}
              > 
          <Card>
            <CardItem
              cardBody
              style={{height: 100, flex: 1, justifyContent: 'center'}}>
              <Image
                source={require('../assets/32.png')}
                style={{height: 80, width: 80}}
              />
            </CardItem>
            <CardItem style={{justifyContent: 'center'}}>
              <Text style={styles.text}>Membership Community</Text>
            </CardItem>
          </Card>
          </TouchableOpacity>
          <TouchableOpacity style={{width: '40%', marginLeft: '3%'}}
              onPress={()=> navigation.navigate('OurServices',{type: 'Medical'})}
              > 
          <Card >
            <CardItem
              cardBody
              style={{height: 100, flex: 1, justifyContent: 'center'}}>
              <Image
                source={require('../assets/31.webp')}
                style={{height: 80, width: 80}}
              />
            </CardItem>
            <CardItem style={{justifyContent: 'center'}}>
              <Text style={styles.text}>Medical </Text>
            </CardItem>
          </Card>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: '3%',
          }}>
              <TouchableOpacity style={{width: '40%'}} 
              onPress={()=> navigation.navigate('OurServices',{type: 'House Help'})}
              > 
          <Card>
            <CardItem
              cardBody
              style={{height: 100, flex: 1, justifyContent: 'center'}}>
              <Image
                source={require('../assets/14.png')}
                style={{height: 80, width: 80}}
              />
            </CardItem>
            <CardItem style={{justifyContent: 'center'}}>
              <Text style={styles.text}>House Help</Text>
            </CardItem>
          </Card>
          </TouchableOpacity>
          <TouchableOpacity style={{width: '40%', marginLeft: '3%'}}
              onPress={()=> navigation.navigate('OurServices',{type: 'Arbitration'})}
              > 
          <Card >
            <CardItem
              cardBody
              style={{height: 100, flex: 1, justifyContent: 'center'}}>
              <Image
                source={require('../assets/33.webp')}
                style={{height: 80, width: 80}}
              />
            </CardItem>
            <CardItem style={{justifyContent: 'center'}}>
              <Text style={styles.text}>Arbitration </Text>
            </CardItem>
          </Card>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: '3%',
          }}>
              <TouchableOpacity style={{width: '40%'}} 
              onPress={()=> navigation.navigate('OurServices',{type: 'GraveYard'})}
              > 
          <Card>
            <CardItem
              cardBody
              style={{height: 100, flex: 1, justifyContent: 'center'}}>
              <Image
                source={require('../assets/34.png')}
                style={{height: 100, width: 100}}
              />
            </CardItem>
            <CardItem style={{justifyContent: 'center'}}>
              <Text style={styles.text}>GraveYard</Text>
            </CardItem>
          </Card>
          </TouchableOpacity>
          <TouchableOpacity style={{width: '40%', marginLeft: '3%'}}
              onPress={()=> navigation.navigate('OurServices',{type: 'Employment'})}
              > 
          <Card >
            <CardItem
              cardBody
              style={{height: 100, flex: 1, justifyContent: 'center'}}>
              <Image
                source={require('../assets/35.png')}
                style={{height: 100, width: 100}}
              />
            </CardItem>
            <CardItem style={{justifyContent: 'center'}}>
              <Text style={styles.text}>Employment</Text>
            </CardItem>
          </Card>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: '3%',
          }}>
              <TouchableOpacity style={{width: '40%'}} 
              onPress={()=> navigation.navigate('OurServices',{type: 'Youth and IT'})}
              > 
          <Card>
            <CardItem
              cardBody
              style={{height: 100, flex: 1, justifyContent: 'center'}}>
              <Image
                source={require('../assets/19.png')}
                style={{height: 80, width: 80}}
              />
            </CardItem>
            <CardItem style={{justifyContent: 'center'}}>
              <Text style={styles.text}>Youth and IT</Text>
            </CardItem>
          </Card>
          </TouchableOpacity>
        </View>
      </ScrollView>
    
        }
       </Container>
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
      fontSize: 12,
      textAlign:'center',
    },
    container:{
        backgroundColor: '#f2f2f2',
        height: '100%',
        width: '100%',
      },
      inner:{
        height: '18%',
        position: 'absolute',
        zIndex: 9,
        width: '25%',
        top: '4%',
        marginLeft: '40%',
      }
  });