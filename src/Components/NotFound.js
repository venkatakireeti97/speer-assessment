import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import EN from '../Constants/String';

const NotFoundComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>{EN.T_HOME_USER_NOT_FOUND}</Text>
      <Text style={styles.instructText}>{EN.T_HOME_SEARCH_AGAIN}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  mainText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  instructText: {
    fontSize: 14,
    color: 'gray',
  },
});

export default NotFoundComponent;