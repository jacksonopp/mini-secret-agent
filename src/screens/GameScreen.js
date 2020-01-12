import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { useFirestore } from '../firebase/firestore'
import { useGetGame } from '../hooks/useGetGame'
import { random } from 'lodash'


const GameScreen = ({ navigation }) => {
  // const simpleKey = navigation.getParam("simpleKey");
  // const playerName = navigation.getParam("name");
  // const passkey = navigation.getParam("passkey");
  const { simpleKey, name, passkey, masterGoal } = navigation.getParam("data")
  const [game, setGame] = useState({})
  const [playerGoals, setPlayerGoals] = useState([])
  const { documentSnapshots: dataGame, collectionRef: dataRef } = useFirestore("games", { where: ["simpleKey", "==", simpleKey] })
  // console.log(game)

  useGetGame(dataGame, setGame)

  // get player's goals
  useEffect(() => {
    const player = game ? game.players.filter(player => player.name === name) : [{ goals: 'none' }]
    console.log(player[0].goals)
    setPlayerGoals(player[0].goals)
  }, [dataGame, dataRef])

  return (
    <View>
      <Text>GameScreen</Text>
      <Text>Simple Key - {game.simpleKey}</Text>
      <Text>Player Name - {name}</Text>
      <Text>Master Goal - {game.masterPrompt}</Text>
      <Text>Passkey - {passkey}</Text>
      <FlatList
        data={playerGoals}
        keyExtractor={player => player.goalName}
        renderItem={({ item }) => (
          <View style={item.isCompleted ? styles.completed : styles.notCompleted}>
            <Text>{item.goalName}</Text>
            <Text>{item.isCompleted ? "Completed" : "Not Completed"}</Text>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  completed: {
    backgroundColor: 'rebeccapurple'
  },
  notCompleted: {
    backgroundColor: 'salmon'
  }
})

export default GameScreen