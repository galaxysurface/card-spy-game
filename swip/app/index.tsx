import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Button from './ui/Button';
import { usePlayerStore } from '../store/playerStore';

const { width: widthScreen, height: heightScreen } = Dimensions.get('window');

type Props = {};

const Index = (props: Props) => {

  const fetchAllPlayers = usePlayerStore((state)=>state.fetchPlayers)

useEffect(()=>{
  fetchAllPlayers()
},[])
  return (
    <SafeAreaView>
      <StatusBar hidden={true} style='auto' />
      <View style={styles.container}>
        <Text>Image</Text>
        <Button title='start Game' link='settingsView' />
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    width: widthScreen,
    height: heightScreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Index;