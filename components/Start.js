import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground, Text, TextInput, Button, TouchableOpacity } from 'react-native';

//create Start (Screen1) class
export default class Start extends Component {

  //define state
  state = {
    userName: '',
    userBackgroundColor: ''
  }

  //render components
  render() {
    return (
      //overall View container
      <View style={styles.container}>
        {/* background image & flexbox */}
        <ImageBackground source={require("../assets/BackgroundImage.png")} style={styles.backgroundImgContainer}>

          {/* app title */}
          <Text style={styles.appTitle}>Chatter Box</Text>

          {/* login container */}
          <View style={styles.logInContainer}>
            {/* user name text input */}
            <TextInput
              style={styles.userNameInput}
              onChangeText={(userName) => this.setState({ userName })}
              value={this.state.userName}
              placeholder='Your Name...'
            />
            {/* Choose Background Color: */}
            <Text style={styles.choseBackgroundColor}>Choose Background Color:</Text>
            {/* user background color selections */}
            <View style={styles.backgroundColorsContainer}>
              {/* black */}
              <TouchableOpacity
                onPress={() => this.setState({ userBackgroundColor: '#090C08' })}
                style={[styles.backgroundColors, styles.black]}
              />
              {/* purple */}
              <TouchableOpacity
                onPress={() => this.setState({ userBackgroundColor: '#474056' })}
                style={[styles.backgroundColors, styles.purple]}
              />
              {/* gray */}
              <TouchableOpacity
                onPress={() => this.setState({ userBackgroundColor: '#8A95A5' })}
                style={[styles.backgroundColors, styles.gray]}
              />
              {/* green */}
              <TouchableOpacity
                onPress={() => this.setState({ userBackgroundColor: '#B9C6AE' })}
                style={[styles.backgroundColors, styles.green]}
              />
            </View>{/* backgroundColorsContainer END */}

            {/* Start Chatting button (sends user to chat screen) */}
            <TouchableOpacity
              accessible={true}
              accessibilityLabel="Start Chatting"
              accessibilityHint="Go to the next screen to start chatting."
              accessibilityRole="button"
              style={styles.startChatButton}
              underlayColor='#fff'
              onPress={() => this.props.navigation.navigate('Chat', { userName: this.state.userName, userBackgroundColor: this.state.userBackgroundColor })}
            >
              <Text style={styles.startChattingText}>Start Chatting</Text>
            </TouchableOpacity>
          </View>{/* login container END */}
        </ImageBackground>
      </View >//overall View container END
    );
  }
};

//stylesheets
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%'
  },
  backgroundImgContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  appTitle: {
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: '6%'
  },
  logInContainer: {
    height: '44%',
    width: '88%',
    backgroundColor: 'white',
    marginBottom: '6%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  userNameInput: {
    width: '88%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    fontSize: 16,
    color: '#757083',
    fontWeight: '300',
    opacity: 0.5
  },
  choseBackgroundColor: {
    width: '88%',
    fontSize: 16,
    fontWeight: '300',
    color: '#757083'
  },
  backgroundColorsContainer: {
    width: '88%',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  backgroundColors: {
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
    marginLeft: 15
  },
  black: { backgroundColor: '#090C08' },
  purple: { backgroundColor: '#474056' },
  gray: { backgroundColor: '#8A95A5' },
  green: { backgroundColor: '#B9C6AE' },
  startChatButton: {
    width: '88%',
    height: 40,
    fontSize: 16,
    fontWeight: '600',
    backgroundColor: '#757083',
    paddingTop: 10,
    paddingBottom: 10
  },
  startChattingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
  },
});