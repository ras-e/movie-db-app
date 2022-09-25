import * as React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Image, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { TouchableOpacity } from 'react-native';
import { Star } from 'react-native-feather'

// Default component that will get called by app.js
// Prop "navigation" is added through app.js when using navigation component.
export default function HomeScreen({ navigation }) {
  
  //States holding the data JSON data
  const [data, setData] = useState(null);
  const [theater_data, setTheater] = useState(null);
  const [trending_data, setTrending] = useState(null);
  const [top_data, setTop] = useState(null);

  //Async to avoid callback hell 
  //Fetching popular movies
  useEffect(() => {
    async function fetchMovies() {
      const res = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=40877d5afcb8d5e8fd6232a1d1569c32') 
      const data = await res.json()
      console.log(data)
      setData(data.results)
    }
    fetchMovies();
  }, []);

  //Fetching movies in theaters
  useEffect(() => {
    async function fetchInTheaters() {
      const theater_wait = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=40877d5afcb8d5e8fd6232a1d1569c32&page=1')
      const theater_data = await theater_wait.json()
      setTheater(theater_data.results)
    }
    fetchInTheaters();
    
  }, []);
  //Fetching trending movies (past 7 days)
  useEffect(() => {
    async function fetchTrending() {
      const trending_wait = await fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=40877d5afcb8d5e8fd6232a1d1569c32&page=1')
      const trending_data = await trending_wait.json()
      setTrending(trending_data.results)
    }
    fetchTrending();
  }, []);

  //Fetching top rated movies
  useEffect(() => {
    async function fetchTop() {
      const top_wait = await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=40877d5afcb8d5e8fd6232a1d1569c32&page=1')
      const top_data = await top_wait.json()
      setTop(top_data.results)
    }
    fetchTop(); 
  }, []);

  //Render function which returns the Item component
  const renderItem = ({ item }) => (
    <Item navigation={navigation} movieId={item.id} title={item.title} image={item.poster_path} vote_avg={item.vote_average} 
    />
  );

  //Returns flatlists nested inside of a Scrollview
   // We want the categories rendered first
   // Flatlist is used as we only want to render what can be seen
  return (
    //Scrollview to render all children 
    <SafeAreaView style={styles.container}>
      <ScrollView>

        <View>
          <Text style={styles.caTitle}>
            Currently in theaters</Text>
          <FlatList
            data={theater_data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            initialNumToRender={10}
           />
        </View> 
        
        <View> 
          <Text style={styles.caTitle}>
            Popular movies</Text>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            initialNumToRender={10}
          />
        </View>

        <View>
          <Text style={styles.caTitle}>
            Top rated</Text>
          <FlatList
            data={top_data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            initialNumToRender={10}
            />
        </View> 

        <View>
          <Text style={styles.caTitle}>
            Trending this week</Text>
          <FlatList
            data={trending_data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            initialNumToRender={10}
          />
        </View>

      </ScrollView>      
    </SafeAreaView>
    );
  }

  //Properties that will follow when navigated to the Movie Details screen
const Item = ({ navigation, title, movieId, image, vote_avg}) => (
  //Check properties
  <SafeAreaView>
    <TouchableOpacity style={styles.item} 
      onPress={() =>
        navigation.navigate("MovDetails", {
          id: movieId,
        })
      }
      >
 
    <View style={{flex:1}}>
      <Image style={styles.image} source={{uri: "https://image.tmdb.org/t/p/w500" + image}} />
      
      <View style={{flex:1}}>
        <Text numberOfLines={1}
          style={styles.title} >
            {title}
        </Text>
      

        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 10}}>
          <Star stroke="#f5c518" fill="#f5c518" width={16} height={16} />
        <Text style={{color: "white"}}> {vote_avg} </Text>
        </View>
      </View>
    </View>

    </TouchableOpacity>
  </SafeAreaView>
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
    height: 300,
    flex: 1,
  },

  title: {
    color: "white",
    textAlign: 'center',
    fontSize: 16,
    maxWidth: 150,
    marginTop: 10,
    fontWeight: "bold",
  },

  caTitle: {
    color: "#EE8E28",
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
  },
  }
); 
