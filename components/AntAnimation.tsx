import React, {useEffect, useRef} from 'react';
import {Animated, Dimensions, StyleSheet} from 'react-native';
import {Easing} from 'react-native-reanimated';

const ant = '../images/ant.png';

const AntAnimation = () => {
  const translation = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    translation.setValue(500);
    Animated.loop(
      Animated.timing(translation, {
        toValue: -500,
        useNativeDriver: true,
        easing: Easing.ease,
        duration: 3000,
      }),
    ).start();
  }, []);
  return (
    <Animated.Image
      style={[
        styles.antImage,
        {transform: [{rotate: '90deg'}, {translateY: translation}]},
      ]}
      source={require(ant)}
    />
  );
};

export default AntAnimation;

const styles = StyleSheet.create({
  antImage: {
    height: 30,
    width: 15,
  },
});
