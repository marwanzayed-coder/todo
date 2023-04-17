import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Title from "../components/Title";

const AddTask = ({ navigation, addTask }) => {
  const [data, setData] = useState({});
  const addData = () => {
    addTask(data);
    navigation.navigate("home");
  };
  return (
    <>
      <View style={styles.container}>
        <View style={{ marginHorizontal: 32 }}>
          <Title title="Add Task" />
          <View style={{ marginTop: 30 }}>
            <View style={styles.inputView}>
              <Text style={styles.label}>Task Name:</Text>
              <TextInput
                style={styles.input}
                onChangeText={(value) => setData({ ...data, value })}
                selectionColor={"#4B6BFB"}
              />
            </View>
            <View style={styles.inputView}>
              <Text style={styles.label}>Task Description:</Text>
              <TextInput
                style={styles.input}
                onChangeText={(desc) => setData({ ...data, desc })}
                selectionColor={"#4B6BFB"}
              />
            </View>
            <Pressable style={styles.btn} onPress={addData}>
              <Text style={{ color: "#fff", color: "#4B6BFB", fontSize: 18 }}>
                Add Task
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
      <Header navigation={navigation} />
    </>
  );
};

export default AddTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
  },
  inputView: {
    marginBottom: 15,
  },
  label: {
    color: "#fff",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#1E293B",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    color: "#4B6BFB",
  },
  btn: {
    backgroundColor: "#1E293B",
    borderRadius: 8,
    marginTop: 15,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
