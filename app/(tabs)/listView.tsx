import { View, Text, FlatList, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function ListViewScreen() {
  const data = [
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
  ];

  const renderItem = ({ item }: any) => (
    <View style={styles.row}>
      <Text style={styles.rowText}>{item}</Text>
      <Ionicons name="eye" size={24} color="#C2185B" />
    </View>
  );

  return (
    <View style={styles.screen}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
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
