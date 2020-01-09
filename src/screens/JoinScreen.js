import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import { useFirestore } from '../firebase/firestore'
import { useGetGame } from '../hooks/useGetGame'

const JoinScreen = ({ navigation }) => {
  const [gameKey, setGameKey] = useState("")
  const [game, setGame] = useState({})
  const [error, setError] = useState("")


  const { documentSnapshots: dataGame, collectionRef: dataRef } = useFirestore("games", { where: ["simpleKey", "==", gameKey] })
  // console.log(game)

  useGetGame(dataGame, setGame)

  return (
    <View>
      <Text>JoinScreen</Text>
      <Text>Enter your game key:</Text>
      <TextInput
        style={styles.inputStyle}
        value={gameKey}
        onChangeText={(newValue) => setGameKey(newValue)}
        autoCapitalize="characters"
        autoCorrect={false}
        returnKeyType="done"
      />
      <Text>{error}</Text>
      <Button
        title="Submit"
        onPress={() => {
          console.log("click")
          game.message !== "invalid key" ?
            navigation.navigate("Name", { simpleKey: gameKey, game, dataGame })
            : setError("Please enter a valid key")
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  inputStyle: {
    borderWidth: 1,
    borderColor: "black"
  }
})

export default JoinScreen