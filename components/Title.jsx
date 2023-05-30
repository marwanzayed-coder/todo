import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Title = (props) => {
  const { title } = props;
  return (
    <View style={{ flexDirection: "row" }}>
      <Text style={styles.title}>{title}</Text>
      <Text
        style={{
          borderBottomColor: "#4B6BFB",
          borderBottomWidth: 1,
          color: "#0F172A",
        }}
      >
        {title}
      </Text>
    </View>
  );
};

export default Title;

const styles = StyleSheet.create({
  title: {
    color: "#fff",
    marginTop: 30,
    fontSize: 20,
    borderBottomColor: "#4B6BFB",
    borderBottomWidth: 1,
    padding: 5,
  },
});
