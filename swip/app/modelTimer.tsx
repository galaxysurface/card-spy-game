import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import { useTimerStore } from '../store/timerStore';

type Props = {};

const ModelTimer = (props: Props) => {
    const [selectedMinute, setSelectedMinute] = useState(5);
    const pickerRef: any = useRef();

    const setTime = useTimerStore((state) => state.setTime);

    const handleButtonPress = () => {
        const selectedValue = pickerRef.current.props.selectedValue;
        setSelectedMinute(selectedValue);

        if (selectedValue !== '00') {
            setTime(selectedValue);
        } else {
            console.warn('Please select a minute before confirming.');
        }
    };

    return (
        <View>
            <Picker
                selectedValue={selectedMinute}
                onValueChange={(itemValue) => setSelectedMinute(itemValue)}
                ref={pickerRef}
                >
                {Array.from({ length: 20 }, (_, i) => {
                    const minute = (i + 1).toString().padStart(2, '0');
                    return <Picker.Item key={minute} label={minute} value={minute} />;
                })}
            </Picker>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 11,
                }}
            >
                <Pressable onPress={() => { handleButtonPress(); router.back(); }}>
                    <Text>Confirm</Text>
                </Pressable>
                <Pressable onPress={() => router.back()}>
                    <Text>Cancel</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default ModelTimer;

const styles = StyleSheet.create({});
