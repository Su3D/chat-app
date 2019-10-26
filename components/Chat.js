import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
// import fix for Android keyboards
import KeyboardSpacer from 'react-native-keyboard-spacer'

// create Chat (Screen2) class
export default class Chat extends Component {
  state = {
    messages: [],
  }

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hey! What\'s up?',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Friend',
            avatar: 'https://placeimg.com/140/140/nature?t=1572046260112',
          },
        },
        {
          _id: 0,
          text: 'Hello ' + this.props.navigation.state.params.userName + '! Welcome to the Chatter Box.',
          createdAt: new Date(),
          system: true,
        },
      ],
    })
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{ right: { backgroundColor: '#ff4d03' }, left: { backgroundColor: '#aa0975' } }}
      />
    )
  };

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

        <GiftedChat
          renderBubble={this.renderBubble}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
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
    width: '100%'
  }
});