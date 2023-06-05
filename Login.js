import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';
import firebase from 'firebase';
import {RFValue} from 'react-native-responsive-fontsize';


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  signIn = async (email, password) => {
    console.log("b")
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        alert("Login Successful");
        this.props.navigation.navigate('Dashboard'); //switches screen to dashboard
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  render() {
    const { email, password } = this.state;
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.android} />
        <Text style={styles.headerText}>Spartanr</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => {
            this.setState({ email: text });
          }}
          placeholder={'Enter Email'}
          placeholderTextColor={'black'}
          autoFocus
        />
        <TextInput
          style={[styles.textInput,{marginTop: RFValue(20)}]}
          onChangeText={(text) => {
            this.setState({ password: text });
          }}
          placeholder={'Enter Password'}
          placeholderTextColor={'black'}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={()=>{this.signIn(email,password)}}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{this.props.navigation.navigate("Register")}}>
          <Text style={styles.newUser}>New User?</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB"
  },
  android: {
     marginTop: Platform.OS == "android" ? StatusBar.currentHeight: 0
  },
  headerText: {
    justifyContent: "center",
    textAlign: "center",
    color: "black",
    fontSize: 40,
    marginBottom: 100,
    marginTop: 100,
    fontWeight: "bold"
  },
  textInput: {
    width: RFValue(330),
    height: RFValue(50),
    borderColor: "#00C212",
    borderWidth: RFValue(5),
    borderRadius: RFValue(20),
    backgroundColor: "#CFFFCD",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    textAlign: "center",
    fontSize: RFValue(25),
    color: "#CFFFCD"
  },
  button: {
    alignSelf: "center",
    marginTop: RFValue(30),
    borderWidth: RFValue(5),
    width: RFValue(130),
    height: RFValue(50),
    borderColor: "#999999",
    backgroundColor: "#CCCCCC",
    borderRadius: RFValue(20)
  },
  buttonText: {
    textAlign: "center",
    fontSize: RFValue(28),
    fontWeight: "bold",
    color: "#999999"
  },
  newUser: {
    fontSize: RFValue(15),
    color: "black",
    alignSelf: "center",
    marginTop: 20,
    textDecorationLine: "underline"
  }
});
