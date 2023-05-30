import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import AddTask from "./screens/AddTask";
import CreateUser from "./screens/CreateUser";
import { Image, Text, BackHandler, Alert } from "react-native";
import { useEffect } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
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
        <Stack.Screen name="create">
          {(props) => <CreateUser {...props} userid="LQD0nviJlMueu9XM" />}
        </Stack.Screen>
        <Stack.Screen name="home">
          {(props) => <Home {...props} userid="LQD0nviJlMueu9XM" />}
        </Stack.Screen>
        <Stack.Screen name="addTask">
          {(props) => <AddTask {...props} userid="LQD0nviJlMueu9XM" />}
        </Stack.Screen>
      </Stack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}
