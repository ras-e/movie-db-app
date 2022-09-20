import * as React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button } from "react-native";
import { useEffect, useState } from "react";
import { FlatList } from "react-native-web";

// Default component that will get called by app.js
// Prop "navigation" is added through app.js when using navigation component.
export default function HomeScreen({ navigation }) {
  //State holding the movie data
  const [data, setData] = useState({});
  
  useEffect(() => {
    fetchMovies();
    
  }, []);
    
  function fetchMovies() {
    fetch(
      'https://api.themoviedb.org/3/movie/550?api_key=40877d5afcb8d5e8fd6232a1d1569c32'
    )
      .then((response) => response.json())
      .then((data) => setData(data.results));
  }

  const renderItem = ({ item }) => (
    <Item navigation={navigation} movieID={item.id} title={item.title} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text>This is the home screen</Text>
      <Button
        title= "Go to details"
        onPress={() => navigation.navigate("MovDetails")}
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
    );
}

const Item = ({ navigation, title, movieId }) => (
  <View style={styles.item}>
    <Text
      onPress={() =>
        navigation.navigate("MovDetails", {
          movieId,
        })
      }
      style={styles.title}
    >
      {title}
    </Text>
  </View>
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  item: {
    backgroundColor: "#EEE",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
}); 
