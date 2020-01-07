import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native'

const IndexScreen = ({ navigation }) => {
  return (
    <View>
      <Text>IndexScreen</Text>
      <Button
        title="Create Game"
        onPress={() => navigation.navigate("Create")}
      />
    </View>
  )
}

const styles = StyleSheet.create({})

export default IndexScreen