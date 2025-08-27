import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

// Main App component
export default function App() {
  // State to store the user's name
  const [name, setName] = useState('');

  // Function to handle text input changes
  const handleText = (text) => {
    setName(text);
  };

  return (
    <View style={styles.container}>
      {/* TextInput for user to enter their name */}
      <TextInput
        style={styles.input}
        onChangeText={handleText}
        placeholder="Enter Name"
        value={name}
      />
      {/* Display the entered name */}
      <Text style={styles.text}>Your name is: {name}</Text>
    </View>
  );
}

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1, // Take up the full screen
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    padding: 20, // Add padding around the container
  },
  input: {
    width: '100%', // Input takes full width of the container
    borderColor: 'green', // Green border color
    borderWidth: 1, // Border width of 1
    margin: 10, // Margin around the input
    fontSize: 18, // Font size for input text
    paddingHorizontal: 10, // Horizontal padding inside the input
  },
  text: {
    fontSize: 18, // Font size for the text
    color: 'green', // Green text color
    marginTop: 20, // Margin above the text
  },
});