import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const {width: widthScreen, height: heightScreen} = Dimensions.get('window')


type Props = {
    title: string,
    link: string,
    onPressFun?: ()=> void
}

const Button = ({link, title, onPressFun}: Props) => {
  return (
    <Pressable
        onPress={() =>{
          
          router.push(link)
          onPressFun && onPressFun()
        }}
        style={styles.btnStart}>
            <Text>{title}</Text>
    </Pressable>
  )
}
const styles = StyleSheet.create({
    btnStart: {
        width: widthScreen * .8,
        height: heightScreen * .1,
        backgroundColor: '#cca',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
      }
})

export default Button
