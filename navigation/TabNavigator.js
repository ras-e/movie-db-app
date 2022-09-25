import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainAppNavigator, SearchNavigator } from "./AppNavigator";
import { Home, Search } from 'react-native-feather'

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator () {
  return (
    <Tab.Navigator
      screenOptions={{
        activeTintColor: 'black',
        inactiveTintColor: '#d9d9d9',
        headerShown: false,
        tabBarStyle: {
          borderTopColor: '#66666666',
          backgroundColor: '#121212',
          elevation: 0,
          display: "flex"
        }
      }} >
      
      <Tab.Screen name='Home' component={MainAppNavigator}
        options={{
          tabBarIcon: ({color, size}) => (
          <Home name="Home" color={color} size={size} />
          ),
        }}     
      />

      <Tab.Screen name="Search" component={SearchNavigator} 
        options={{
          tabBarIcon: ({color, size}) => (
            <Search name="Home" color={color} size={size} /> 
          ),
        }}
        />
    </Tab.Navigator>
  );
};