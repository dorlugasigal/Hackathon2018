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
    this.state = {sourceLan: 0,sourceLong:0,dest:0};
  }
    handleGetDirections = () => {
    const data = {
       source: {
        latitude: sourceLan,
        longitude: sourceLong
      },
      destination: {
        latitude: destLan,
        longitude: destLong
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

  getLocationFromApiAsync = (position) => {
    let location = {
      location: [position.coords.latitude, position.coords.longitude]
    }
    alert(JSON.stringify(location));
    console.warn(JSON.stringify(location));
  //   return fetch('http://ec2-18-218-230-49.us-east-2.compute.amazonaws.com:3000/api/getNearestShelter', {
  //     method: 'POST',
  //     mode: "no-cors",
  //     headers: {
  //       'Accept': 'application/json', 
  //       'Content-Type': 'application/json'
  //     },
  //     body:JSON.stringify(location)
  //   }).then((res) => {
  //     res.json().then(jsonData => {
  //       console.warn("this is res", jsonData)
  //     })
  // });
    axios.post('http://ec2-18-218-230-49.us-east-2.compute.amazonaws.com:3000/api/getNearestShelter', {
      location: [position.coords.latitude, position.coords.longitude]
    }).then(data => { 
      console.warn(data);
    })
  }


  componentDidMount(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        alert("state of lat in callback is "+position.coords.latitude+
        " and state of long in callback is "+position.coords.longitude);          
          alert(1);
          this.getLocationFromApiAsync(position).then((data) => {
            console.warn(data);
            this.setState({dest:data.data.geometry.coordinates})
            alert(this.state.dest);
      
      
            handleGetDirections();
          }).catch(error => console.error(error));
           
      },
    );
   
  }

  render() {
    return (
      <View style={styles.container}>
           <Text style={{color: 'red'}}>
          </Text>
      </View>
    );
  }
  

  // _maybeRenderDevelopmentModeWarning() {
  //   if (__DEV__) {
  //     const learnMoreButton = (
  //       <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
  //         Learn more
  //       </Text>
  //     );

  //     return (
  //       <Text style={styles.developmentModeText}>
  //         Development mode is enabled, your app will be slower but you can use useful development
  //         tools. {learnMoreButton}
  //       </Text>
  //     );
  //   } else {
  //     return (
  //       <Text style={styles.developmentModeText}>
  //         You are not in development mode, your app will run at full speed.
  //       </Text>
  //     );
  //   }
  // }

  // _handleLearnMorePress = () => {
  //   WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  // };

  // _handleHelpPress = () => {
  //   WebBrowser.openBrowserAsync(
  //     'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
  //   );
  // };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
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
