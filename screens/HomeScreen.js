import * as React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Image } from "react-native";
import { useEffect, useState } from "react";
import { TouchableOpacity } from 'react-native';

// Default component that will get called by app.js
// Prop "navigation" is added through app.js when using navigation component.
export default function HomeScreen({ navigation }) {
  //State holding the movie data
  const [data, setData] = useState(null);


  //Async to avoid callback hell 
  useEffect(() => {
    async function fetchMovies() {
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
      
      <Text style={styles.caTitle}>Popular movies</Text>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        initialNumToRender={10}
        />
      
      <Text style={styles.caTitle}>Discover</Text>
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
  <TouchableOpacity style={styles.item} 
  onPress={() =>
    navigation.navigate("MovDetails", {
      id: movieId,
    })
  }
  >
    <View style={{flex:1}}>
    <Image style={styles.image} source={{uri: "https://image.tmdb.org/t/p/w500" + image}} />
    <View style={{flex:1, flexGrow:1}}>
    <Text numberOfLines={1}
      style={styles.title}
    >
      {title}
    </Text>
    </View>
    </View>
    
  </TouchableOpacity>
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
  },
  item: {
    backgroundColor: "#1a1a1a",
    marginHorizontal: 16,
    //height: 250,
    //width: 200,
    flex: 1,

  },
  title: {
    color: "white",
    textAlign: 'center',
    fontSize: 16,
    flex: 1,
    flexWrap: 'wrap',
    flexShrink: 1,
    maxWidth: 150,
    marginTop: 5,

  },
  caTitle: {
    color: "white",
    fontSize: 25,
    marginBottom: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 15,
  },

  image: {
    flex: 3,
    //height: 250,
    width: 150,
    resizeMode: "cover",
    alignItems: 'center',
    justifyContent: "center",

    
  }
}); 
