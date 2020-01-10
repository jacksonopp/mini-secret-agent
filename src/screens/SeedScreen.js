import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native'
import { useFirestore } from '../firebase/firestore'

const SeedScreen = () => {

  const { collectionRef: dataRef } = useFirestore("prompts")


  async function uploadData() {
    const data = []
    for (let i = 0; i < 100; i++) {
      data.push({ prompt: `prompt ${i}` })
    }
    console.log('pre upload')
    await data.forEach((item, i) => dataRef.doc(`${i}`).set(item))
    console.log('post upload')
  }

  return (
    <View>
      <Button
        title="seed"
        onPress={() => uploadData()}
      />
    </View>
  )
}

const styles = StyleSheet.create({})

export default SeedScreen