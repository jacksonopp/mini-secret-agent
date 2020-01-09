import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import { useFirestore } from '../firebase/firestore'
import { useGetGame } from '../hooks/useGetGame'
import * as firebase from 'firebase'

const NameScreen = ({ navigation }) => {
  const simpleKey = navigation.getParam("simpleKey")
  const dataGame = navigation.getParam("dataGame")
  const [name, setName] = useState("")
  const [passkey, setPasskey] = useState("")
  const [game, setGame] = useState({})

  useGetGame(dataGame, setGame)

  console.log("blah:", dataGame[0].exists)

  // const { documentSnapshots: dataGame, collectionRef: dataRef } = useFirestore("game", { where: ["simpleKey", "==", simpleKey] })

  async function handleSubmit(name, passkey) {
    const data = { name, secretKey: passkey }
    console.log('pre-update', data)
    await dataGame[0].ref.update({
      players: firebase.firestore.FieldValue.arrayUnion(data)
    })
    console.log('post-update')
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
      <Button
        title="Submit"
        onPress={() => handleSubmit(name, passkey)}
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