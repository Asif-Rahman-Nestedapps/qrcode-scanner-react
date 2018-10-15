'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ActivityIndicator,
  Image,
} from 'react-native';
import SearchResults from './SearchResults';


function urlForQueryAndPage(searchString,searchStringTwo,pageNumber) {

  const data = {
      // country: 'uk',
      // pretty: '1',
      // encoding: 'json',
      // listing_type: 'buy',
      // action: 'search_listings',
      i:searchString,
      q:searchStringTwo,
      p:pageNumber,
  };
  // data[key] = value;
  const querystring = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');

  return 'http://www.recipepuppy.com/api/?' + querystring;
}

export default class SearchPage extends Component<{}> {

  static navigationOptions = {
  title: 'Property Finder',
};
  _onSearchTextChanged = (event) => {
  console.log('_onSearchTextChanged');

  this.setState({ primaryString: event.nativeEvent.text });

};

_onSearchTextChangedTwo = (event) => {
console.log('_onSearchTextChanged');

this.setState({ secondaryString: event.nativeEvent.text });

};


  constructor(props) {
  super(props);
  this.state = {
    secondaryString:'omelet',
    primaryString: 'onions',
    isLoading: false,
    message: '',
  };
}

  render() {

    const spinner = this.state.isLoading ?
  <ActivityIndicator size='large'/> : null;

    console.log('SearchPage.render');
    return (
      <View style={styles.container}>
        <View style={styles.flowRight}>
        <TextInput
         underlineColorAndroid={'transparent'}
         style={styles.searchInput}
         value={this.state.secondaryString}
         onChange={this._onSearchTextChangedTwo}
         placeholder='Search via name or postcode'/>
          <TextInput
           underlineColorAndroid={'transparent'}
           style={styles.searchInput}
           value={this.state.primaryString}
           onChange={this._onSearchTextChanged}
           placeholder='Search via name or postcode'/>
          <Button
            onPress={this._onSearchPressed}
            color='#48BBEC'
            title='Go'
          />
        </View>
        <Image source={require('./Resources/house.png')} style={styles.image}/>
        {spinner}
        <Text style={styles.description}>{this.state.message}</Text>
      </View>    );
  }

  _executeQuery = (query) => {
  console.log(query);
  this.setState({ isLoading: true });
  fetch(query)
  .then(response => response.json())
  .then(json => this._handleResponse(json))
  .catch(error =>
     this.setState({
      isLoading: false,
      message: 'Something bad happened ' + error
   }));

};

_handleResponse = (response) => {
  this.setState({ isLoading: false , message: '' });
  console.log(response.title);

  // if (response.application_response_code.substr(0, 1) === '1') {
    this.props.navigation.navigate(
      'Results', {listings: response.results});
  // } else {
  //   this.setState({ message: 'Location not recognized; please try again.'});
  // }
};

_onSearchPressed = () => {
  var  searchString = this.state.primaryString;
  var  searchStringTwo = this.state.secondaryString;
  const query = urlForQueryAndPage(searchString,searchStringTwo,3);
  this._executeQuery(query);
};

}

  const styles = StyleSheet.create({
    description: {
      marginBottom: 20,
      fontSize: 18,
      textAlign: 'center',
      color: '#656565'
    },
    container: {
      padding: 30,
      marginTop: 65,
      alignItems: 'center'
    },
    flowRight: {
      flexDirection: 'column',
      alignItems: 'center',
      alignSelf: 'stretch',
    },
    searchInput: {
      height: 36,
      padding: 4,
      marginRight: 5,
      flexGrow: 1,
      fontSize: 18,
      borderWidth: 1,
      borderColor: '#48BBEC',
      borderRadius: 8,
      color: '#48BBEC',
    },
    image: {
      width: 217,
      height: 138,
    },
   });
