import React from 'react';
import {View, StyleSheet} from 'react-native';

const SkeletonLoader = () => {
  return (
    <View style={styles.container}>
      {[...Array(4)].map((_, index) => (
        <View key={index} style={styles.item} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 20,
  },
  item: {
    height: 12,
    width: '80%',
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
    alignSelf: 'center',
  },
});

export default SkeletonLoader;
