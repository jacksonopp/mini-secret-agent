import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import { useFirestore } from '../firebase/firestore';
import { random } from 'lodash'
import { useModel } from '../hooks/useModel'

const HostScreen = ({ navigation }) => {
  const [gameName, setGameName] = useState("");
  const [hostName, setHostName] = useState("");
  const [numOfPlayers, setNumOfPlayers] = useState(0);
  const [dataGame, setDataGame] = useState({});

  const { simpleKey, postGame } = useModel()
  const { collectionRef: dataAction } = useFirestore('games', { where: ["simpleKey", "==", simpleKey] })

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
          postGame(gameName, numOfPlayers, navigation.navigate("Name", { simpleKey }))
        }}
      />
      <Text>Your simple key is {simpleKey}</Text>
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