import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainAppNavigator, SearchNavigator } from "./AppNavigator";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator () {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={MainAppNavigator} />
      <Tab.Screen name="Search" component={SearchNavigator} />
    </Tab.Navigator>
  );
};