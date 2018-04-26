import React from 'react';
import { View, StyleSheet, TextInput, Button } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default class Profile extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  onEdit = () => {
    fetch('http://ec2-18-218-230-49.us-east-2.compute.amazonaws.com:3000/api/getNearestShelter', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: {
              _id: props.user._id,
              email: this.state.email,
              password: this.state.password,
              phone:this.state.phone,
              
            },
        }),
    }).then((response) => response.json())
      .then((responseJson) => {
          resolve(responseJson);
      })
      .catch((error) => {
          reject(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
       <TextInput
          value={this.state.email}
          onChangeText={(email) => this.setState({ email })}
          placeholder={'Email Address'}
          underlineColorAndroid='transparent' 

          style={styles.TextInputStyleClass}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'Full Name'}
          secureTextEntry={true}
          underlineColorAndroid='transparent' 

          style={styles.TextInputStyleClass}
        />

        <TextInput
          value={this.state.phone}
          onChangeText={(phone) => this.setState({ phone })}
          placeholder={'Phone Number'}
          secureTextEntry={true}
          underlineColorAndroid='transparent' 

          style={styles.TextInputStyleClass}
        />

        <Button
          title={'Edit Details'}
          style={styles.input}
          onPress={this.onEdit.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e2edff'
  }
  // ,
  // linearGradient: {
  //   flex: 1,
  //   paddingLeft: 15,
  //   paddingRight: 15,
  //   borderRadius: 5
  //}
  ,
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 30,

  },TextInputStyleClass:{
    textAlign: 'center',
    height: 50,
    width: 230,
    //borderWidth: 2,
    //borderColor: '#FF5722',
    borderRadius: 10 ,
    backgroundColor : "#FFFFFF",
    marginBottom: 15,
    },
});