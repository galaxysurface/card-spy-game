import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

type Props = {
    title: string,
    onPressFun?: ()=> void
}

const PressableButton = ({
    title,
    onPressFun
}: Props) => {

  
  return (
    <Pressable
      style={styles.container}
      onPress={onPressFun}>
     <Text>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#cac',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 10,
    margin: 5
  },
  text: {

  }
})

export default PressableButton
