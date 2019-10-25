import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// create Chat (Screen2) class
export default class Chat extends Component {
  //define title in navigation bar
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.userName,
    };
  };

  //render components
  render() {
    return (
      //overall View container
      //user's background color choice
      <View style={[styles.container, { backgroundColor: this.props.navigation.state.params.userBackgroundColor }]}>
        <Text>Chatter Box!</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});