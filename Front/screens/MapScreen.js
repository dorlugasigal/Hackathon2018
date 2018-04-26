import React from 'react';
import {
  Image,
  Platform,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import getDirections from 'react-native-google-maps-directions'
import axios from 'axios';

export default class MapScreen extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {sourceLan: 0,sourceLong:0,destLan:0,destLong:0};
  }
  static navigationOptions = {
    title: 'Map',
  };

    handleGetDirections = (srcLat, srcLng, destLat, destLng) => {
    const data = {
       source: {
        latitude: srcLat,
        longitude: srcLng
      },
      destination: {
        latitude: destLat,
        longitude:destLng
      },
      params: [
        {
          key: "travelmode",
          value: "walking"        // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: "dir_action",
          value: "navigate"       // this instantly initializes navigation using the given travel mode 
        }
      ]
    }
 
    getDirections(data)
  }

  getLocationFromApi = (position) => {
    return new Promise( (resolve, reject) => {
      fetch('http://ec2-18-218-230-49.us-east-2.compute.amazonaws.com:3000/api/getNearestShelter', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            location: position,
        }),
    }).then((response) => response.json())
      .then((responseJson) => {
          resolve(responseJson);
      })
      .catch((error) => {
          reject(error);
      });
  })
};


  componentDidMount(){
    navigator.geolocation.getCurrentPosition((position) =>{
      this.getLocationFromApi([position.coords.longitude, position.coords.latitude]).then(nearest => {
        this.handleGetDirections(position.coords.latitude, position.coords.longitude,
           nearest.geometry.coordinates[1],nearest.geometry.coordinates[0]);
      }).catch(err => {
        console.error(err);
      })
    }, (err) => {
      console.error(err);
    });
  }

  render() {
    return (
      <View style={styles.container}>
           <Text style={styles.getStartedText}>
           Loading...
          </Text>
      </View>
    );
  }
  

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e2edff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 40,
    color: 'rgba(96,100,109, 1)',
    //lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
