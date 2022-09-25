import * as React from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator, SafeAreaView } from 'react-native'
import { useEffect, useState } from "react";
import * as Icon from 'react-native-feather';


export default function MovDetails({ route}) {
  const {id} = route.params
  
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
   <ActivityIndicator style={styles.loading}
   animating="true"
   color="green"
   size="large"
   >

   </ActivityIndicator>
  )
  }
  else {
    
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <View style={{flexDirection: 'row'}}>
            <Image style={styles.image} source={{uri:  "https://image.tmdb.org/t/p/w500" + data.poster_path}}></Image>
            <Image style={styles.image} source={{uri:  "https://image.tmdb.org/t/p/w500" + data.backdrop_path}}></Image>
          </View>
      
          
          <View>
            <Text style={{fontSize: 36, fontWeight: "bold", color: "#FF5733", marginBottom: 15}}> 
            {data.title} </Text>
          </View>
        
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 5}}> 
            <Icon.Star stroke="#f5c518" fill="#f5c518" width={16} height={16} />
            <Text style={{color:"white", fontWeight: "bold",}}> {data.vote_average}</Text>
          </View>

          <View style={{marginBottom: 20}} >
            <Text style={{color:"white", fontWeight: "bold"}}> Release date: {data.release_date} </Text>
          </View>

   

          <View style={{ paddingHorizontal:10, marginBottom: 20, marginStart:15 }}>
            <Text style= {{fontSize: 12, lineHeight: 25, marginBottom: 10, color: "white" }}> 
            {data.overview} 
            </Text>
          </View>
        </View>
    </SafeAreaView>
  )
    }
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
  },

  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
  },

  title: {
    fontSize: 32,
    flex: 1,
    flexWrap: 'wrap',
    flexShrink: 1,
    color: "white",
  
  },
  image: {
    height: 300,
    width: 150, 
    marginBottom: 10,
    marginTop: 10,
    
  },
  loading: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  }
}); 