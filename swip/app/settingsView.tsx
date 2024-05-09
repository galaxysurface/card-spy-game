import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import HeaderSection from './components/HeaderSection'
import Button from './ui/Button'
import { useGameStore } from '../store/gameStore'
import PressableButton from './ui/PressableButton'
import { useSpieStore } from '../store/spieStore'
import { useTimerStore } from '../store/timerStore'
import { router } from 'expo-router'
import { usePlayerStore } from '../store/playerStore'
import { useKeyWordStore } from '../store/keyWordStore'

type Props = {}


const groups = [
  {id: 1, groupName: 'group1'},
  {id: 2, groupName: 'group2'},
  {id: 3, groupName: 'group3'},
  {id: 4, groupName: 'group4'},
]

const SettingsView = (props: Props) => {

  // Game Store
  const swipingDone = useGameStore((state) => state.swipingDone)
  const increaseSpie = useSpieStore((state) => state.increaseSpie)
  const decreaseSpie = useSpieStore((state) => state.decreaseSpie)
  const resetSpie = useSpieStore((state) => state.resetSpie)
  const spieCount = useSpieStore((state) => state.spie)

  // Players Store
  const players = usePlayerStore((state)=>state.players)



  // PLayers 
  const data = []

  const generate = useKeyWordStore((state) => state.generate)
  const keywords = useKeyWordStore((state) => state.keywords)
  const fetchKeyWords = useKeyWordStore((state) => state.fetchKeyWords)


  const isEnabled = useTimerStore((state) => state.isEnable)
  const time = useTimerStore((state) => state.time)


  // Reload The Game function
  const reloadGame = () =>{
    swipingDone(false)
  }

useEffect(()=>{
  fetchKeyWords()
  // console.log(keywords)

  generate(keywords)
},[])


  return (
    <SafeAreaView>
      <StatusBar hidden={false} style='auto'/>
      {/* Players Section  */}
      <View>
        <HeaderSection playerName='Player Name' link='playersView' data={data} />
        <ScrollView horizontal
          style={{}} >
          {data.map(({name}, index) =>(
            <View 
              style={styles.playerCard}
              key={index}>
                <Text>{name}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
      {/* Spie Section  */}
      <View>
        <HeaderSection playerName='Spie Number' spie={spieCount}  />
        <View style={styles.spieSection}>
          <View style={styles.spieCard}>
             <PressableButton 
                title='+'
                onPressFun={() => increaseSpie()}  />
             <PressableButton 
                title='-' 
                onPressFun={() => decreaseSpie()}  />
          </View>
            <PressableButton 
              title='Reset'
              onPressFun={() => resetSpie()}   />
        </View>

      </View>
      {/* Set Of Words Section  */}
      <View>
        <HeaderSection playerName='Categorys' link='category'/>
        <View>
          <Text>Select A Group or lets start Random!</Text>
          <ScrollView horizontal>
            {
              groups.map(({groupName}, index) => (
                <View 
                  style={styles.groupSection}
                  key={index}>
                  <Text> {groupName} </Text>
                </View>
              ))
            }
          </ScrollView>
        </View>

      </View>
      {/* Timer Section */}
      <View>
        <HeaderSection playerName='Timer' toggle={true}/>
        <View>
          <Pressable
            onPress={() => router.push('modelTimer')}
            disabled={!isEnabled&& true}
            style={[styles.btnTimer,{opacity: !isEnabled ? 0.1: 1}]}>
            <Text style={styles.textTimerTitle}>Select A Time</Text>
            <Text style={styles.textTimer}> {time}:00 </Text>
          </Pressable>
        </View>

      </View>
      {/* start Game */}
      <View>
            <Button title='let start' link='swiperView' onPressFun={reloadGame}/>
      </View>

    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  playerCard: {
    backgroundColor: '#ccc',
    padding: 8,
    marginHorizontal: 4,
    borderRadius: 4,
    borderCurve: 'circular'
  },
  groupSection: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
    padding: 8,
    marginHorizontal: 4,
    borderRadius: 4,
    borderCurve: 'circular'
  },
  spieSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  spieCard: {
    flexDirection: 'row'
  },
  btnTimer: {
    borderWidth: 2,
    borderColor: '#21CF46',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textTimerTitle: {
    fontSize: 11,
    fontWeight: '200',
    color: '#000'
  },
  textTimer: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#21CF46'
  }
})

export default SettingsView
