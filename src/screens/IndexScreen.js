import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native'

const IndexScreen = ({ navigation }) => {
  return (
    <View>
      <Text>IndexScreen</Text>
      <Button
        title="Create Game"
        onPress={() => navigation.navigate("Host")}
      />
      <Button
        title="Join a New Game"
        onPress={() => navigation.navigate("Join")}
      />
      <Button
        title="Re-join a Game"
        onPress={() => navigation.navigate("Join")}
      />
      <Button
        title="Go to Name Screen (development only)"
        onPress={() => navigation.navigate("Name", { simpleKey: "RZSVRL" })}
      />
      <Button
        title="Go to Seed Screen (development only)"
        onPress={() => navigation.navigate("Seed")}
      />
    </View>
  )
}

const styles = StyleSheet.create({})

export default IndexScreen