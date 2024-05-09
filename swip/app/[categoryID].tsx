import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams } from 'expo-router'
import { useKeyWordStore } from '../store/keyWordStore'
import { filterKeywordByCategoryID } from '../utils/utils'
import { getPathDataFromState } from 'expo-router/build/fork/getPathFromState'
import HeaderModel from './components/HeaderModel'

type Props = {}

const CatgeoryDetails = (props: Props) => {

    const { categoryID,categoryName } = useLocalSearchParams();

    const [currentkeyword, setCurrentKeyword] = useState<string>(null)

    const addKeyword = useKeyWordStore((state) => state.addKeyword)
    const fetchKeyWords = useKeyWordStore((state) => state.fetchKeyWords)
    const keyWordByCategroy = useKeyWordStore((state) => state.keyWordByCategroy)
    const removeKeywordByid = useKeyWordStore((state) => state.removeKeywordByid)


    useEffect(() => {
        fetchKeyWords()
    },[])
    
  return (
    <SafeAreaView>
        <View style={ styles.container }>
        <HeaderModel title={`${categoryName}`} subTitle='Catgeory'/>
        <TextInput 
            value={currentkeyword}
            placeholder='add new word'
            onChangeText={(txt)=>setCurrentKeyword(txt)}
            style={styles.textInput}
            />
            <Pressable 
                onPress={() => {
                    addKeyword(currentkeyword,categoryID)
                    setCurrentKeyword('')
                }}
                style={ styles.addButton }>
                <Text style={{color: 'white'}}>Add word</Text>
            </Pressable>

            {/* {keyWordByCategroy && keyWordByCategroy.map((keyWord,index)=>(
                <View key={index}>
                    <Text>
                        {keyWord.keyWord}
                    </Text>
                    <Pressable 
                        style={[styles.addButton,{flexDirection:'row',}]}
                        onPress={()=> removeKeywordByid(keyWord.categoryID)}>
                        <Text>Delete</Text>
                    </Pressable>
                </View>
            ))} */}
            {keyWordByCategroy && keyWordByCategroy.map((item) =>{
                return (
                    <View key={item.keyWordID}>
                        <Text>{item.keyWord}</Text>
                        <Pressable onPress={()=> removeKeywordByid(item.keyWordID)}>
                            <Text>delete</Text>
                        </Pressable>
                    </View>
                )
            })}
        </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'black',
        width: '100%',
        height: 40,
        padding: 10,
        marginVertical: 10
    },
    addButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default CatgeoryDetails
