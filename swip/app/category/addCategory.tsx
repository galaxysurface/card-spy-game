import { Pressable, SafeAreaView, StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router'
import { useCatgeoryStore } from '../../store/categoryStore'

type Props = {}

const AddCategory = (props: Props) => {
    const [category, setCategory] = useState('')
    const addCategory = useCatgeoryStore((state) => state.addCategory)

  return (
    <SafeAreaView>
      <Text>CategoryView</Text>
    <View style={styles.container}>

      <View>
        <TextInput 
            value={category}
            onChangeText={(text) => {setCategory(text)}
        }
        placeholder='Enter Category'
        style={{
            borderWidth: 1,
            borderColor: 'black',
            padding: 10,
            margin: 10,
        }}
        />
      </View>
      <Pressable 
        style={{
            padding: 20,
            margin: 10,
            backgroundColor: '#1ca'
        }}
        onPress={() => {
          addCategory(category)
          router.dismiss()
          
          }}>
        <Text>Add new Category</Text>
      </Pressable>
        </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    container: {
        padding: 20
    }
})

export default AddCategory
