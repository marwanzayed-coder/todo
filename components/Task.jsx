import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const Task = (props) => {
  const { name, desc, id, done, db } = props;
  const [refreshing, setRefreshing] = useState(false);
  const [forceUpdate, forceUpdateId] = useForceUpdate();

  const ChangeDone = async () => {
    setRefreshing(true);
    if (done == 0) {
      db.transaction(
        (tx) => {
          tx.executeSql(`update tasks set done = 1 where id = ?;`, [id]);
        },
        null,
        forceUpdate
      );
    } else {
      db.transaction(
        (tx) => {
          tx.executeSql(`update tasks set done = 0 where id = ?;`, [id]);
        },
        null,
        forceUpdate
      );
    }
    setRefreshing(false);
  };
  const DeleteTask = () => {
    setRefreshing(true);
    db.transaction(
      (tx) => {
        tx.executeSql(`delete from tasks where id = ?;`, [id]);
      },
      null,
      forceUpdate
    );
    setRefreshing(false);
  };
  return (
    <View style={{ ...styles.container, opacity: done == 1 ? 0.6 : 1 }}>
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
        {done == 1 ? (
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
function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
}
