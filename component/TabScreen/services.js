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

export default App = () => {
    let navigation = useNavigation();
    let [show, setShow] = useState(false);
  
    return (
      <Container
        style={styles.container}>
        {show && (
          <Animatable.View
            style={styles.inner}
            animation="lightSpeedIn">
            <Item
              rounded
              style={{
                width: '100%',
                backgroundColor: 'lightgray',
                color: 'white',
              }}>
              <Input placeholder="Search..." />
            </Item>
          </Animatable.View>
        )}
        <View
          style={{
            height: '15%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../assets/2.jpg')}
              style={{height: '35%', width: '20%', borderRadius: 50}}
            />
            <Text style={{marginLeft: '4%', fontSize: 20, fontWeight: 'bold'}}>
              Services
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
            <TouchableOpacity onPress={() => setShow(!show)}>
              <Icon active name="search" type="FontAwesome" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
              <Icon active name="bell" type="Entypo" />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Item
            full
            style={{width: '85%', backgroundColor: 'lightgray', color: 'white'}}>
            <Input placeholder="Icon Alignment in Textbox" />
          </Item>
          <Icon
            name="menu"
            type="Entypo"
            style={{marginRight: '2%', fontSize: 40}}
            onPress={() => navigation.openDrawer()}
          />
        </View>
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
                    source={require('../assets/3.png')}
                    style={{height: 50, width: 30}}
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
                  source={require('../assets/4.png')}
                  style={{height: 40, width: 40}}
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
                onPress={()=> navigation.navigate('OurServices',{type: 'House Help'})}
                > 
            <Card>
              <CardItem
                cardBody
                style={{height: 100, flex: 1, justifyContent: 'center'}}>
                <Image
                  source={require('../assets/7.png')}
                  style={{height: 40, width: 40}}
                />
              </CardItem>
              <CardItem style={{justifyContent: 'center'}}>
                <Text style={styles.text}>House Help</Text>
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
                  source={require('../assets/5.png')}
                  style={{height: 40, width: 40}}
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
                  source={require('../assets/7.png')}
                  style={{height: 40, width: 40}}
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
                  source={require('../assets/5.png')}
                  style={{height: 40, width: 40}}
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
                  source={require('../assets/8.png')}
                  style={{height: 40, width: 40}}
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
                  source={require('../assets/6.png')}
                  style={{height: 40, width: 40}}
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
                  source={require('../assets/8.png')}
                  style={{height: 40, width: 40}}
                />
              </CardItem>
              <CardItem style={{justifyContent: 'center'}}>
                <Text style={styles.text}>Youth and IT</Text>
              </CardItem>
            </Card>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
      fontSize: 14,
      textAlign:'center'
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