import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

import { Ionicons } from '@expo/vector-icons';

type Props = {
    title: string,
    link?: string,
    subTitle?: string
}

const HeaderModel = ({
    title,
    link,
    subTitle
}: Props) => {
  return (
    <View style={styles.header}>
     <View>
    {subTitle && (<Text style={styles.subTitle}>{subTitle}</Text>)}
    <Text>{title}</Text>
    </View>   
    <Pressable
      onPress={()=> router.dismiss()}>
      <Ionicons name="close-circle-outline" size={42} color="black" />
    </Pressable>
  </View>
  )
}
const styles = StyleSheet.create({
    header: {
        padding: 16,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
      },
      subTitle: {
        fontSize: 11,
        fontWeight: '300'
      }
})

export default HeaderModel
