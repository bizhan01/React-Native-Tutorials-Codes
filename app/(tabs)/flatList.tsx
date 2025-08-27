import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";

class App extends Component {
  state = {
    data: [
      "Data Structures",
      "STL",
      "C++",
      "Java",
      "Python",
      "ReactJS",
      "Angular",
      "NodeJs",
      "PHP",
      "MongoDb",
      "MySql",
      "Android",
      "iOS",
      "Hadoop",
      "Ajax",
      "Ruby",
      "Rails",
      ".Net",
      "Perl",
    ],
  };

  renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.rowText}>{item}</Text>
      <Icon name="eye" type="ionicon" color="#C2185B" />
    </View>
  );

  keyExtractor = (item, index) => index.toString();

  render() {
    return (
      <View style={styles.screen}>
        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    marginTop: 30,
  },
  row: {
    margin: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 2,
  },
  rowText: {
    fontSize: 18,
  },
});

export default App;