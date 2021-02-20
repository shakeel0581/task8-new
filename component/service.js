import React, {Component} from 'react';
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
  View
} from 'native-base';
import {TouchableOpacity,StyleSheet,ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
let service = () => {
  let navigation = useNavigation();
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
          <Text>Our Services</Text>
        </Body>
      </Header>
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Membership Community</Text>
                <Icon style={{color:'green'}} active name="checksquare" type="AntDesign" />
            </View>
            <View style={styles.container}>
                <Text style={styles.title}>Education</Text>
                <Icon style={{color:'green'}} active name="checksquare" type="AntDesign" />
            </View>
            <View style={styles.container}>
                <Text style={styles.title}>House Help</Text>
                <Icon style={{color:'green'}} active name="checksquare" type="AntDesign" />
            </View>
            <View style={styles.container}>
                <Text style={styles.title}>Medical</Text>
                <Icon style={{color:'green'}} active name="checksquare" type="AntDesign" />
            </View>
            <View style={styles.container}>
                <Text style={styles.title}>Marriage Help</Text>
                <Icon style={{color:'green'}} active name="checksquare" type="AntDesign" />
            </View>
            <View style={styles.container}>
                <Text style={styles.title}>Arbitration </Text>
                <Icon style={{color:'green'}} active name="checksquare" type="AntDesign" />
            </View>
            <View style={styles.container}>
                <Text style={styles.title}>GraveYard</Text>
                <Icon style={{color:'green'}} active name="checksquare" type="AntDesign" />
            </View>
            <View style={styles.container}>
                <Text style={styles.title}>Employment</Text>
                <Icon style={{color:'green'}} active name="checksquare" type="AntDesign" />
            </View>
            <View style={styles.container}>
                <Text style={styles.title}>Youth and IT</Text>
                <Icon style={{color:'green'}} active name="checksquare" type="AntDesign" />
            </View>
        </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
    container: {
        borderWidth:1,
        borderColor:'#000',
        paddingHorizontal:10,
        paddingVertical:15,
        flexDirection:'row',
        margin:5,
        borderRadius:5,
        borderStyle:'dashed',
        alignSelf:'center',
        alignItems:'center'
    },
    title: {
        fontSize:16,
        fontWeight:'bold',
        color:'gray',
        width:'90%'
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

export default service;
