import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native'

const CreateScreen = ({ navigation }) => {
  return (
    <View>
      <Button
        title="Host a Game"
        onPress={() => navigation.navigate("Host")}
      />
      <Button
        title="Join a Game"
        onPress={() => navigation.navigate("Join")}
      />
    </View>
  )
}

const styles = StyleSheet.create({})

export default CreateScreen