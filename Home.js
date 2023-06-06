import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Avatar, ListItem, Icon } from 'react-native-elements';
import { RFValue } from 'react-native-responsive-fontsize';
import db from '../config';
import firebase from "firebase"

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allUsers: []
    };
  }

  getUsers = () => {
    db.collection('users')
      .get()
      .then((data) => {
        data.docs.map((i) => {
          this.setState({
            allUsers: [...this.state.allUsers, i.data()],
          });
        });
      });
  };


  componentDidMount = async () => { //runs as soon as the code compiles
    this.getUsers();
  };


   renderItem = ({ item }) => {
     return(
       <View>
        <ListItem>
          <ListItem.Title>
            {`${item.name}`}
          </ListItem.Title>
          <ListItem.Subtitle>
            {`${item.number}`}
          </ListItem.Subtitle>
          <ListItem.Subtitle>
            {`${item.email}`}
          </ListItem.Subtitle>
          <ListItem.Subtitle>
            {`${item.epic-user}`}
          </ListItem.Subtitle>
        </ListItem>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            Match
          </Text>
        </TouchableOpacity>
       </View>
     );
   }
  

  render() {
    const { searchText, allSlots } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.upperContainer}>
          <Text style={styles.titleText}>Spartanr</Text>
        </View>
        <View style={styles.lowerContainer}>
        <FlatList
            data={this.state.allUsers}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => {
              index.toString();
            }}
        />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: RFValue(35),
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginTop: RFValue(20),
    marginBottom: RFValue(30),
  },
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
  title: {
    textAlign: "center",
    fontSize: 20
  },
  subtitle: {
    textAlign: "center",
    fontSize: 12
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
  }
});
