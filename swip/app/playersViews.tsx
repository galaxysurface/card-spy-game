import { FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { hp, wp } from '../utils/Metrics'
import PlayerItem from './components/PlayerItem'
import Animated ,{ useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { usePlayerStore } from '../store/playerStore'
import { deleteAllPlayer } from '../database/db'


type Props = {}

const PlayersView = (props: Props) => {

// Players Store
const addPlayerStore = usePlayerStore((state)=> state.addPlayer)
const playersStore = usePlayerStore((state)=> state.players)

  const [isEnabled, setIsEnabled] = useState<boolean>(false)
  const toggleSwitch = () => setIsEnabled(previousState => !previousState)

  const heightBoxField = useSharedValue(hp(0))
  const opacityBoxField = useSharedValue(0)



  useLayoutEffect(() => {
    if(isEnabled){
      heightBoxField.value = withSpring(hp(30))
      opacityBoxField.value = withTiming(1, {duration: 1000})
    }else{
      heightBoxField.value = withTiming(0, {duration: 500})
      opacityBoxField.value = withTiming(0, {duration: 500})
    }

  }, [isEnabled])



  const [textField, setTextFiled] = useState('')
  const handleChange = (text: string) => {
    setTextFiled(text)
  }

  const onAddPlayer = () =>{
    addPlayerStore(textField)
    setTextFiled('')
  }

  const rStyleBoxField = useAnimatedStyle(() =>({
    height: heightBoxField.value,
    opacity: opacityBoxField.value
  }))

  


  return (
    <SafeAreaView>
      <View style={styles.container}>
       
      <Text>Players View</Text>
      <Pressable 
        onPress={() =>router.back()}>
        <Text>Back</Text>
      </Pressable>
        <Animated.View style={[styles.inputFieldContainer, rStyleBoxField]}>
          <TextInput 
            style={[styles.textInput, {opacity: isEnabled ? 1 : 0}]}
            placeholder='Player 1'
            value={textField}
            onChangeText={handleChange} />
        <Pressable 
          onPress={onAddPlayer}
          style={[styles.addButton]}>
        <Text>Add </Text>
        </Pressable>
       </Animated.View>
        <View>
          {
            playersStore.map((player, index) => (
              <PlayerItem key={index} player={player}  />))
            }
        {/* <Animated.FlatList
          keyExtractor={(key) => key.playerID}
          data={playersStore}
          renderItem={
            (player)=> <PlayerItem player={player} />
            }
            /> */}
        </View>
        <View>
        </View>
          {/* FLoad Button */}
          <Pressable
            style={styles.floatButtonPlayer} 
            onPress={()=>{
              heightBoxField.value = hp(20),
              toggleSwitch()
            }}>
            <Text>+</Text>
          </Pressable>
        </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    width: wp(100),
    height: hp(100),
  },
  inputFieldContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
    paddingVertical: 11,

  },
  textInput: {
    width: wp(80),
    paddingHorizontal: 11,
    paddingVertical: 11,
    borderWidth: 2,
    borderColor: '#1cc',
    borderRadius: 20,
  },
  addButton: {
    width: wp(80),
    paddingHorizontal: 11,
    paddingVertical: 11,
    borderRadius: 10,
    backgroundColor: '#cac',
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  floatButtonPlayer: {
    width: wp(20),
    height: hp(10),
    backgroundColor: '#1cc',
    position: 'absolute',
    borderRadius: wp(100),
    justifyContent: 'center',
    alignItems: 'center',
    bottom: hp(8),
    right: wp(8),
  }
})

export default PlayersView
