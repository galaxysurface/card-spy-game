import { View, Text, Pressable, SafeAreaView, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { router } from 'expo-router'
import { useCatgeoryStore } from '../../store/categoryStore'
import CategoryItem from '../components/CategoryItem'
import { useKeyWordStore } from '../../store/keyWordStore'
import { deleteAllWords, selectAllWords } from '../../database/db'

const index = () => {
  const setCategory =useCatgeoryStore((state) => state.setCategory)
  const categoryList =useCatgeoryStore((state) => state.category)
  // const fetchKeyWords =useKeyWordStore((state) => state.fetchKeyWords)

 

  useEffect(()=>{
    setCategory()
    // fetchKeyWords()
  },[])

  return (
    <SafeAreaView>
      <View>

      <Text>CategoryView</Text>
      <Pressable 
        onPress={() => router.push('category/addCategory')}>
        <Text>Add Category</Text>
      </Pressable>
      <Pressable 
        onPress={()=> deleteAllWords()}>
        <Text>Delete All keywords</Text>
      </Pressable>

    <View style={styles.categoryList}>
      {categoryList && categoryList.map((category) => (
        <CategoryItem key={category.categoryID} category={category} />
      ))}
    </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  categoryList: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row', // Arrange items in rows
    flexWrap: 'wrap',  
    gap: 2
  }
})
export default index