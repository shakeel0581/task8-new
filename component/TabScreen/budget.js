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
import Server from "../Server";
import Loader from "../Loader";

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
      // init();
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
                Server.get('/api/budget',{
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
                    setEventsData(res1.data);
                    setCurrentUser(res.data);
                    setloader(false);
                    console.log(res1.data)
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
              
                Server.get('/api/budget',{
                  headers:{'Authorization': `Bearer ${login_row.access_token}`}
                }).then(resBdg => {
                  
                    const total = parseInt(budget, 10) + parseInt(resBdg.data[0].total_budget, 10);
                    Server.post('/api/budget',{total_budget:total},{
                      headers:{'Authorization': `Bearer ${login_row.access_token}`}
                    }).then(res => {
                      setBudget('');
                      init(); 
                    });
                });
              
          }
        })
    }

    const itemList = (item) => {
    
      return(
        <View style={styles.container}>
            <View style={{flexDirection:'row'}}>
                <Text style={{fontSize:16,fontWeight:'bold',width:150,marginBottom:10}}>Total Budget:</Text>
                <Text style={{fontSize:16,fontWeight:'bold',width:150,marginBottom:10}}> {item.total_budget}/.Rs</Text>
            </View>
            <View style={{flexDirection:'row',marginBottom:5}}>
                <Text style={{fontSize:14,fontWeight:'bold',width:150,color:'darkgray'}}>Education Budget:</Text>
                <Text style={styles.title}> {item.education_budget}/.Rs</Text>
            </View>
            <View style={{flexDirection:'row',marginBottom:5}}>
                <Text style={{fontSize:14,fontWeight:'bold',width:150,color:'darkgray'}}>House Budget:</Text>
                <Text style={styles.title}> {item.house_budget}/.Rs</Text>
            </View>
            <View style={{flexDirection:'row',marginBottom:5}}>
                <Text style={{fontSize:14,fontWeight:'bold',width:150,color:'darkgray'}}>Madical Budget:</Text>
                <Text style={styles.title}> {item.medical_budget}/.Rs</Text>
            </View>
            <View style={{flexDirection:'row',marginBottom:5}}>
                <Text style={{fontSize:14,fontWeight:'bold',width:150,color:'darkgray'}}>Marriage Budget:</Text>
                <Text style={styles.title}> {item.marriage_budget}/.Rs</Text>
            </View>
            <View style={{flexDirection:'row',marginBottom:5}}>
                <Text style={{fontSize:14,fontWeight:'bold',width:150,color:'darkgray'}}>Other Budget:</Text>
                <Text style={styles.title}> {item.other_budget}/.Rs</Text>
            </View>
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
          <Text>Add budget</Text>
        </Body>
        {currentUser.isAdmin == '1' && currentUser.level == 'super' &&
          <Right>
            <TouchableOpacity onPress={() => setModalDel(true)}>
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
                <>{
                  itemList(item)
                }
                </>
            }
            keyExtractor={(item) => item.id.toString()}
          />
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
                      <Text style={{fontSize:14,fontWeight:'bold',color:'#187ce6',}}>Add Budget</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center',marginBottom:10}}>
                      <View style={{flex: 1, height: 1, backgroundColor: 'lightgray'}} />
                    </View>
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
                        
                    <Button
                      danger={true}
                      style={[styles.btns]}
                      rounded
                      active={true}
                      onPressIn={() => updateService()}
                      >
                      <Text style={styles.btnTxt}>Add</Text>
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
        flexDirection:'column',
    },
    title: {
        fontSize:16,
        fontWeight:'bold',
        color:'gray',
        width:200,
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
