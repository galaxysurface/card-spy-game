import { Pressable, StyleSheet, Text, View , Switch} from 'react-native'
import React, { useEffect, useState } from 'react'

import { Ionicons, Entypo } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTimerStore } from '../../store/timerStore';
import { PlayerProps } from '../../types/Props';



type Props = {
    playerName: string,
    link?: string,
    spie?: any,
    toggle?: boolean,
    data?: PlayerProps[]
}

const HeaderSection = ({
    playerName, 
    link,
    spie,
    toggle,
    data
    }: Props) => {

        // const [isEnabled, setIsEnabled] = useState(false);
        // const toggleSwitch = () => setIsEnabled(previousState => !previousState);

        const enabledFun = useTimerStore((state) => state.enabledFun)
        const isEnabled = useTimerStore((state) => state.isEnable)

    

    //    useEffect(() =>{
    //     // enabledFun(isEnabled)
    //    }, [isEnabled])



  return (
    <View style={styles.container}>
        {/* left Icon and Title Section  */}
        <View style={styles.leftSection}>
            <Ionicons name="game-controller" size={24} color="black" />
            <Text>{playerName}</Text>
        </View>
        {/* Right Icon Section  */}
        <View>
            {/* link */}
            {link && <Pressable onPress={
                () =>
                    router.push({ pathname: link, params: data })
                }>
                <Entypo name="triangle-right" size={24} color="black" />
            </Pressable>}

            {/* spie */}
            {spie && <Text>{spie}</Text>}

            {/* toggle */}
            {toggle && <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={()=>enabledFun(!isEnabled)}
                value={isEnabled}
                 />
            }


        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        padding: 11,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    leftSection: {
        flexDirection: 'row',
        gap: 11
    }
})

export default HeaderSection
