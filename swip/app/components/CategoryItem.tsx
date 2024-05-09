import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CategoryProps } from '../../types/Props';
import { router } from 'expo-router';
import { useKeyWordStore } from '../../store/keyWordStore';

type Props = {
  category: CategoryProps;
};

const CategoryItem: React.FC<Props> = ({ category }) => {
  const filterKeyword = useKeyWordStore((state) => state.filterKeyword)
  const { categoryID, categoryName } = category;

  return (
    <Pressable 
        style={styles.container} 
        key={categoryID}
        onPress={()=> {
          filterKeyword(categoryID)
          router.push({
            pathname: '[categoryID]',
            params: {
                categoryID,
                categoryName
            }
        })}}>
      <Text>{categoryName}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '45%',
    padding: 20,
    backgroundColor: '#cca',
  },
});

export default CategoryItem;
