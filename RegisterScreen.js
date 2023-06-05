import React, {Component} from 'react';
import { View, StyleSheet,Text, SafeAreaView, Platform, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from "firebase";
import { color } from 'react-native-reanimated';

export default class RegisterScreen extends Component
{
  constructor()
  {
    super();
    this.state = {
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        confirmPassword: ""
    }
  }
  
  registerUser=(email,password,confirmPassword,first_name,last_name)=>{
    if(password == confirmPassword)
    {
        firebase.auth()
        .createUserWithEmailAndPassword(email,password)
        .then((userCredential)=>{
            alert("User Registered!")
            console.log(userCredential.user.uid)
            this.props.navigation.replace("Login")
            firebase.database()
            .ref("/users/"+userCredential.user.uid)
            .set({
                email: userCredential.user.email,
                first_name: first_name,
                last_name: last_name
            })
        })
        .catch((error)=>{alert(error.message)})  //check for error
    }
    else {
        alert("Passwords do not match!")
    }
  }
  
  render()
  {
    const {email,password,confirmPassword,first_name,last_name} = this.state
    return(
      <View>
      <SafeAreaView style={styles.android}/>
      <Text style={styles.appTitleText}>Register User</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(text)=>{this.setState({first_name: text})}} 
        placeholder={"Enter First Name"}
        placeholderTextColor={"#999999"}
        autoFocus
      />
      <TextInput
        style={[styles.textInput,{marginTop: RFValue(15)}]}
        onChangeText={(text)=>{this.setState({last_name: text})}}
        placeholder={"Enter Last Name"}
        placeholderTextColor={"#999999"}
        autoFocus
      />
      <TextInput
        style={[styles.textInput,{marginTop: RFValue(15)}]}
        onChangeText={(text)=>{this.setState({email: text})}}
        placeholder={"Enter Email"}
        placeholderTextColor={"#999999"}
        autoFocus
      />
      <TextInput
        style={[styles.textInput,{marginTop: RFValue(15)}]}
        onChangeText={(text)=>{this.setState({password: text})}}
        placeholder={"Enter Password"}
        placeholderTextColor={"#999999"}
        secureTextEntry
      />
      <TextInput
        style={[styles.textInput,{marginTop: RFValue(15)}]}
        onChangeText={(text)=>{this.setState({confirmPassword: text})}}
        placeholder={"Re-enter Password"}
        placeholderTextColor={"#999999"}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={()=>{this.registerUser(email,password,confirmPassword,first_name,last_name)}}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{this.props.navigation.navigate("Login")}}>
        <Text style={styles.login}>Login?</Text>
      </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
      android: {
         marginTop: Platform.OS == "android" ? StatusBar.currentHeight: 0
      },
      textInput: {
        width: RFValue(350),
        height: RFValue(50),
        borderColor: "#999999",
        borderWidth: RFValue(5),
        borderRadius: RFValue(20),
        backgroundColor: "#CCCCCC",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        textAlign: "center",
        fontSize: RFValue(25),
        color: "#999999"
      },
      button: {
        alignSelf: "center",
        marginTop: RFValue(30),
        borderWidth: RFValue(5),
        width: RFValue(130),
        height: RFValue(50),
        borderColor: "#00C212",
        backgroundColor: "#CFFFCD",
        borderRadius: RFValue(20)
      },
      buttonText: {
        textAlign: "center",
        fontSize: RFValue(28),
        fontWeight: "bold",
        color: "#00C212"
      },
      appTitleText: {
        color: "#00C212",
        textAlign: "center",
        fontSize: RFValue(50),
        fontWeight: "bold",
        marginBottom: RFValue(30)
      },
      login: {
        fontSize: RFValue(15),
        color: "black",
        alignSelf: "center",
        marginTop: 20,
        textDecorationLine: "underline"
      }
});