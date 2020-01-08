import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import { useFirestore } from '../firebase/firestore'
import { useGetGame } from '../hooks/useGetGame'

const NameScreen = ({ navigation }) => {
  const simpleKey = navigation.getParam("simpleKey")
  const [game, setGame] = useState({})

  const { documentSnapshots: dataGame, collectionRef: dataRef } = useFirestore("game", { where: ["simpleKey", "==", simpleKey] })

  useEffect(() => {
    useGetGame(dataGame, setGame)
  }, [dataGame, dataRef])

  return (
    <View>
      <Text>NameScreen</Text>
      <Text>{simpleKey}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})

export default NameScreen