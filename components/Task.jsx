import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const Task = (props) => {
  const { name, desc, id, done, setTasks, tasks } = props;
  const task = tasks;
  let updatedItem = task.find((element) => {
    return element.id == id;
  });
  updatedItem.done = done == 1 ? 0 : 1;

  return (
    <View style={{ ...styles.container, opacity: done == 1 ? 0.6 : 1 }}>
      <View>
        <Text style={{ color: "#fff", fontSize: 17, marginBottom: 5 }}>
          {name}
        </Text>
        <Text style={{ color: "#fff" }}>{desc}</Text>
      </View>
      <View>
        <AntDesign
          name="delete"
          size={24}
          color="white"
          style={{ marginBottom: 10 }}
        />
        {done == 1 ? (
          <MaterialIcons
            name="done"
            size={24}
            color="#4B6BFB"
            onPress={() => setTasks([...task])}
          />
        ) : (
          <MaterialIcons
            name="done"
            size={24}
            color="white"
            onPress={() => setTasks([...task])}
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
