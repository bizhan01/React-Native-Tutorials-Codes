import React from "react";
import { StyleSheet, Text, View } from "react-native";

// Creating a functional component
const GFG = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>GlideSoft</Text>
    </View>
  );
};

// Creating a stylesheet
const styles = StyleSheet.create({
  container: {
    backgroundColor: "green",
    alignItems: "center",
  },
  text: {
    fontSize: 25,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 5,
  },
});

// Creating the main App component
export default function App() {
  return (
    // Using the GFG component multiple times
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <GFG />
      <GFG />
      <GFG />
      <GFG />
    </View>
  );
}