import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useKeyWordStore } from '../store/keyWordStore'

type Props = {}

const Test = (props: Props) => {
    // const fetchKeyWords = useKeyWordStore((state)=> state.fetchKeyWords)
    const addKeyword = useKeyWordStore((state)=> state.addKeyword)
    const keywords = useKeyWordStore((state)=> state.keywords)


    const [currecntKeyWord,setCurrentValue] = useState('')

    useEffect(()=>{
        // fetchKeyWords()
        console.log(keywords)
    },[])
    
  return (
    <SafeAreaView>
        <View>
        <Text>Test</Text>
        <TextInput
            value={currecntKeyWord}
            onChangeText={(text)=>setCurrentValue(text)}
            placeholder='Keyword'
            style={styles.textInput}
        />
        <Pressable style={styles.button}
            onPress={()=> {
                addKeyword(currecntKeyWord,1)
                setCurrentValue('')
            }}>
            <Text>Add</Text>
        </Pressable>
        </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    textInput: {
        borderWidth: 1,
        borderColor: 'black',
        height: 40,
        margin: 10,
        padding: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    button: {
        height: 40,
        margin: 10,
        padding: 10, 
        backgroundColor: 'blue', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Test
