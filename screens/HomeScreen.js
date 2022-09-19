import * as React from 'react';

import { View, Text, StyleSheet } from "react-native";
import { Button } from 'react-native-web';

// Default component that will get called by app.js
// Prop "navigation" is added through app.js when using navigation component.
export default function HomeScreen({ navigation }) {
    return (
    <View>
      <Button
        title="Go to search"
       />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  item: {
    backgroundColor: "#EEE",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
}); 
