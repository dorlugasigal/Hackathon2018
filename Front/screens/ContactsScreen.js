import React from 'react';
import { View, StyleSheet, TextInput, Button, Text, PermissionsAndroid, ListView } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import Expo, { Constants } from 'expo';

export default class Profile extends React.Component {

  constructor(props){
    super(props);
    
    this.state = {
        contacts: [],
        loading: true
    }
  }

   async componentWillMount() {
    const time = Date.now();
    const permission = await Expo.Permissions.askAsync(Expo.Permissions.CONTACTS);
    if (permission.status !== 'granted') { return; }

    const contacts = await Expo.Contacts.getContactsAsync({
      fields: [
        Expo.Contacts.PHONE_NUMBERS,
        Expo.Contacts.EMAILS,
      ],
      pageSize: 10000,
      pageOffset: 0,
    }); 
    this.setState({contacts: contacts, loading: false})
  }

   render() {
       if(!this.state.loading){
            return (
                <View>
                    <Text>{this.state.contacts.data[0].name} , {this.state.contacts.data[0].phoneNumbers[0].number}</Text> 
                </View>
            );
        }
       else{
        return (
            <Text>
                Contacts are coming..
            </Text>
        );
       }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});