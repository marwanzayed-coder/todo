import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Title from "../components/Title";
import Task from "../components/Task";

const Home = ({ navigation, tasks, setTasks },props) => {
  console.log(props)
  return (
    <>
      <View style={styles.container}>
        <View style={{ marginHorizontal: 32 }}>
          <Title title="All Tasks" />
          <View style={{ marginTop: 30 }}>
            {tasks.tasks > 0 ? (
              tasks.map((task) => (
                <Task
                  key={task.name}
                  name={task.name}
                  desc={task.desc}
                  id={task.id}
                  done={task.done}
                  setTasks={setTasks}
                  tasks={tasks}
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
      </View>
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
