import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { useFirestore } from '../firebase/firestore'

const GameScreen = ({ navigation }) => {
  const simpleKeyID = navigation.getParam("simpleKey")
  const [game, setGame] = useState({})
  const { documentSnapshots: dataGame, collectionRef: dataRef } = useFirestore("games", { where: ["simpleKey", "==", simpleKeyID] })

  useEffect(() => {
    const game = dataGame[0] ? dataGame[0].data() : {} // this gets a single game
    setGame(game)
  }, [dataGame, dataRef])

  return (
    <View>
      <Text>GameScreen</Text>
      <Text>Game Name</Text>
      <Text>{game.gameName}</Text>
      <Text>Host Name</Text>
      <Text>{game.hostName}</Text>
      <Text>Num of Players </Text>
      <Text>{game.numOfPlayers}</Text>
      <Text>simple Key</Text>
      <Text>{game.simpleKey}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})

export default GameScreen