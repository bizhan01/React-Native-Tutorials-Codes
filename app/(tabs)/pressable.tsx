import React from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';

const App = () => {
  return (
    <View style={styles.appContainer}>
      <PressableExample />
    </View>
  );
};

const PressableExample = () => {
  return (
    <View style={styles.container}>
      {/* Pressable Text Button */}
      <Pressable
        onPress={() => {
          console.log('Pressable Example');
          Alert.alert('Text Pressable Example');
        }}
        style={({ pressed }) => [
          styles.textButton,
          pressed && styles.pressedButton, // Highlight when pressed
        ]}
      >
        <Text style={styles.text}>Press Me</Text>
      </Pressable>

      {/* Pressable Image Button */}
      <Pressable
        onPress={() => {
          Alert.alert('Image Pressable Example');
        }}
        style={({ pressed }) => pressed && styles.pressedButton}
      >
        <Image
          source={{
            uri: 'https://media.geeksforgeeks.org/wp-content/uploads/20220217151648/download3.png',
          }}
          style={styles.image}
        />
      </Pressable>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e1e1e', // Dark background for contrast
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    backgroundColor: '#4CAF50', // Green button
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginBottom: 40,
  },
  pressedButton: {
    opacity: 0.6, // Feedback when pressed
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 20, // Rounded corners
    borderWidth: 2,
    borderColor: '#fff',
  },
});
