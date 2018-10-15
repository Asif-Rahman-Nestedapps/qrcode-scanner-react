import React, { Component } from 'react';
import { WebView,
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
 } from 'react-native';



export default class MyWeb extends Component {
  render() {
    const { params } = this.props.navigation.state;
    var property = params;
    console.log(property);
    return (
      <WebView
        source={{uri: property.property}}
        style={{marginTop: 0}}
      />
    );
  }
}
