import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList } from 'react-native'
import { useFirestore } from '../firebase/firestore'
import { useGetGame } from '../hooks/useGetGame'
import * as firebase from 'firebase'
import { random } from 'lodash'
import { each } from 'async'
import { useGetPrompts } from '../hooks/useGetPrompts'

const NameScreen = ({ navigation }) => {
  const simpleKey = navigation.getParam("simpleKey")
  const [name, setName] = useState("")
  const [passkey, setPasskey] = useState("")
  const [game, setGame] = useState({})

  const { documentSnapshots: dataGame, collectionRef: gameRef } = useFirestore("games", { where: ["simpleKey", "==", simpleKey] })
  const { prompts } = useGetPrompts()


  useGetGame(dataGame, setGame)

  const { documentSnapshots: dataPrompt, collectionRef: promptRef } = useFirestore("prompts")

  async function handleSubmit(name, passkey, navigateCB) {
    // await getPromptsCB()
    const data = { name, secretKey: passkey, goals: prompts }
    await dataGame[0].ref.update({
      players: firebase.firestore.FieldValue.arrayUnion(data)
    }).catch((err) => {
      if (err) console.log(err);
    })
    navigateCB()
  }



  return (
    <View>
      <Text>NameScreen</Text>
      <Text>{simpleKey}</Text>
      <Text>Your name:</Text>
      <TextInput
        style={styles.inputStyle}
        value={name}
        onChangeText={(newValue) => setName(newValue)}
        returnKeyType="next"
      />
      <Text>{name}</Text>
      <Text>Your personal game key:</Text>
      <TextInput
        style={styles.inputStyle}
        value={passkey}
        onChangeText={(newValue) => setPasskey(newValue)}
        returnKeyType="done"
      />
      <Text>{passkey}</Text>
      {prompts.length === 5 ? <Button
        title="Join Game"
        onPress={() => {
          console.log("pre handleSubmit()")
          handleSubmit(
            name,
            passkey,
            () => navigation.navigate("Game", { simpleKey, name, masterGoal: game.masterGoal }))
        }
        }
      />
        : <Button title="Fetching game..." />
      }
      {/* <FlatList
        data={prompts}
        keyExtractor={(prompt) => prompt.goalName}
        renderItem={({ item }) => (
          <Text>{item.goalName}</Text>
        )}
      /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  inputStyle: {
    borderColor: "black",
    borderWidth: 1
  }
})

export default NameScreen