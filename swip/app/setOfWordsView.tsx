import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

type Props = {}

const SetOfWordsView = (props: Props) => {
  return (
    <View>
      <Text>SetOfWords</Text>
      <Pressable
        onPress={() =>router.back()}>
        <Text>Back</Text>
      </Pressable>
    </View>
  )
}
const styles = StyleSheet.create({})

export default SetOfWordsView
