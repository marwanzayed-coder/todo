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

const AddTask = ({ navigation }) => {
  const [data, setData] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setIsLoading(false);
    setTimeout(() => {
      setRefreshing(false);
      setIsLoading(true);
    }, 2000);
  }, []);
  const addData = () => {
    fetch("https://todo-server-1vzj.onrender.com/api/v1/auth/register", {
      method: "POST",
      body: data,
      headers: {
        Authorization: "LQD0nviJlMueu9XM",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigation.navigate("home");
      })
      .catch((err) => console.error(err));
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
          <Title title="Create User" />
          {isLoading == false ? (
            <ActivityIndicator size="large" color="#1E293B" />
          ) : (
            <View style={{ marginTop: 30 }}>
              <View style={styles.inputView}>
                <Text style={styles.label}>Email:</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(email) => setData({ ...data, email })}
                  selectionColor={"#fff"}
                />
              </View>
              <View style={styles.inputView}>
                <Text style={styles.label}>Password:</Text>
                <TextInput
                  secureTextEntry={true}
                  style={styles.input}
                  onChangeText={(password) => setData({ ...data, password })}
                  selectionColor={"#fff"}
                />
              </View>
              <TouchableHighlight style={styles.btn} onPress={addData}>
                <Text style={{ color: "#fff", color: "#4B6BFB", fontSize: 18 }}>
                  Create
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
