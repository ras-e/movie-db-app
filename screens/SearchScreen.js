import { StyleSheet, View, SafeAreaView, TextInput, FlatList, Image, Text } from 'react-native';
import * as React from 'react';
import { useEffect, useState } from "react";
import { TouchableOpacity } from 'react-native';



export default function SearchScreen({ navigation }) {  
  
  const [movies, setData] = useState(null);
  const [search, setSearch] = useState("");

  //Async to avoid callback hell 
  
  useEffect(() => {
    async function fetchMovies() {
      const mov = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=40877d5afcb8d5e8fd6232a1d1569c32`)

      console.log(mov) 
      
      const movies = await mov.json()
      console.log(movies)
  
      setData(movies.results)
    }

    fetchMovies();
  }, []);

  
  useEffect(() => {
     async function searchMovies() {

       if(search === '') {
          return 
      }
  
      const filter = await fetch(`https://api.themoviedb.org/3/search/movie?query=${search}&api_key=40877d5afcb8d5e8fd6232a1d1569c32`)
      console.log(filter)

      const movSearch = await filter.json()
      console.log(search)
  
      setData(movSearch.results)
    }

    searchMovies();
  }, [search]); 
  

  const renderItem = ({ item }) => (
    <Item navigation={navigation} movieId={item.id} title={item.title} image={item.poster_path} />
  );


  return (
    <SafeAreaView>
      <View style={{flex : 1, justifyContent : 'center', alignItems : 'center'}}>
        <TextInput value={search}
          placeholder="Search for a movie"
          placeholderTextColor="black"
          onChangeText={text => setSearch(text)}
          style={{
            height: 50,
            paddingLeft: 10,
            fontSize: 15,
            backgroundColor: "Grey",
            borderColor: "black", 
            margin:10, 
            borderRadius:10,
            borderWidth: 1
          }}
        />
      </View>

      <FlatList
      data={movies}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}

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
        <Image style={styles.image} source={{uri: "https://image.tmdb.org/t/p/w500" + image }} />
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
    backgroundColor: "#fff",
    justifyContent: "center",
    
  },
  item: {
    backgroundColor: "#EEE",
    //marginVertical: 8,
    marginHorizontal: 16,
    //height: 350,
    //width: 200,
    flex: 1,
    

  },
  title: {
    textAlign: 'center',
    fontSize: 16,
    flex: 1,
    flexWrap: 'wrap',
    flexShrink: 1,
    maxWidth: 150,
   
  },
  image: {
    flex: 5,
    height: 250,
    width: 150,
    resizeMode: "cover",
    alignItems: 'center',
    justifyContent: "center",

    
  }
}); 