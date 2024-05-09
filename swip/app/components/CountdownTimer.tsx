import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

type Props = {
    duration: number,
    isRunning: React.SetStateAction<boolean>
    setIsRunning: React.Dispatch<React.SetStateAction<boolean>>
}

const CountdownTimer = ({duration, isRunning, setIsRunning}: Props) => {
    
    const [timeLeft, setTimeLeft] = useState(duration * 60)

    console.log(timeLeft)

    useEffect(() => {
        let interval;
        if (isRunning) {
          interval = setInterval(() => {
            if (timeLeft > 0) {
              setTimeLeft(timeLeft - 1);
            } else {
              clearInterval(interval);
              setIsRunning(false);
            }
          }, 1000);
        } else {
          clearInterval(interval);
        }
    
        return () => clearInterval(interval);
      }, [isRunning, timeLeft]);
    

  return (
    <View>
      <Text>
         {`${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}`}
      </Text>
    </View>
  )
}

export default CountdownTimer

const styles = StyleSheet.create({})