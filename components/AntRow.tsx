import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Ant} from '../entities/Ant';
import {generateAntWinLikelihoodCalculator} from '../utils/helpers';

interface AntRowProps {
  ant: Ant;
  logged: boolean;
  getChances: (ant: Ant, chance: number) => void;
}

const AntRow = ({ant, logged, getChances}: AntRowProps) => {
  const [retrieving, setRetrieving] = useState(false);
  const [likelihood, setLikelihood] = useState<number>();

  const generateText = useCallback(() => {
    if (retrieving) return 'Calculating';
    if (!likelihood) return 'Calculate';
    if (!retrieving && likelihood) return `${likelihood} %`;
  }, [retrieving, likelihood]);

  return (
    <>
      <View style={styles.antContainer}>
        <Text style={styles.ant}>{ant.name}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        disabled={!logged}
        onPress={() => {
          if (!retrieving) {
            setRetrieving(true);
            generateAntWinLikelihoodCalculator()(result => {
              const chance = Math.round(result * 100);
              setLikelihood(chance);
              setRetrieving(false);
              getChances(ant, chance);
            });
          }
        }}>
        <View style={{height: 50, width: 100, justifyContent: 'center'}}>
          <Text style={styles.buttonText}>{generateText()}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default AntRow;

const styles = StyleSheet.create({
  antContainer: {
    width: 200,
    marginBottom: 20,
    height: 50,
    justifyContent: 'center',
  },
  ant: {
    color: 'black',
    fontSize: 17,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    marginBottom: 20,
  },
});
