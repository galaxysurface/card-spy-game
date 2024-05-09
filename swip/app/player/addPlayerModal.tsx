import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { usePlayerStore } from "../../store/playerStore";
import { hp, wp } from "../../utils/Metrics";

import HeaderModel from "../components/HeaderModel";


type Props = {};

const AddPLayer = (props: Props) => {
  const addPlayerStore = usePlayerStore((state) => state.addPlayer);
  const [textField, setTextFiled] = useState("");

  const onAddPlayer = () => {
    if(textField.trim()){
      addPlayerStore(textField);
      setTextFiled("");
    }
  };

  return (
    <View style={{ alignSelf: 'center' }}>
      <HeaderModel title="Add New Player" />
      <View style={styles.contentView}>
        <TextInput
          style={[styles.textInput]}
          placeholder="Player 1"
          value={textField}
          onChangeText={(txt) => setTextFiled(txt)}
        />
        <Pressable onPress={onAddPlayer} style={[styles.addButton]}>
          <Text>Add </Text>
        </Pressable>

      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: wp(100),
    height: hp(100),
  },
  contentView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputFieldContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
    paddingVertical: 11,

  },
  textInput: {
    width: wp(90),
    height: hp(10),
    paddingHorizontal: 11,
    paddingVertical: 11,
    borderWidth: 2,
    borderColor: '#1cc',
    borderRadius: 11,
  },
  addButton: {
    width: wp(90),
    height: hp(10),
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

export default AddPLayer;
