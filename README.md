# Introduction
The is a Chat Application using React-Native where users can login to send text messages including images from their device and share their location as well as customize the color of their screen.


# Get started
Install Expo and create a Firbase account.

## Expo
First install Expo by running:

`npm install expo-cli -g`

Then download the Expo App to your smartphone. More [details](https://expo.io) on Expo.

## Firebase
Create a Firebase [account](https://firebase.google.com) for data storage with the instructions below. 

1. go [https://firebase.google.com/](https://firebase.google.com/)

2. sign into your google account</br>

3. click "Go to console"</br>

4. click "add project"</br>

5. follow onscreen instructions until it says "creating your project"</br>

6. click "database" on the Develop tab </br>

7. click "Create Database" and select "start in test mode"</br>

8. click "start collection" and name it "messages" and then press "auto id" and confirm on the following screen</br>

9. click "Authentication", "set up sign-in method" and enable anonymous authentication</br>

10. click "storage" to set up cloud storage</br>

11. click the gear just above the Develop tab, and select "project settings"</br>

12. Ccick the button that will add Firebase to a web app, name it, and copy everything in the firebaseConfig and paste into the Chat.js file.</br>

See the firebase [documentation](https://firebase.google.com/docs) for more information. Pay particular attention to the section on on how to initializing Cloud Firestore with your individual credentials.


# Library
[GiftedChat](https://github.com/FaridSafi/react-native-gifted-chat)


# Modules
run `npm install` to install all the modules:

* "expo": "^35.0.0",
* "expo-image-picker": "^7.0.0",
* "expo-location": "^7.0.0",
* "expo-permissions": "^7.0.0",
* "firebase": "^7.2.0",
* "prop-types": "^15.7.2",
* "react": "16.8.3",
* "react-dom": "16.8.3",
* "react-native": "https://github.com/expo/react-native/archive/sdk-35.0.0.tar.gz",
* "react-native-gesture-handler": "^1.4.1",
* "react-native-gifted-chat": "^0.11.0",
* "react-native-keyboard-spacer": "^0.4.1",
* "react-native-maps": "^0.26.1",
* "react-native-web": "^0.11.7",
* "react-navigation": "^4.0.10",
* "react-navigation-stack": "^1.9.3"


# Run
Start the app by running:

`npm start`

from your project folder.

The app will launch DevTools on port 19002. You can then run the app on a physical device or emulator by scanning the QR code.</br>

For information on how to set up an emulator for testing, you  [visit](https://docs.expo.io/versions/latest/workflow/android-studio-emulator/). 

Then press "Run on Android device/emulator" in the DevTools to launch the app on your emulator.




[Kanban board](https://trello.com/b/IzlDfldX/cffs-wda5)