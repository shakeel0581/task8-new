import React, {useEffect} from 'react';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Icon,
  View,
  Item,
  Input,
  Button
} from 'native-base';
import {TouchableOpacity, FlatList, StyleSheet, Modal} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from "@react-native-community/async-storage";
import Server from "./Server";
import Loader from "./Loader";

const OurServices = ({route}) => {

  let navigation = useNavigation();
  const { type } = route.params;
  const [eventsData, setEventsData] = React.useState([]);
  const [loader, setloader] = React.useState(true);
  const [modal, setModal] = React.useState(false);
  const [service, setService] = React.useState('');
  const [modalDel, setModalDel] = React.useState(false);
  const [idDel, setIdDel] = React.useState('');

  const [Name, setName] = React.useState('');
  const [CNIC, setCNIC] = React.useState('');
  const [Email, setEmail] = React.useState('');
  const [Des, setDes] = React.useState('');


    useEffect(()=>{
        AsyncStorage.getItem('Login_row').
        then(val => {
            if (val == null) {
                navigation.navigate('LoginScreen');
            } else {
                const login_row = JSON.parse(val);
                // console.log(login_row.access_token);
                Server.get('api/service',{
                    headers:{
                        'Authorization': `Bearer ${login_row.access_token}`
                    }
                }).
                then(res => {
                    console.log(login_row.access_token);
                    setEventsData(res.data.services);
                    setloader(false);
                }).
                catch(err => {
                    alert(err);
                    setloader(false);
                });
            }
        })
    },[]);

    const addService = () => {
      setloader(true);
      setModal(false);
      setService('');
      AsyncStorage.getItem('Login_row').
        then(val => {
            if (val == null) {
                navigation.navigate('LoginScreen');
            } else {
              const login_row = JSON.parse(val);
              Server.post('api/service',{
                services:type,
                form_object:`
                {name: ${Name}},
                {email: ${Email}},
                {cnic: ${CNIC}},
                {Description: ${Des}},
                `,
                attachments : null
              },
              {
                headers:{
                    'Authorization': `Bearer ${login_row.access_token}`
                }
              }).
              then(res => {
                setCNIC('');
                setDes('');
                setEmail('');
                setName('');
                Server.get('api/service',{
                  headers:{
                      'Authorization': `Bearer ${login_row.access_token}`
                  }
                }).
                then(res => {
                    console.log(login_row.access_token);
                    setEventsData(res.data.services);
                    setloader(false);
                }).
                catch(err => {
                    alert(err);
                    setloader(false);
                });
              }).
              catch(err => {
                  alert(err);
                  setloader(false);
              });
          }
        })
    }

    const updateService = () => {
      setloader(true);
      setModalDel(false);
      
      AsyncStorage.getItem('Login_row').
        then(val => {
            if (val == null) {
                navigation.navigate('LoginScreen');
            } else {
              const login_row = JSON.parse(val);
              Server.put(`api/service/${idDel}`,{
                services:service,
                form_object:"{name: 'Amjad'}",
                attachments : null
              },
              {
                headers:{
                    'Authorization': `Bearer ${login_row.access_token}`
                }
              }).
              then(res => {
                setService('');
                Server.get('api/service',{
                  headers:{
                      'Authorization': `Bearer ${login_row.access_token}`
                  }
                }).
                then(res => {
                    console.log(login_row.access_token);
                    setEventsData(res.data.services);
                    setloader(false);
                }).
                catch(err => {
                    alert(err);
                    setloader(false);
                });
              }).
              catch(err => {
                  alert(err);
                  setloader(false);
              });
          }
        })
    }

  return (
    <Container>
      <Header
        style={{
          textAlign: 'center',
          alignItems: 'center',
          backgroundColor: '#f2f2f2',
        }}>
        <Left>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon active name="arrowleft" type="AntDesign" />
          </TouchableOpacity>
        </Left>
        <Body>
          <Text>{type}</Text>
        </Body>
        <Right>
          <TouchableOpacity onPress={() => setModal(true)}>
            <Icon active name="plus" type="AntDesign" />
          </TouchableOpacity>
        </Right>
      </Header>
      <Loader loading={loader} />
        <FlatList
          style={{flex:1}}
            data={eventsData}
            renderItem={ ({item}) => 
                <>
                
                { item.services == type &&
                
                  <View style={styles.container}>
                    <View style={{width:'100%'}}>
                      <Text style={styles.title}> {item.services}</Text>
                      {/* { item.form_object.substring(1, item.form_object.length-1)
                        item.form_object.split(',\n').map(val => {
                          return<Text key={val} style={styles.desc}> status {val}</Text>
                        })
                      } */}
                      <Text style={styles.desc}> {JSON.parse(item.form_object)}</Text>
                      <Text style={styles.desc}> status {item.status}</Text>
                      <Text style={styles.date}> {item.note}</Text>
                    </View>
                    
                    {/* <View style={{width:'10%',alignItems:'flex-end',alignSelf:'center'}}>
                      <Icon onPress={()=>{setModalDel(true);setIdDel(item.id)}} style={{marginBottom:15,color:'red'}} active name="delete" type="AntDesign" />
                      <Icon onPress={()=>{setModalDel(true);setIdDel(item.id);setService(item.services)}} style={{color:'green'}} active name="edit" type="AntDesign" />
                    </View> */}
                </View>
                }
                </>
            }
            keyExtractor={(item) => item.id.toString()}
          />
          <Modal
              animationType={'fade'}
              transparent={true}
              visible={modal}
              onRequestClose={() => setModal(false)}
              on
              >
              <View style={styles.modalBody}>
                <View style={styles.modalContaineradd}>
                  <View style={{width:'100%',marginVertical:10}}>
                    <View style={{flexDirection:'row',alignSelf:'center'}}>
                      <Text style={{fontSize:14,fontWeight:'bold',color:'#187ce6',}}>Add Services</Text>
                    </View> 
                    <View style={{flexDirection: 'row', alignItems: 'center',margin:10}}>
                      <View style={{flex: 1, height: 1, backgroundColor: 'lightgray'}} />
                    </View>
                    <View style={styles.inputOuter}>
                      <Text style={{marginLeft: '1%', marginTop: '2%', fontSize: 14}}>
                        {' '}
                        Name{' '}
                      </Text>
                      <Item
                        style={{
                          width: '95%',
                          marginLeft: '2%',
                          borderColor: 'black',
                          borderWidth: 1,
                          marginBottom:10
                        }}
                        rounded>
                        <Input 
                        style={{height:40}}
                          value={Name}
                          onChangeText={(val) => setName(val)}
                          placeholder=""
                        />
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
                          marginBottom:10
                        }}
                        rounded>
                        <Input 
                        style={{height:40}}
                          value={Email}
                          onChangeText={(val) => setEmail(val)}
                          placeholder=""
                        />
                      </Item>
                    </View>
                    <View style={styles.inputOuter}>
                      <Text style={{marginLeft: '1%', marginTop: '2%', fontSize: 14}}>
                        {' '}
                        CNIC{' '}
                      </Text>
                      <Item
                        style={{
                          width: '95%',
                          marginLeft: '2%',
                          borderColor: 'black',
                          borderWidth: 1,
                          marginBottom:10
                        }}
                        rounded>
                        <Input 
                        style={{height:40}}
                          value={CNIC}
                          onChangeText={(val) => setCNIC(val)}
                          placeholder=""
                        />
                      </Item>
                    </View>
                    <View style={styles.inputOuter}>
                      <Text style={{marginLeft: '1%', marginTop: '2%', fontSize: 14}}>
                        {' '}
                        Description{' '}
                      </Text>
                      <Item
                        style={{
                          width: '95%',
                          marginLeft: '2%',
                          borderColor: 'black',
                          borderWidth: 1,
                          marginBottom:10
                        }}
                        rounded>
                        <Input 
                        multiline={true}
                        style={{height:100,textAlignVertical: 'top'}}
                          value={Des}
                          onChangeText={(val) => setDes(val)}
                          placeholder=""
                        />
                      </Item>
                    </View>
                    <Button
                      danger={true}
                      style={styles.btns}
                      rounded
                      active={true}
                      onPressIn={() => addService()}
                      >
                      <Text style={styles.btnTxt}>Add</Text>
                    </Button>
                  </View> 
                  
                </View>
              </View>
            </Modal>
            <Modal
              animationType={'fade'}
              transparent={true}
              visible={modalDel}
              onRequestClose={() => setModalDel(false)}
              on
              >
              <View style={styles.modalBody}>
                <View style={styles.modalContainer}>
                  <View style={{width:'100%'}}>
                  <View style={{flexDirection:'row',alignSelf:'center',marginVertical:10}}>
                      <Text style={{fontSize:14,fontWeight:'bold',color:'#187ce6',}}>Update Services</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center',marginBottom:10}}>
                      <View style={{flex: 1, height: 1, backgroundColor: 'lightgray'}} />
                    </View>
                  <View style={styles.inputOuter}>
                      <Text style={{marginLeft: '1%', marginTop: '2%', fontSize: 14}}>
                        {' '}
                        Service{' '}
                      </Text>
                      <Item
                        style={{
                          width: '95%',
                          marginLeft: '2%',
                          borderColor: 'black',
                          borderWidth: 1,
                          marginBottom:10
                        }}
                        rounded>
                        <Input 
                        style={{height:40}}
                          value={service}
                          onChangeText={(val) => setService(val)}
                          placeholder=""
                        />
                      </Item>
                    </View>
                    <Button
                      danger={true}
                      style={[styles.btns]}
                      rounded
                      active={true}
                      onPressIn={() => updateService()}
                      >
                      <Text style={styles.btnTxt}>Update</Text>
                    </Button>
                  </View> 
                  
                </View>
              </View>
            </Modal>
    
    </Container>    
  );
};

const styles = StyleSheet.create({
    container: {
        borderBottomWidth:1,
        borderBottomColor:'#ddd',
        paddingHorizontal:10,
        paddingVertical:10,
        flexDirection:'row',
    },
    title: {
        fontSize:16,
        fontWeight:'bold',
        color:'gray'
    },
    desc: {
        fontSize:14,
        // fontWeight:'bold',
        color:'gray'
    },
    date: {
        fontSize:12,
        // fontWeight:'bold',
        color:'gray'
    },
    btns: {
      width: '85%',
      marginLeft: 'auto',
      marginRight: 'auto',
      justifyContent: 'center',
      marginTop: '4%',
    },
    modalBody:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'rgba(0,0,0,0.5)',
      borderRadius:5,
      padding:10,
      alignItems:'center'
    },
    modalContainer:{
      height:200,
      width:250,
      backgroundColor:'#fff',
      borderRadius:15,
      justifyContent:'space-between',
      alignItems:'center',
      alignSelf:'center'
    },
    modalContaineradd:{
      height:500,
      width:320,
      backgroundColor:'#fff',
      borderRadius:15,
      justifyContent:'space-between',
      alignItems:'center',
      alignSelf:'center'
    }
});

export default OurServices; 
