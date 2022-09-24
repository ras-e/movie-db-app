import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainAppNavigator, SearchNavigator } from "./AppNavigator";

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
      <Tab.Screen name='Home' component={MainAppNavigator} />
      <Tab.Screen name="Search" component={SearchNavigator} />
    </Tab.Navigator>
  );
};