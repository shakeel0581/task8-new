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
import DateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from "@react-native-community/async-storage";
import Server from "../Server";
import Loader from "../Loader";

const Events = () => {
  const [date, setDate] = React.useState(new Date(1598051730000));
  let [show, setShow] = React.useState(false);
  let navigation = useNavigation();
  const [eventsData, setEventsData] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState([]);

  const [loader, setloader] = React.useState(true);

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
        })
    },[]);

    const reFresh= (login_row) => {
      Server.get('/api/getuser/all',{
        headers:{
            'Authorization': `Bearer ${login_row.access_token}`
        }
    }).
    then(res1 => {
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
        setloader(false);
    });
    }

    const statusUpdate = (id,status,isactive) => {
      setloader(true);
      AsyncStorage.getItem('Login_row').
        then(val => {
            if (val == null) {
                navigation.navigate('LoginScreen');
            } else {
              const login_row = JSON.parse(val);
              Server.put(`api/update_user/${id}`,{
                isactive : isactive,
                status : status
              },
              {
                headers:{
                    'Authorization': `Bearer ${login_row.access_token}`
                }
              }).
              then(res => {
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
          <Text>User List</Text>
        </Body>
        {/* {currentUser.isAdmin == '1' &&  <Right>
        <TouchableOpacity onPress={() => {
              setModal(true);
              settitle('');
              setdes('');
              setDate('');
            }}>
            <Icon active name="plus" type="AntDesign" />
          </TouchableOpacity>
        </Right> } */}
      </Header>
      <Loader loading={loader} />
        <FlatList
          style={{flex:1}}
            data={eventsData}
            renderItem={ ({item}) => 
                <View style={styles.container}>
                <View style={{width:'90%'}}>
                  <Text style={styles.title}> {item.fname} {item.lname}</Text>
                    <Text style={styles.desc}> {item.email}</Text>
                    <Text style={styles.date}> {item.phone}</Text>
                </View>
                {currentUser.isAdmin == '1' && (currentUser.level == 'super' || currentUser.level == 'level1' || currentUser.level == 'level2') &&
                  <>
                  {item.isactive != '1' ?                
                    <View style={{width:'10%',alignItems:'flex-end',alignSelf:'center'}}>
                        <Icon onPress={()=>{setloader(true);statusUpdate(item.id,'Approved',1);}} style={{marginBottom:15,color:'green'}} active name="check" type="AntDesign" />
                    </View> 
                    :
                    <View style={{width:'10%',alignItems:'flex-end',alignSelf:'center'}}>
                        <Icon onPress={()=>{setloader(true);statusUpdate(item.id,'Rejected',0);}} style={{marginBottom:15,color:'red'}} active name="close" type="AntDesign" />
                    </View>
                    }
              </>
              }
            </View>
            }
            keyExtractor={(item) => item.id.toString()}

          />
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
  btns: {
    width: '85%',
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    marginTop: '4%',
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
});

export default Events; 
