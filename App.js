import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import AddTask from "./screens/AddTask";
import { Image, Text } from "react-native";
import { useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";

const Stack = createNativeStackNavigator();

export default function App() {
  const db = SQLite.openDatabase("db.db");

  const [tasks, setTasks] = useState([]);
  const [forceUpdate, forceUpdateId] = useForceUpdate();

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists tasks (id integer primary key not null, done int, value text, desc text);"
      );
    });
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM tasks",
        null,
        (txObj, resultSet) => setTasks(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });
  }, []);
  console.log(tasks);
  const addTask = (data) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "insert into tasks (done, value, desc) values (0, ?, ?)",
          [data.value, data.desc]
        );
      },
      null,
      forceUpdate
    );
  };
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitle: () => (
            <>
              <Image
                source={require("./assets/favicon.png")}
                style={{ width: 39, height: 36, marginRight: 10 }}
              />
              <Text style={{ color: "#fff", fontSize: 18 }}>Todo App</Text>
            </>
          ),
          headerStyle: {
            backgroundColor: "#1E293B",
          },
          headerTintColor: "#fff",
        }}
      >
        <Stack.Screen name="home">
          {(props) => <Home tasks={tasks} {...props} setTasks={setTasks} />}
        </Stack.Screen>
        <Stack.Screen name="addTask">
          {(props) => (
            <AddTask
              {...props}
              addTask={addTask}
              tasks={tasks}
              setTasks={setTasks}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}
function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
}
