import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import Header from "../components/Header";
import Title from "../components/Title";
import Task from "../components/Task";

const Home = ({ navigation, db }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isError, setIsError] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setIsLoading(false);
    setTimeout(() => {
      setRefreshing(false);
      setIsLoading(true);
    }, 2000);
  }, []);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`select * from tasks`, [], (_, { rows: { _array } }) => {
        setTasks(_array);
        setIsLoading(true);
      });
    });
  }, [tasks]);
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
          <Title title="All Tasks" />
          <View style={{ marginTop: 30 }}>
            {isLoading == false ? (
              <ActivityIndicator size="large" color="#1E293B" />
            ) : isError ? (
              <Text
                style={{
                  color: "#4B6BFB",
                  backgroundColor: "#1E293B",
                  borderRadius: 8,
                  textAlign: "center",
                  padding: 8,
                  fontSize: 18,
                }}
              >
                There was an error fetching your data. Please make sure that the
                internet is working fine
              </Text>
            ) : tasks.length > 0 ? (
              tasks.map((item) => (
                <Task
                  key={item.id}
                  name={item.name}
                  desc={item.desc}
                  id={item.id}
                  done={item.done}
                  db={db}
                />
              ))
            ) : (
              <Text
                style={{
                  color: "#4B6BFB",
                  backgroundColor: "#1E293B",
                  borderRadius: 8,
                  textAlign: "center",
                  padding: 8,
                  fontSize: 18,
                }}
                onPress={() => navigation.navigate("addTask")}
              >
                There are no tasks. Click me to add a new task
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
      <Header navigation={navigation} />
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
  },
});
