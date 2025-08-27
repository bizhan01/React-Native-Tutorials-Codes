import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();

  const screens = [
    { title: "Hello World", path: "/helloWorld" },
    { title: "ActivityIndicator Component", path: "/activityIndicator" },
    { title: "Go to List View", path: "/listView" },


  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to Index Page</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {screens.map((screen, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => router.push(screen.path)}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>{screen.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
    paddingTop: 60,
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 40,
  },
  button: {
    backgroundColor: "#61dafb",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginVertical: 8,
    width: 280,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
