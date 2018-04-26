import React, { Component } from 'react';
import { Image,Alert, Button, TextInput, View, StyleSheet } from 'react-native';
//import { Button } from 'react-native-material-design';

export default class SignInScreen extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      email: '',
      password: '',
    };
  }
  
  onLogin = () => {
   alert("Login");
  }
  onSignUp = () =>{
    alert("SignUp");
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../assets/images/Logo.png')}style={{width:300, height: 250}} />   

        <TextInput
          value={this.state.username}
          onChangeText={(username) => this.setState({ email })}
          placeholder={'Email Address'}
          underlineColorAndroid='transparent' 

          style={styles.TextInputStyleClass}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'Password'}
          secureTextEntry={true}
          underlineColorAndroid='transparent' 

          style={styles.TextInputStyleClass}
        />
        
        <Button
          title={'Login'}
          style={styles.input}
          onPress={this.onLogin.bind(this)}
        />
        
        <Button
          title={'Sign Up'}
          style={styles.input}
          onPress={this.onSignUp.bind(this)}
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