import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native'

const IndexScreen = ({ navigation }) => {
  return (
    <View>
      <Text>IndexScreen</Text>
      <Button
        title="Create Game"
        onPress={() => navigation.navigate("Create")}
      />
      <Button
        title="Join a Game"
        onPress={() => navigation.navigate("Join")}
      />
      <Button
        title="Go to Name Screen (development only)"
        onPress={() => navigation.navigate("Name", { simpleKey: "RZSVRL" })}
      />
    </View>
  )
}

const styles = StyleSheet.create({})

export default IndexScreen