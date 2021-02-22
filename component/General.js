import React from 'react';
import {StatusBar,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity} from 'react-native';
import {Container, Button, Text, Header, Body, Icon, Item, Input, Card, CardItem} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

const App = () => {
  let navigation = useNavigation();

  return (
    <Container
      style={{
        backgroundColor: '#ffffff',
        height: '100%',
        width: '100%',
      }}>

        
      <Header>
      < Body>
          <Text style={{color:'#fff'}}>General Person</Text>
        </Body>
        {/* <Text style={{backgroundColor: '#3f51b5', width: '100%'}}>gUEST USER</Text> */}
      </Header>
      <Body>
        <ScrollView style={{width: '100%',paddingHorizontal:20}}>
         <View
           style={{
             flexDirection: 'row',
             justifyContent: 'center',
             marginTop: '3%',
             marginHorizontal:20
           }}>
           <TouchableOpacity style={{width: '50%'}} 
               onPress={()=> navigation.navigate('Service')}
               >
               <Card >
               <CardItem
                   cardBody
                   style={{height: 100, flex: 1, justifyContent: 'center'}}>
                   <Image
                   source={require('./assets/25.png')}
                   style={{height: 100, width: 100}}
                   />
               </CardItem>
               <CardItem style={{justifyContent: 'center'}}>
                   <Text style={styles.text}>Services</Text>
               </CardItem>
               </Card>
           </TouchableOpacity>

           <TouchableOpacity style={{width: '50%', marginLeft: '3%'}} 
               onPress={()=> navigation.navigate('Announcements',{type: 'Education'})}
               >
           <Card >
             <CardItem
               cardBody
               style={{height: 100, flex: 1, justifyContent: 'center'}}>
               <Image
                 source={require('./assets/26.png')}
                 style={{height: 100, width: 100}}
               />
             </CardItem>
             <CardItem style={{justifyContent: 'center'}}>
               <Text style={styles.text}>Announcement</Text>
             </CardItem>
           </Card>
           </TouchableOpacity>
         </View>

         <View
           style={{
             flexDirection: 'row',
             justifyContent: 'center',
             marginTop: '3%',
             marginHorizontal:20
           }}>
           <TouchableOpacity style={{width: '50%'}} 
               onPress={()=> navigation.navigate('Events',{type: 'House Help'})}
               > 
           <Card>
             <CardItem
               cardBody
               style={{height: 100, flex: 1, justifyContent: 'center'}}>
               <Image
                 source={require('./assets/27.png')}
                 style={{height: 90, width: 90}}
               />
             </CardItem>
             <CardItem style={{justifyContent: 'center'}}>
               <Text style={styles.text}>Event</Text>
             </CardItem>
           </Card>
           </TouchableOpacity>
           <TouchableOpacity style={{width: '50%', marginLeft: '3%'}}
               onPress={()=> navigation.navigate('DonateUs')}
               > 
           <Card >
             <CardItem
               cardBody
               style={{height: 100, flex: 1, justifyContent: 'center'}}>
               <Image
                 source={require('./assets/36.png')}
                 style={{height: 70, width: 70}}
               />
             </CardItem>
             <CardItem style={{justifyContent: 'center'}}>
               <Text style={styles.text}>Donate Us</Text>
             </CardItem>
           </Card>
           </TouchableOpacity>
         </View>

         
         <View
           style={{
             flexDirection: 'row',
             justifyContent: 'center',
             marginTop: '3%',
             marginHorizontal:20
           }}>
               <TouchableOpacity style={{width: '50%'}} 
               onPress={()=> navigation.navigate('AboutUs')}
               > 
           <Card>
             <CardItem
               cardBody
               style={{height: 100, flex: 1, justifyContent: 'center'}}>
               <Image
                 source={require('./assets/37.png')}
                 style={{height: 80, width: 80}}
               />
             </CardItem>
             <CardItem style={{justifyContent: 'center'}}>
               <Text style={styles.text}>About Us</Text>
             </CardItem>
           </Card>
           </TouchableOpacity>
         </View>
       </ScrollView>
        
      </Body>
    </Container>
  );
};

const styles = StyleSheet.create({
  btns: {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    marginTop: '10%',
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
  btnTxt: {
    width: '100%',
    textAlign: 'center',
  },
  text: {
    textTransform: 'uppercase',
    fontSize: 12,
    textAlign:'center',
  },
});

export default App;
