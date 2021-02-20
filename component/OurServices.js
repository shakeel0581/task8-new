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
  Button,
  Picker
} from 'native-base';
import {TouchableOpacity, FlatList, StyleSheet, Modal} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// import { Picker as SelectPicker } from '@react-native-picker/picker';
import AsyncStorage from "@react-native-community/async-storage";
import Server from "./Server";
import Loader from "./Loader";

const OurServices = ({route}) => {

  let navigation = useNavigation();
  const type = route.params ? route.params.type : null;

  const [eventsData, setEventsData] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState([]);
  const [loader, setloader] = React.useState(true);
  const [modal, setModal] = React.useState(false);
  const [service, setService] = React.useState('');
  const [modalDel, setModalDel] = React.useState(false);
  const [idDel, setIdDel] = React.useState('');

  const [Name, setName] = React.useState('');
  const [CNIC, setCNIC] = React.useState('');
  const [Email, setEmail] = React.useState('');
  const [Des, setDes] = React.useState('');
  const [form_object, setForm_object] = React.useState('');
  const [selecteVal, setSelecteVal] = React.useState('Pending');
  const [budget, setBudget] = React.useState('');

    useEffect(()=>{
      init();
      navigation.addListener('focus',() => {
        init();
      });
    },[]);

const init =() => {
  setloader(true);
  AsyncStorage.getItem('Login_row').
        then(val => {
            if (val == null) {
                navigation.navigate('LoginScreen');
            } else {
                const login_row = JSON.parse(val);
                Server.get('api/service',{
                    headers:{
                        'Authorization': `Bearer ${login_row.access_token}`
                    }
                }).
                then(res1 => {
                  Server.get('/api/getuser',{
                    headers:{
                        'Authorization': `Bearer ${login_row.access_token}`
                    }
                  }).then(res => {
                    // console.log('token',login_row)
                    setEventsData(res1.data.services);
                    setCurrentUser(res.data);
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
              Server.put(`api/service/status/${idDel}`,{
                status : selecteVal,
                note : `Approved By ${currentUser.fname}`
              },
              {
                headers:{
                    'Authorization': `Bearer ${login_row.access_token}`
                }
              }).
              then(res => {
                Server.get('/api/budget',{
                  headers:{'Authorization': `Bearer ${login_row.access_token}`}
                }).then(resBdg => {
                  // const getBudgt = resBdg.data[0].budget_name;
                  
                  let budget_name = '';
                  let budget_AddUp;
                  if (service == 'Education') {
                    budget_name = 'education_budget';
                    budget_AddUp = resBdg.data[0].education_budget;
                  } else if (service == 'House Help') {
                    budget_name = 'house_budget';
                    budget_AddUp = resBdg.data[0].house_budget;
                  }else if (service == 'Medical') {
                    budget_name = 'medical_budget';
                    budget_AddUp = resBdg.data[0].medical_budget;
                  }else if (service == 'Marriage Help') {
                    budget_name = 'marriage_budget';
                    budget_AddUp = resBdg.data[0].marriage_budget;
                  }else{
                    budget_name = 'other_budget'
                    budget_AddUp = resBdg.data[0].other_budget;
                  }
                    const total = parseInt(budget_AddUp, 10) + parseInt(budget, 10);
                    console.log('access token',total,budget_name)

                    Server.post('/api/budget',{[`${budget_name}`]:total},{
                      headers:{'Authorization': `Bearer ${login_row.access_token}`}
                    }).then(res => {
                      console.log(res.data)
                      setService('');
                      setForm_object('');
                      setSelecteVal('Pending');
                      setBudget('');
                      init(); 
                    });
                });
              }).
              catch(err => {
                  alert(err);
                  setloader(false);
              });
          }
        })
    }

    

    const itemList = (item) => {
      const obj_row = item.form_object.toString().replace(/\s/g, '');
      const obj_row2 = obj_row.toString().replace(/\\n/g, '');
      const obj = obj_row2.split(',');
      console.log()
      return(
        <View style={styles.container}>
          <View style={{width:'90%'}}>
            <Text style={styles.title}> {item.services}</Text>
            <Text style={styles.desc}> {obj[0]}</Text>
            <Text style={styles.desc}> {obj[1]}</Text>
            <Text style={styles.desc}> {obj[2]}</Text>
            <Text style={styles.desc}> {obj[3]}</Text>
            <Text style={styles.desc}> status {item.status}</Text>
            <Text style={styles.date}> {item.note}</Text>
          </View>
          {currentUser.isAdmin == '1' &&
            <View style={{width:'10%',alignSelf:'center'}}>
              {item.status == 'Approved' ?
              <Icon style={{color:'green'}} active name="checksquare" type="AntDesign" />
                :
                <Icon onPress={()=>{
                  setModalDel(true);
                  setIdDel(item.id);
                  setService(item.services);
                  setForm_object(item.form_object);
                  }} 
                  style={{color:'#ffc107'}} 
                  active name="edit" type="AntDesign" />
              }
            </View>
          }
        </View>
      )
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
          <Text>{type ? type : 'Services List'}</Text>
        </Body>
        {type != null &&
          <Right>
            <TouchableOpacity onPress={() => setModal(true)}>
              <Icon active name="plus" type="AntDesign" />
            </TouchableOpacity>
          </Right>
        }
      </Header>
      <Loader loading={loader} />
        <FlatList
          style={{flex:1}}
            data={eventsData}
            renderItem={ ({item}) => 
                <>
                {type != null ?(
                    item.services == type &&
                    itemList(item)
                  ):
                  itemList(item)
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
                      <Text style={{fontSize:14,fontWeight:'bold',color:'#187ce6',}}>Approve/Reject {service}</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center',marginBottom:10}}>
                      <View style={{flex: 1, height: 1, backgroundColor: 'lightgray'}} />
                    </View>
                    <View style={styles.inputOuter}>
                      <Text style={{marginLeft: '1%', marginTop: '2%', fontSize: 14}}>
                        {' '}
                        Selecte Status{' '}
                      </Text>
                      <Item
                        style={{
                          width: '95%',
                          marginLeft: '2%',
                          borderColor: 'black',
                          borderWidth: 1,
                          marginBottom:10,
                        }}
                        rounded>
                          <Picker
                            note
                            mode="dropdown"
                            style={{ height:40}}
                            selectedValue={selecteVal}
                            onValueChange={(val) => setSelecteVal(val)}
                          >
                            <Picker.Item label="Pending" value="Pending" />
                          <Picker.Item label="Reject" value="Rejected" />
                          <Picker.Item label="Approve" value="Approved" />
                        </Picker>
                      </Item>
                    </View>
                        {selecteVal == 'Approved' &&
                        <View style={styles.inputOuter}>
                          <Text style={{marginLeft: '1%', marginTop: '2%', fontSize: 14}}>
                            {' '}
                            Budget{' '}
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
                              keyboardType="decimal-pad"
                              style={{height:40}}
                              value={budget}
                              onChangeText={(val) => setBudget(val)}
                              placeholder=""
                            />
                          </Item>
                        </View>
                      }
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
      height:300,
      width:300,
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
