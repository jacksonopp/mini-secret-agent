import React from 'react';
import { View, Text, StyleSheet } from 'react-native'

const NameScreen = ({navigation}) => {
  const simpleKey = navigation.getParam("simpleKey")
  return (
    <View>
      <Text>NameScreen</Text>
      <Text>{simpleKey}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})

export default NameScreen