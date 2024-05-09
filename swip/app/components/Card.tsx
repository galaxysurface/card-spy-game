import React from 'react'
import { View, Text, Dimensions, StyleSheet, useWindowDimensions } from 'react-native'
import { Image } from 'expo-image';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { SharedValue, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { hp, wp } from '../../utils/Metrics';
import { PlayerProps } from '../../types/Props';



const { width: widthScreen,  height: heightScreen} = Dimensions.get('window');

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
type Props = {
    item: PlayerProps,
    index: number,
    dataLength: number,
    maxVisibleItem: number,
    currentIndex: number,
    animatedValue: SharedValue<number>,
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>
    newData: PlayerProps[],
    doneWithSwiping: SharedValue<boolean>,
    randomList: string,
}


const Card = ({
    item, 
    index, 
    dataLength, 
    currentIndex, 
    animatedValue, 
    maxVisibleItem,
    setCurrentIndex,
    newData,
    doneWithSwiping,
    randomList

}: Props) => {
 
    const {width } = useWindowDimensions()
    const translationX = useSharedValue(0)
    const direction = useSharedValue(0)
    
    const gesture = Gesture.Pan()
    .onUpdate(
        (e)=>{
            const isSwipRight = e.translationX > 0
            direction.value = isSwipRight ? 1 : -1

            if(currentIndex === index){
                translationX.value = e.translationX
                animatedValue.value = interpolate(
                    Math.abs(e.translationX),
                    [0, width],
                    [index, index + 1]
                )
            }
        })
        .onEnd((e) =>{
        if(currentIndex === index){
            if(Math.abs(e.translationX) > 150 || Math.abs(e.velocityX) > 1000){

                translationX.value = 
                    withTiming(width * direction.value, {}, () =>{
                        runOnJS(setCurrentIndex)(currentIndex + 1)
                        // translationX.value = withTiming(0)
                        if((currentIndex + 1) === dataLength){
                                doneWithSwiping.value = true
                        }
                    })
                    animatedValue.value = withTiming(currentIndex + 1)
            }else {
                translationX.value = withTiming(0, {duration: 500})
                animatedValue.value = withTiming(currentIndex)
            }
        }
    });

    const animatedStyle = useAnimatedStyle(():any =>{
        const currentItem =index === currentIndex

        const rotateZ = interpolate(
            Math.abs(translationX.value),
            [0, width],
            [0, 20]

        )

        const translateY = interpolate(
            animatedValue.value,
            [index - 1, index],
            [-60, 0]
        )

        const scale = interpolate(
            animatedValue.value,
            [index - 1, index],
            [0.9, 1]
        )

        
        const opacity = interpolate(
            animatedValue.value + maxVisibleItem,
            [index, index + 1],
            [0, 1]
        )

        return {
            transform: [
                {
                    translateX: translationX.value
                },
                {
                    scale: currentItem ? 1 : scale
                },
                {
                    translateY: currentItem ? 0 : translateY
                },
                {
                    rotateZ: currentItem ? `${direction.value * rotateZ} deg` : '0deg'
                }
            ],
            opacity: index < maxVisibleItem + currentIndex ? 1 : opacity
        }
    })


  return (
    
    <GestureDetector gesture={gesture}>
        <Animated.View 
            style={[
                    styles.container, 
                    {
                        backgroundColor: '#c1c',
                    },
                    animatedStyle,
                    {zIndex: dataLength - index},
                    ]}>
            <Text>{randomList}</Text>


            {/* <Image
                style={styles.image}
                source={item.image}
                placeholder={blurhash}
                contentFit="cover"
                transition={1000}
            /> */}


      </Animated.View>

    </GestureDetector>
  )
}

const styles = StyleSheet.create({
    container: {
        width: wp(80),
        height: hp(60),
        backgroundColor: '#ccc',
        borderRadius: 20,
        borderCurve: 'circular',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    cardContainer: {
        padding: 20
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
        borderCurve: 'circular',
        position: 'absolute'
    },
})

export default Card;
