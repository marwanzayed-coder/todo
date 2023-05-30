import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import AddTask from "./screens/AddTask";
import { Image, Text, BackHandler, Alert } from "react-native";
import { useEffect } from "react";
import * as SQLite from "expo-sqlite";
const Stack = createNativeStackNavigator();
function openDatabase() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }

  const db = SQLite.openDatabase("database.db");
  return db;
}
const db = openDatabase();

export default function App() {
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists tasks (id integer primary key not null, done int, name text, desc text);"
      );
    });
    BackHandler.addEventListener("hardwareBackPress", () => {
      Alert.alert(
        "Exit App",
        "Are you sure you want to exit the application?",
        [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () => BackHandler.exitApp(),
          },
        ]
      );
      return true;
    });
  });
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
          {(props) => <Home {...props} db={db} />}
        </Stack.Screen>
        <Stack.Screen name="addTask">
          {(props) => <AddTask {...props} db={db} />}
        </Stack.Screen>
      </Stack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}
