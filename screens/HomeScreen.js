import * as React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button, Image } from "react-native";
import { useEffect, useState } from "react";
import { FlatList, TouchableHighlight } from "react-native";

// Default component that will get called by app.js
// Prop "navigation" is added through app.js when using navigation component.
export default function HomeScreen({ navigation }) {
  //State holding the movie data
  const [data, setData] = useState(null);


  //Async to avoid callback hell 
  useEffect(() => {
    async function fetchMovies() {
      //const res = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=40877d5afcb8d5e8fd6232a1d1569c32&language=en-US&page=1')
      const res = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=40877d5afcb8d5e8fd6232a1d1569c32')

      console.log(res) 
      
      const data = await res.json()
      console.log(data)
      setData(data.results)
    }

    fetchMovies();
    
  }, []);

  const renderItem = ({ item }) => (
    <Item navigation={navigation} movieId={item.id} title={item.title} image={item.poster_path} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text>This is the home screen</Text>
      <FlatList
        
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        initialNumToRender={10}
      />
      <Text>Popular</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        initialNumToRender={10}
      />      
    </SafeAreaView>
    );
}

const Item = ({ navigation, title, movieId, image }) => (
  //Check properties
  <TouchableHighlight style={styles.item} 
  onPress={() =>
    navigation.navigate("MovDetails", {
      id: movieId,
    })
  }
  >
    <View style={{flex:1}}>
    <Image style={styles.image} source={{uri: "https://image.tmdb.org/t/p/w500" + image}} />
    <View style={{flex:1, flexGrow:1}}>
    <Text
      style={styles.title}
    >
      {title}
    </Text>
    </View>
    </View>
    
  </TouchableHighlight>
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  item: {
    backgroundColor: "#EEE",
    marginVertical: 8,
    marginHorizontal: 16,
    height: 350,
    width: 200,
    flex: 1,

  },
  title: {
    textAlign: 'center',
    fontSize: 32,
    flex: 1,
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  image: {
    flex: 5,
    height: 300,
    width: 150,
    resizeMode: "contain", 
  }
}); 
