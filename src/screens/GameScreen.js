import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { useFirestore } from '../firebase/firestore'
import { useGetGame } from '../hooks/useGetGame'
import { random } from 'lodash'


const GameScreen = ({ navigation }) => {
  // const simpleKeyID = navigation.getParam("simpleKey")
  const [game, setGame] = useState({})
  const { documentSnapshots: dataGame, collectionRef: dataRef } = useFirestore("games", { where: ["simpleKey", "==", "MBRMRW"] })
  console.log(game)

  useGetGame(dataGame, setGame)

  return (
    <View>
      <Text>GameScreen</Text>
      <Text>Simple Key - {game.simpleKey}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})

export default GameScreen