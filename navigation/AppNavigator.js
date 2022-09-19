import React from "react";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import WatchlistScreen from "../screens/WatchlistScreen";
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();

const MainAppNavigator = () => {
  return (
    <Stack.Navigator> 
        <Stack.Screen
            name="Home"
            component={HomeScreen}
         />
        <Stack.Screen
            name="Search"
            component={SearchScreen}
        />
        <Stack.Screen
            name="Watchlist"
            component={WatchlistScreen}
        />    
    </Stack.Navigator>
  );
}

const SearchNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Search" component={SearchScreen} />
        </Stack.Navigator>
    );
}

export { MainAppNavigator, SearchNavigator };

