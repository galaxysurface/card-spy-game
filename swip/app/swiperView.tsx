import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSharedValue } from 'react-native-reanimated'
import Card from './components/Card'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useGameStore } from '../store/gameStore'
import { SafeAreaView } from 'react-native-safe-area-context'
import { hp, wp } from '../utils/Metrics'
import { router } from 'expo-router'
import CountdownTimer from './components/CountdownTimer'
import { useTimerStore } from '../store/timerStore'
import { usePlayerStore } from '../store/playerStore'
import { generateRandomKeyWord, newGenerateRandomKeyWord } from '../utils/utils'
import { useKeyWordStore } from '../store/keyWordStore'

type Props = {}

const SwiperView = (props: Props) => {

  const allPlayersList = usePlayerStore((state) => state.players)


  const [currentIndex, setCurrentIndex] = useState(0)
  const animatedValue = useSharedValue(0)
  const doneWithSwiping = useSharedValue(false)

  // GAME STORE
  const swipingDone = useGameStore((state) => state.swipingDone)
  const isSwipingDone = useGameStore((state) => state.isSwipingDone)
  // TIME STORE
  const isEnable = useTimerStore((state) => state.isEnable)

  // KEYWORDS STORE 
  const fetchKeyWords = useKeyWordStore((state) => state.fetchKeyWords)
  const keywords = useKeyWordStore((state) => state.keywords)
  const getFinalKeyWord = useKeyWordStore((state) => state.getFinalKeyWord)
  const generate = useKeyWordStore((state) => state.generate)

  const MAX = 3

  const time = useTimerStore((state) => state.time)

  const [word, setWord] = useState()

  console.log(getFinalKeyWord)


  const testList = ['1', '2', '3', '4']

  // console.log('testList :', keywords)

  useEffect(()=>{
    generate(keywords)
  },[])


  useEffect(() => {
    fetchKeyWords()
  }, [])
  useEffect(() => {
    if (doneWithSwiping.value) {
      swipingDone(doneWithSwiping.value)
    }
  }, [doneWithSwiping.value])


  const fetchCard = () => {

    return allPlayersList.map((player, index) => {
      if (index > currentIndex + MAX || index < currentIndex) {
        return null
      }
      return (
        <Card
          key={index}
          item={player}
          index={index}
          randomList={word}
          dataLength={allPlayersList.length}
          maxVisibleItem={MAX}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          animatedValue={animatedValue}
          newData={allPlayersList}
          doneWithSwiping={doneWithSwiping}
        />
      )
    }
    )
  }


  const startGameView = () => {

    console.log(time)

    return (
      <View>
        <Text>Lets start found Spie!</Text>
        {isEnable &&
          <CountdownTimer
            isRunning={isEnable}
            setIsRunning={() => { }}
            duration={time} />
        }

        <Pressable
          onPress={() => {
            router.back()
          }}
          style={styles.btnRestart}>
          <Text>Restart The Game ?</Text>
        </Pressable>
      </View>
    )
  }

  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        <View style={styles.container}>
          {isSwipingDone ? startGameView() : fetchCard()}
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}




const styles = StyleSheet.create({
  container: {
    width: wp(100),
    height: hp(100),
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnRestart: {
    width: wp(80),
    height: hp(10),
    backgroundColor: '#cac',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
})



export default SwiperView
