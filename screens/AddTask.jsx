import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  TouchableHighlight,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import Header from "../components/Header";
import Title from "../components/Title";

const AddTask = ({ navigation, db }) => {
  const [data, setData] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [forceUpdate, forceUpdateId] = useForceUpdate();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setIsLoading(false);
    setTimeout(() => {
      setRefreshing(false);
      setIsLoading(true);
    }, 2000);
  }, []);
  const add = () => {
    if (
      data.name === null ||
      data.name === "" ||
      data.desc === null ||
      data.desc === ""
    ) {
      return "The Un Data";
    }

    db.transaction(
      (tx) => {
        tx.executeSql("insert into tasks (done, name, desc) values (0, ?, ?)", [
          data.name,
          data.desc,
        ]);
        tx.executeSql("select * from tasks", [], (_, { rows }) =>
          navigation.navigate("home")
        );
      },
      null,
      forceUpdate
    );
  };
  return (
    <>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            progressBackgroundColor={"#4B6BFB"}
            colors={["#fff"]}
          />
        }
      >
        <View style={{ marginHorizontal: 32 }}>
          <Title title="Add Task" />
          {isLoading == false ? (
            <ActivityIndicator size="large" color="#1E293B" />
          ) : (
            <View style={{ marginTop: 30 }}>
              <View style={styles.inputView}>
                <Text style={styles.label}>Task Name:</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(name) => setData({ ...data, name })}
                  selectionColor={"#fff"}
                />
              </View>
              <View style={styles.inputView}>
                <Text style={styles.label}>Task Description:</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(desc) => setData({ ...data, desc })}
                  selectionColor={"#fff"}
                />
              </View>
              <TouchableHighlight style={styles.btn} onPress={add}>
                <Text style={{ color: "#fff", color: "#4B6BFB", fontSize: 18 }}>
                  Add Task
                </Text>
              </TouchableHighlight>
            </View>
          )}
        </View>
      </ScrollView>
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
function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
}
