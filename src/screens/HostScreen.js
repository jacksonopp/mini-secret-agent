import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native'

const HostScreen = () => {
  const [gameName, setGameName] = useState("")

  return (
    <View style={styles.viewStyle}>
      <Text style={styles.titleStyle}>Name your game:</Text>
      <TextInput
        style={styles.inputStyle}
        value={gameName}
        onChangeText={(newName) => setGameName(newName)}
        autoCorrect={false}
        autoCapitalize="none"
      />
      <Text>{gameName}</Text>
      <Button
        title="Submit"
        onPress={() => {
          console.log(gameName)

        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  inputStyle: {
    borderWidth: 1,
    borderColor: 'black',
    fontSize: 18,
    padding: 10
  },
  viewStyle: {
    paddingHorizontal: 10
  },
  titleStyle: {
    marginVertical: 10
  }
})

export default HostScreen