import React, { Component } from 'react';
import { WebView,
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  Linking,
 } from 'react-native';

 import QRCodeScanner from 'react-native-qrcode-scanner';


export default class Scanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
          secondaryString:'Scan something'
        };
      }

      _showWebView = () =>{
        const { navigate, state } = this.props.navigation;
        navigate('MyWeb', {property: this.state.secondaryString});
    }
    

  render() {
    return (
      <QRCodeScanner 
      reactivate = {true}
      reactivateTimeout = {5000}
      showMarker = {true}
        onRead={(e) =>{
            this.state.secondaryString = e.data;
            this.setState({ secondaryString: e.data });
        }
        }
    //   onRead={(e) =>{
    //     console.log('QR code scanned!', e);
        
    // }}
        topContent={
          <Text style={styles.centerText}>
             <Text style={styles.textBold}>Scan QR code</Text>
          </Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable} onPress = {this._showWebView}>
            <Text style={styles.buttonText}>
            {this.state.secondaryString}
            </Text>
            
          </TouchableOpacity>
        }
      />
        
    );

  }
}


_executeQuery = (query) => {
  console.log(query);
};
const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
