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
import {TouchableOpacity, FlatList, StyleSheet,Modal} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from "@react-native-community/async-storage";
import Server from "./Server";
import Loader from "./Loader";
import DateTimePicker from '@react-native-community/datetimepicker';
   



const ListAvatarExample = () => {
  const [date, setDate] = React.useState(new Date(1598051730000));
  let [show, setShow] = React.useState(false);
  let navigation = useNavigation();
  const [eventsData, setEventsData] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState([]);

  const [loader, setloader] = React.useState(true);
  const [modal, setModal] = React.useState(false);
  const [title, settitle] = React.useState('');
  const [des, setdes] = React.useState('');
  const [modalDel, setModalDel] = React.useState(false);
  const [modalDel2, setModalDel2] = React.useState(false);
  const [idDel, setIdDel] = React.useState('');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

    useEffect(()=>{
        AsyncStorage.getItem('Login_row').
        then(val => {
            if (val == null) {
              const login_row = {"access_token": "", "expires_in": 0, "token_type": "bearer"}
              reFresh(login_row);
            } else {
                const login_row = JSON.parse(val);
                // console.log(login_row.access_token);
                reFresh(login_row);
            }
        });
    },[]);

    const reFresh= (login_row) => {
      Server.get('api/announcement',{
        headers:{
            'Authorization': `Bearer ${login_row.access_token}`
        }
    }).
    then(res1 => {
        // console.log(res.data);
        setEventsData(res1.data);
        Server.get('/api/getuser',{
          headers:{
              'Authorization': `Bearer ${login_row.access_token}`
          }
        }).then(res => {
          setCurrentUser(res.data);
          setloader(false);
        });
    }).
    catch(err => {
      alert(err);
      setloader(false)
    });
    }

    const addService = () => {
      setloader(true);
      setModal(false);
      AsyncStorage.getItem('Login_row').
        then(val => {
            if (val == null) {
                navigation.navigate('LoginScreen');
            } else {
              const login_row = JSON.parse(val);
              Server.post('api/announcement',{
                title:title,
                description:des,
                expiry : date
              },
              {
                headers:{
                    'Authorization': `Bearer ${login_row.access_token}`
                }
              }).
              then(res => {
                settitle('');
                setdes('');
                reFresh(login_row);
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
              Server.put(`api/announcement/${idDel}`,{
                title:title,
                description:des,
                expiry : date
              },
              {
                headers:{
                    'Authorization': `Bearer ${login_row.access_token}`
                }
              }).
              then(res => {
                setIdDel('');
                settitle('');
                setdes('');
                reFresh(login_row);
              }).
              catch(err => {
                  alert(err);
                  setloader(false);
              });
          }
        })
    }

    const Delete = () => {
      setloader(true);
      setModalDel2(false);
      
      AsyncStorage.getItem('Login_row').
        then(val => {
            if (val == null) {
                navigation.navigate('LoginScreen');
            } else {
              const login_row = JSON.parse(val);
              Server.delete(`api/announcement/${idDel}`,
              {
                headers:{
                    'Authorization': `Bearer ${login_row.access_token}`
                }
              }).
              then(res => {
                setIdDel('');
                reFresh(login_row);
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
          <Text>Announcements</Text>
        </Body>
        {currentUser.isAdmin == '1' && <Right>
          <TouchableOpacity onPress={() => {
              setModal(true);
              settitle('');
              setdes('');
              setDate('');
            }}>
            <Icon active name="plus" type="AntDesign" />
          </TouchableOpacity>
        </Right>}
      </Header>
      <Loader loading={loader} />
        <FlatList
          style={{flex:1}}
            data={eventsData}
            renderItem={ ({item}) => 
                <View style={styles.container}>
                <View style={{width:'90%'}}>
                <Text style={styles.title}> {item.title}</Text>
                    <Text style={styles.desc}> {item.description}</Text>
                    <Text style={styles.date}> {item.expiry}</Text>
                </View>
                
                {currentUser.isAdmin == '1' &&  <View style={{width:'10%',alignItems:'flex-end',alignSelf:'center'}}>
                  <Icon onPress={()=>{setModalDel2(true);setIdDel(item.id)}} style={{marginBottom:15,color:'red'}} active name="delete" type="AntDesign" />
                  <Icon onPress={()=>{
                    setModalDel(true);
                    setIdDel(item.id);
                    settitle(item.title);
                    setdes(item.description);
                    setDate(item.expiry);
                    }} style={{color:'green'}} active name="edit" type="AntDesign" />
                </View> }
            </View>
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
                <View style={styles.modalContainer}>
                  <View style={{width:'100%',marginVertical:10}}>
                    <View style={{flexDirection:'row',alignSelf:'center'}}>
                      <Text style={{fontSize:14,fontWeight:'bold',color:'#187ce6',}}>Add Announcement</Text>
                    </View> 
                    <View style={{flexDirection: 'row', alignItems: 'center',margin:10}}>
                      <View style={{flex: 1, height: 1, backgroundColor: 'lightgray'}} />
                    </View>
                    <View style={styles.inputOuter}>
                      <Text style={{marginLeft: '1%', marginTop: '2%', fontSize: 14}}>
                        {' '}
                        Title{' '}
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
                          value={title}
                          onChangeText={(val) => settitle(val)}
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
                          value={des}
                          onChangeText={(val) => setdes(val)}
                          placeholder=""
                        />
                      </Item>
                    </View>
                    <View style={styles.inputOuter}>
                      <Text style={{marginLeft: '1%', marginTop: '2%', fontSize: 14}}>
                        {' '}
                        Expiry{' '}
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
                          {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                  />
                )}
                        <Input
                            placeholder=""
                            style={{height: 40}}
                            value={date.toString().slice(0, 15)}
                            onTouchStart={() => setShow(true)}
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
                      <Text style={{fontSize:14,fontWeight:'bold',color:'#187ce6',}}>Update Announcement</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center',marginBottom:10}}>
                      <View style={{flex: 1, height: 1, backgroundColor: 'lightgray'}} />
                    </View>
                    <View style={styles.inputOuter}>
                      <Text style={{marginLeft: '1%', marginTop: '2%', fontSize: 14}}>
                        {' '}
                        Title{' '}
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
                          value={title}
                          onChangeText={(val) => settitle(val)}
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
                          value={des}
                          onChangeText={(val) => setdes(val)}
                          placeholder=""
                        />
                      </Item>
                    </View>
                    <View style={styles.inputOuter}>
                      <Text style={{marginLeft: '1%', marginTop: '2%', fontSize: 14}}>
                        {' '}
                        Expiry{' '}
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
                          {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                  />
                )}
                        <Input
                            placeholder=""
                            style={{height: 40}}
                            value={date.toString().slice(0, 15)}
                            onTouchStart={() => setShow(true)}
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
            <Modal
              animationType={'fade'}
              transparent={true}
              visible={modalDel2}
              onRequestClose={() => setModalDel2(false)}
              on
              >
              <View style={styles.modalBody}>
                <View style={styles.modalContainerDel}>
                  <View style={{width:'100%'}}>
                  <View style={{flexDirection:'row',alignSelf:'center',marginVertical:10}}>
                      <Text style={{fontSize:14,fontWeight:'bold',color:'#187ce6',}}>Delete Announcement ?</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center',marginBottom:10}}>
                      <View style={{flex: 1, height: 1, backgroundColor: 'lightgray'}} />
                    </View>
                    <Button
                      danger={true}
                      style={[styles.btns]}
                      rounded
                      active={true}
                      onPressIn={() => Delete()}
                      >
                      <Text style={styles.btnTxt}>Delete</Text>
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
        flexDirection:'row'
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
      height:500,
      width:300,
      backgroundColor:'#fff',
      borderRadius:15,
      justifyContent:'space-between',
      alignItems:'center',
      alignSelf:'center'
    },
    modalContainerDel:{
      height:150,
      width:300,
      backgroundColor:'#fff',
      borderRadius:15,
      justifyContent:'space-between',
      alignItems:'center',
      alignSelf:'center'
    },
    btns: {
      width: '85%',
      marginLeft: 'auto',
      marginRight: 'auto',
      justifyContent: 'center',
      marginTop: '4%',
    }
});

export default ListAvatarExample; 
