import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const Task = (props) => {
  const { name, desc, id, done } = props;
  const [refreshing, setRefreshing] = useState(false);

  const ChangeDone = async () => {
    setRefreshing(true);
    fetch(
      `https://todo-server-1vzj.onrender.com/api/v1/task/change-done/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: "LQD0nviJlMueu9XM",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setRefreshing(false);
      })
      .catch((err) => console.error(err));
  };
  const DeleteTask = () => {
    setRefreshing(true);
    fetch(`https://todo-server-1vzj.onrender.com/api/v1/task/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "LQD0nviJlMueu9XM",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setRefreshing(false);
      })
      .catch((err) => console.error(err));
  };
  return (
    <View style={{ ...styles.container, opacity: done ? 0.6 : 1 }}>
      <View>
        <Text style={{ color: "#fff", fontSize: 17, marginBottom: 5 }}>
          {name}
        </Text>
        <Text style={{ color: "#fff" }}>{desc}</Text>
      </View>
      {refreshing == true && <ActivityIndicator color="#4B6BFB" />}

      <View>
        <AntDesign
          name="delete"
          size={24}
          color="white"
          style={{ marginBottom: 10 }}
          onPress={DeleteTask}
        />
        {done ? (
          <MaterialIcons
            name="done"
            size={24}
            color="#4B6BFB"
            onPress={ChangeDone}
          />
        ) : (
          <MaterialIcons
            name="done"
            size={24}
            color="white"
            onPress={ChangeDone}
          />
        )}
      </View>
    </View>
  );
};

export default Task;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1E293B",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 20,
    borderRadius: 8,
  },
});
