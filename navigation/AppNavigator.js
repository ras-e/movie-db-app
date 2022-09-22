import React from "react";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import MovDetails from "../screens/MovDetails";
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();

const MainAppNavigator = () => {
  return (
    <Stack.Navigator 
> 
        <Stack.Screen name="Homepage" component={HomeScreen}
         />
        <Stack.Screen name="Search" component={SearchScreen}
        />
        <Stack.Screen name="MovDetails" component={MovDetails}
        options={{ title: 'Details of the movie' }}
        />     
    </Stack.Navigator>
  );
}

const SearchNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: true}}
            >
            <Stack.Screen name="Search movie" component={SearchScreen} />
        </Stack.Navigator>
    );
}

export { MainAppNavigator, SearchNavigator };

