import { FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { usePlayerStore } from '../../store/playerStore';
import PlayerItem from '../components/PlayerItem';
import { hp, wp } from '../../utils/Metrics';


type Props = {}

const index = (props: Props) => {

  // Players Store
  const playersStore = usePlayerStore((state) => state.players)

  console.log(playersStore)

  const [isEnabled, setIsEnabled] = useState<boolean>(false)
  const toggleSwitch = () => setIsEnabled(previousState => !previousState)

  const heightBoxField = useSharedValue(hp(0))
  const opacityBoxField = useSharedValue(0)



  useLayoutEffect(() => {
    if (isEnabled) {
      heightBoxField.value = withSpring(hp(30))
      opacityBoxField.value = withTiming(1, { duration: 1000 })
    } else {
      heightBoxField.value = withTiming(0, { duration: 500 })
      opacityBoxField.value = withTiming(0, { duration: 500 })
    }

  }, [isEnabled])


  const rStyleBoxField = useAnimatedStyle(() => ({
    height: heightBoxField.value,
    opacity: opacityBoxField.value
  }))

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>Players View</Text>
        <Pressable
          onPress={() => router.back()}>
          <Text>Back</Text>
        </Pressable>
        <Animated.View style={[styles.inputFieldContainer, rStyleBoxField]}>

        </Animated.View>
        <View>
          {
            playersStore.map((player, index) => (
              <PlayerItem key={index} player={player} />))
          }

        </View>
        <View>
        </View>
        {/* FLoad Button */}
        <Pressable
          style={styles.floatButtonPlayer}
          onPress={() => {
            // heightBoxField.value = hp(20),
            // toggleSwitch()
            router.push('player/addPlayerModal')
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

export default index


