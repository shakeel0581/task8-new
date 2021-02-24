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
} from 'native-base';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
let ListAvatarExample = () => {
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
          <Text>About Us</Text>
        </Body>
      </Header>
      <Text style={{textAlign :'left', paddingVertical:10,paddingHorizontal:20,fontSize:16,color:'gray'}}>Bhavnagar is a city located in Gujrat, India and the Memon Muslims from Bhavnagar formed Bhavnagar MemonJamat.
The massive migration was being performed at the time of Indo-Pak separation in 1947.
The crucial time of migration is one of the reasons behind the foundation of Bhavnagar MemonJamat.
It was founded to facilitate fellow community members. Initially the Jamat had a small setup in Ranchoreline Area of Karachi.
But now as BMJ has so many social responsibilities that require the extension of premises for fulfillment of promising goals with more efforts,
the operational community center is nowlocated near Mazar-e-Quaid. The various initiatives in different sectors including health,
education, shelter and employment are the basic programs with a planned curriculum but the supporting programs are not limited to the mentioned 
sectors but there are numerous programs also. BMJ is still focusing on the improvement of quality in every sector.</Text>
    </Container>
  );
};

export default ListAvatarExample;
