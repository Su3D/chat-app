import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text, AsyncStorage, NetInfo } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
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
      isConnected: false,
      user: {
        _id: '',
        name: '',
        avatar: ''
      },
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
        this.saveMessages();
      }
    );
  }

  // async functions
  async getMessages() {
    let messages = '';
    try {
      messages = await AsyncStorage.getItem('messages') || [];
      this.setState({
        messages: JSON.parse(messages)
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  async saveMessages() {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  }

  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
    } catch (error) {
      console.log(error.message);
    }
  }

  componentDidMount() {
    //checks if user is on or offline
    NetInfo.isConnected.fetch().then(isConnected => {
      //IF the user is ONLINE
      if (isConnected) {
        console.log('online');
        this.setState({
          isConnected: true,
        })
        //authenticate user via firebase
        this.authUnsubscribe = firebase.auth().onAuthStateChanged(async user => {
          if (!user) {
            await firebase.auth().signInAnonymously();
          }
          //update with current user data
          this.setState({
            uid: user.uid,
            user: {
              _id: user.uid,
              name: this.props.navigation.state.params.userName,
              avatar: '',
            },
            loggedInText: 'Welcome!'
          });

          // create a reference to the active user's documents (messages)
          //this.referenceChatUser = firebase.firestore().collection('messages').where("uid", "==", this.state.uid);

          // listen for collection changes for current user
          //this.unsubscribeMessageUser = this.referenceChatUser.onSnapshot(this.onCollectionUpdate); 

          // listen for changes
          this.unsubscribe = this.referenceMessages.onSnapshot(this.onCollectionUpdate)
        });


        //IF the user is OFFLINE
      } else {
        console.log('offline');
        this.setState({
          isConnected: false,
        });
        //get messages from async storage
        this.getMessages();
      }
    });

    /*
    this.setState({
      messages: [
        {
          _id: 'msg0',
          text: 'Hello ' + this.props.navigation.state.params.userName + '! Welcome to the Chatter Box.',
          createdAt: new Date(),
          system: true,
        },
      ],
    }) */
  }

  componentWillUnmount() {
    // stop listening to authentication
    this.authUnsubscribe();
    // stop listening for changes
    this.unsubscribe(); //this.unsubscribeMessageUser();
  }

  //Gifted Chat functions
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{ right: { backgroundColor: '#ff4d03' }, left: { backgroundColor: '#aa0975' } }}
      />
    )
  };

  //don't display toolbar if the user is offline
  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return (
        <InputToolbar
          {...props}
        />
      )
    }
  }


  //render components
  render() {
    return (
      //overall View container
      //user's background color choice
      <View style={[styles.container, { backgroundColor: this.props.navigation.state.params.userBackgroundColor }]}>

        <GiftedChat
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          renderBubble={this.renderBubble}
          messages={this.state.messages}
          //inverted={false}
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