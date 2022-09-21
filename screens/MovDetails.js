import * as React from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import { useEffect, useState } from "react";


export default function MovDetails({route}) {
  const {id} = route.params
  console.log(id)

  //State holding the movie data
  const [data, setData] = useState(null);

  //Async to avoid callback hell 
  useEffect(() => {
    async function fetchDetails() {

      const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=40877d5afcb8d5e8fd6232a1d1569c32`)
      const data = await res.json()

      setData(data)
    }

    fetchDetails();
    
  }, []);

  if (data === null) {

  return(  
   <ActivityIndicator>

   </ActivityIndicator>
  )
  }
  else {
    
    return (
    <View>
      <Image style={styles.image} source={{uri:  "https://image.tmdb.org/t/p/w500" + data.backdrop_path}}></Image>
      <Image style={styles.image} source={{uri:  "https://image.tmdb.org/t/p/w500" + data.poster_path}}></Image>
      <Text> {data.title} </Text>
      <Text> {data.vote_average} </Text>
      <Text> {data.release_date} </Text>
      <Text> {data.overview} </Text>
      <Text>MovDetails</Text>
    </View>
  )
    }
}

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
    fontSize: 32,
    flex: 1,
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  image: {
    height: 300,
    width: 150, 
  }
}); 