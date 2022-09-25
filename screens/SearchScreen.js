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
      
      if(search !== '') {
        return 
    }
      const mov = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=40877d5afcb8d5e8fd6232a1d1569c32`)
      
      const movies = await mov.json()
  
      setData(movies.results)
    }
    fetchMovies();
  }, [search]);

  
  useEffect(() => {
     async function searchMovies() {

       if(search === '') {
          return 
      }
  
      const filter = await fetch(`https://api.themoviedb.org/3/search/movie?query=${search}&api_key=40877d5afcb8d5e8fd6232a1d1569c32`)

      const movSearch = await filter.json()
      
      setData(movSearch.results)
    }

    searchMovies();
  }, [search]); 
  

  const renderItem = ({ item }) => (
    <Item navigation={navigation} movieId={item.id} title={item.title} image={item.poster_path} />
  );

  return (
    <SafeAreaView style={{backgroundColor: "#121212"}}>
      <View style={styles.searchBar}>
        <TextInput value={search}
          placeholder="Search for a movie"
          placeholderTextColor=""
          onChangeText={text => setSearch(text)}
          style={styles.textSearchBar }
        />
      </View>

      <FlatList 
        data={movies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        //Dismiss keyboard when dragging downwards
        keyboardDismissMode='on-drag'
      />
    </SafeAreaView>  
    );
  }

  //Passes properties to the object
  const Item = ({ navigation, title, movieId, image }) => (
    //Check properties
    <SafeAreaView >
      <TouchableOpacity style={styles.item} 
        onPress={() =>
          navigation.navigate("MovDetails", {
            id: movieId,
        })
      }
      >
        <View style={{flex:1, backgroundColor: "#1a1a1a", marginBottom: 20}}>
        <Image 
          style={styles.image}
          loadingIndicatorSource 
          source=
            {{uri: "https://image.tmdb.org/t/p/w500" + image }} />
      
          <View style={{flex:1, flexGrow:1, marginBottom: 20,}}>
            <Text numberOfLines={1} style={styles.title} >{title}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>  
  );  



const styles = StyleSheet.create({
  container: {
    margin: 15,
    alignItems: "center",
    width: "90%",
    justifyContent: "center",
  },

  item: {
    backgroundColor: "#121212",
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
  },

  title: {
    color: "white",
    textAlign: 'center',
    fontSize: 24,
    flex: 1,
    flexWrap: 'wrap',
    flexShrink: 1,
    maxWidth: 150,
    marginTop: 5,
  },

  image: {
    flex: 5,
    height: 250,
    width: 150,
    resizeMode: "cover",
    alignItems: 'center',
    justifyContent: "center",
    marginBottom: 10,
  },
  searchBar: {
    marginTop: 20, 
    marginBottom: 25, 
    justifyContent: 'center', 
    alignItems : 'center', 
    flexDirection: "row"
  },

  textSearchBar: {
    height: 50,
    width: 250,
    paddingLeft: 10,
    fontSize: 15,
    backgroundColor: "white",
    borderColor: "white",  
    borderRadius:20,
    borderWidth: 1,
  }
  }
); 