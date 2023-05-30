import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Foundation } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";

const Header = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Foundation
        name="home"
        size={32}
        color="#4B6BFB"
        onPress={() => navigation.navigate("home")}
      />
      <Octicons
        name="diff-added"
        size={32}
        color="#4B6BFB"
        onPress={() => navigation.navigate("addTask")}
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1E293B",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    flexDirection: "row",
    gap: 120,
  },
});
