import React from 'react';
import {StyleSheet, View} from 'react-native';
import AntAnimation from './AntAnimation';

const AntsMoving = () => {
  return (
    <View style={styles.container}>
      <AntAnimation />
      <AntAnimation />
      <AntAnimation />
    </View>
  );
};

export default AntsMoving;

const styles = StyleSheet.create({
  container: {
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
