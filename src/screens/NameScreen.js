import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList } from 'react-native'
import { useFirestore } from '../firebase/firestore'
import { useGetGame } from '../hooks/useGetGame'
import * as firebase from 'firebase'
import { random } from 'lodash'
import { each } from 'async'

const NameScreen = ({ navigation }) => {
  const simpleKey = navigation.getParam("simpleKey")
  const dataGame = navigation.getParam("dataGame")
  const [name, setName] = useState("")
  const [passkey, setPasskey] = useState("")
  const [game, setGame] = useState({})
  const [prompts, setPrompts] = useState([])


  useGetGame(dataGame, setGame)

  const { documentSnapshots: dataPrompt, collectionRef: promptRef } = useFirestore("prompts")

  async function handleSubmit(name, passkey, navigateCB) {
    console.log("pre prompt")
    // await getPromptsCB()
    console.log("post prompt, pre data")
    const data = { name, secretKey: passkey, goals: prompts }
    await dataGame[0].ref.update({
      players: firebase.firestore.FieldValue.arrayUnion(data)
    }).catch((err) => {
      if (err) throw err;
    })
    console.log("post update, pre navigate")
    navigateCB()
    console.log("post navigate")
  }

  async function getPrompts() {
    setPrompts([])
    let ids = []
    for (let i = 0; i < 5; i++) {
      let randomNumber = random(1, 99)
      if (!ids.includes(randomNumber)) {
        ids.push(randomNumber)
      } else {
        i--
      }

    }

    let dbPrompts = []
    each(ids,
      async id => {
        const dbPrompt = await promptRef.doc(`${id}`).get()
        dbPrompts.push({ goalName: await dbPrompt.get("prompt"), isCompleted: false })
        // console.log(dbPrompts, dbPrompts.length)
        if (dbPrompts.length === 5) {
          setPrompts(dbPrompts)
          console.log(prompts)
        }
      },
      err => { if (err) console.log(err) })
  }

  useEffect(() => {
    getPrompts()
  }, [promptRef])

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
      {prompts.length === 5 && <Button
        title="Submit"
        onPress={() => {
          console.log("pre handleSubmit()")
          handleSubmit(
            name,
            passkey,
            () => navigation.navigate("Game", { simpleKey, name, masterGoal: game.masterGoal }))
        }
        }
      />}
      {/* <Button
        title="get prompts (development only)"
        onPress={() => getPrompts()}
      /> */}
      <FlatList
        data={prompts}
        keyExtractor={(prompt) => prompt.goalName}
        renderItem={({ item }) => (
          <Text>{item.goalName}</Text>
        )}
      />
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