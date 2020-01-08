import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import { useFirestore } from '../firebase/firestore';
import { random } from 'lodash'

const HostScreen = ({ navigation }) => {
  const [gameName, setGameName] = useState("");
  const [hostName, setHostName] = useState("");
  const [numOfPlayers, setNumOfPlayers] = useState(0);
  const [simpleKey, setSimpleKey] = useState("");
  const { collectionRef: dataAction } = useFirestore('games')
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

  useEffect(() => {
    let id = ""
    for (let i = 0; i < 6; i++) {
      id += alphabet.charAt(random(0, 25))
    }
    setSimpleKey(id)
  }, [])

  async function createDefaultGame(simpleKey, cb) {
    console.log("pre-data")
    const data = {
      gameName: "test game",
      hostName: "test host name",
      numOfPlayers: 3,
      simpleKey,
      masterGoal: "master goal",
      players: [
        {
          name: "Jackson",
          secretKey: "jackson",
          goals: [
            {
              goalName: "goal 1",
              isCompleted: false
            },
            {
              goalName: "goal 2",
              isCompleted: false
            },
            {
              goalName: "goal 3",
              isCompleted: false
            },
            {
              goalName: "goal 4",
              isCompleted: false
            },
            {
              goalName: "goal 5",
              isCompleted: false
            }
          ]
        },
        {
          name: "Brian",
          secretKey: "brian",
          goals: [
            {
              goalName: "goal 1",
              isCompleted: false
            },
            {
              goalName: "goal 2",
              isCompleted: false
            },
            {
              goalName: "goal 3",
              isCompleted: false
            },
            {
              goalName: "goal 4",
              isCompleted: false
            },
            {
              goalName: "goal 5",
              isCompleted: false
            }
          ]
        },
      ]
    }
    console.log("post-data pre add()")
    await dataAction.add(data)
    console.log("post-add(), pre-callback")
    cb()
    console.log("post-callback")
  }

  async function createNewGame(gameName, hostName, numOfPlayers, simpleKey, cb) {
    const data = { gameName, hostName, numOfPlayers, simpleKey }
    await dataAction.add(data)
    cb()
  }

  return (
    <View style={styles.viewStyle}>
      <Text style={styles.titleStyle}>Name your game:</Text>
      <TextInput
        style={styles.inputStyle}
        value={gameName}
        onChangeText={(newName) => setGameName(newName)}
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="next"
      />
      <Text>{gameName}</Text>
      <Text style={styles.titleStyle}>What's your name?</Text>
      <TextInput
        style={styles.inputStyle}
        value={hostName}
        onChangeText={(newName) => setHostName(newName)}
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="next"
      />
      <Text>{hostName}</Text>
      <Text style={styles.titleStyle}>How many players?</Text>
      <TextInput
        style={styles.inputStyle}
        value={`${numOfPlayers}`}
        onChangeText={(newName) => setNumOfPlayers(newName)}
        autoCorrect={false}
        autoCapitalize="none"
        keyboardType="number-pad"
        returnKeyType="done"
      />
      <Text>{numOfPlayers}</Text>
      <Button
        title="Submit"
        onPress={() => {
          console.log(gameName)
          createDefaultGame(simpleKey, () => navigation.navigate("Game", { simpleKey }))
          // createNewGame(gameName, hostName, numOfPlayers, simpleKey, () => navigation.navigate("Game", { simpleKey }))
        }}
      />
      <Text>Your game code is {simpleKey}</Text>
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