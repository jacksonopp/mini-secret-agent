import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { useFirestore } from '../firebase/firestore'
import { useGetGame } from '../hooks/useGetGame'
import { random } from 'lodash'


const GameScreen = ({ navigation }) => {
  const simpleKey = navigation.getParam("simpleKey")
  const playerName = navigation.getParam("name")
  const [game, setGame] = useState({})
  const { documentSnapshots: dataGame, collectionRef: dataRef } = useFirestore("games", { where: ["simpleKey", "==", simpleKey] })
  console.log(game)

  useGetGame(dataGame, setGame)

  return (
    <View>
      <Text>GameScreen</Text>
      <Text>Simple Key - {game.simpleKey}</Text>
      <Text>Player Name - {playerName}</Text>
      <Text>Master Goal - {game.masterGoal}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})

export default GameScreen