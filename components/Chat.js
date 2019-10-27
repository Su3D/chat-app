import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text, FlatList } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
// import fix for Android keyboards
import KeyboardSpacer from 'react-native-keyboard-spacer'

//import firebase/firestore
const firebase = require('firebase');
require('firebase/firestore');

// create Chat (Screen2) class
export default class Chat extends Component {
  constructor() {
    super();

    if (!firebase.apps.length) {
      firebase.initializeApp({
        // insert Firestore database credentials
        apiKey: "AIzaSyANi4yYR0lZDTmAFW0HxD6e8c4XvyRiq7k",
        authDomain: "cf-chat-app.firebaseapp.com",
        databaseURL: "https://cf-chat-app.firebaseio.com",
        projectId: "cf-chat-app",
        storageBucket: "cf-chat-app.appspot.com",
        messagingSenderId: "890852186589",
        appId: "1:890852186589:web:de8221b345f8eab2fdbe34"
      });
    }

    this.referenceChatUser = null;

    this.referenceMessages = firebase.firestore().collection('messages');

    this.state = {
      messages: [],
      uid: '',
      loggedInText: 'Stand by, logging-in.',
    };
  }

  //put users name in navigation bar
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.userName
    };
  }

  get user() {
    return {
      name: this.props.navigation.state.params.userName,
      _id: this.state.uid,
      id: this.state.uid,
    }
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach(doc => {
      // get QueryDocumentSnapshot data
      var data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user,
      });
    });
    this.setState({
      messages
    });
  };

  addMessage() {
    console.log(this.state.messages[0].user)
    this.referenceMessages.add({
      _id: this.state.messages[0]._id,
      text: this.state.messages[0].text || '',
      createdAt: this.state.messages[0].createdAt,
      user: this.state.messages[0].user,
      uid: this.state.uid,
    });
  }

  onSend(messages = []) {
    this.setState(
      previousState => ({
        messages: GiftedChat.append(previousState.messages, messages)
      }),
      () => {
        this.addMessage();
      }
    );
  }

  componentDidMount() {
    this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
      //update user state with currently active user data
      this.setState({
        uid: user.uid,
        loggedInText: 'Welcome!',
      });

      // create a reference to the active user's documents (messages)
      //this.referenceChatUser = firebase.firestore().collection('messages').where("uid", "==", this.state.uid);

      // listen for collection changes for current user
      //this.unsubscribeMessageUser = this.referenceChatUser.onSnapshot(this.onCollectionUpdate);



      // listen for changes
      this.unsubscribe = this.referenceMessages.onSnapshot(this.onCollectionUpdate)
    });

    this.setState({
      messages: [
        {
          _id: 'msg0',
          text: 'Hello ' + this.props.navigation.state.params.userName + '! Welcome to the Chatter Box.',
          createdAt: new Date(),
          system: true,
        },
      ],
    })
  }

  componentWillUnmount() {
    // stop listening to authentication
    this.authUnsubscribe();
    // stop listening for changes
    //this.unsubscribeMessageUser();
    this.unsubscribe();
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{ right: { backgroundColor: '#ff4d03' }, left: { backgroundColor: '#aa0975' } }}
      />
    )
  };



  //render components
  render() {
    return (
      //overall View container
      //user's background color choice
      <View style={[styles.container, { backgroundColor: this.props.navigation.state.params.userBackgroundColor }]}>

        <GiftedChat
          renderBubble={this.renderBubble}
          messages={this.state.messages}
          inverted={false}
          onSend={messages => this.onSend(messages)}
          user={this.state.user}
        />

        {Platform.OS === 'android' ? <KeyboardSpacer /> : null}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  }
});