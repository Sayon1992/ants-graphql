import React, {useEffect, useState} from 'react';
import {
  Button,
  Dimensions,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import {useQuery} from '@apollo/client';
import {GET_ANTS} from '../graphql/Queries';
import {Ant} from '../entities/Ant';
import AntRow from './AntRow';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getLoggedResult} from '../utils/helpers';
import AntsMoving from './AntsMoving';

const RootComponent = () => {
  const [ants, setAnts] = useState<Ant[]>([]);
  const [login, setLogin] = useState<boolean>(false);
  const {data} = useQuery(GET_ANTS);

  const getChances = (ant: Ant, chances: number) => {
    const antIndex = ants.findIndex(item => item.name === ant.name);
    let auxAnts = [...ants];
    auxAnts[antIndex] = {...ant, chances};
    const sortedAnts = auxAnts.sort((a, b) =>
      (a.chances ?? 0) < (b.chances ?? 0) ? 1 : -1,
    );
    setAnts(sortedAnts);
  };

  const renderItem = ({item}: {item: Ant}) => (
    <View style={styles.antRowContainer}>
      <AntRow ant={item} logged={login} getChances={getChances} />
    </View>
  );

  const getLoginInfo = async () => {
    try {
      const logged = await AsyncStorage.getItem('@login');
      logged === null ? setLogin(false) : setLogin(getLoggedResult(logged));
    } catch {
      throw new Error('Error getting login info');
    }
  };

  const setLoginInfo = async () => {
    try {
      await AsyncStorage.setItem('@login', `${!login}`);
      setLogin(!login);
    } catch {
      throw new Error('Error setting login info');
    }
  };

  const generateLoginText = () => {
    if (login) return 'LOGOUT';
    return 'LOGIN';
  };

  useEffect(() => {
    data && setAnts(data.ants);
  }, [data]);

  useEffect(() => {
    getLoginInfo();
  }, []);

  return (
    <View>
      {login && <AntsMoving />}
      <View style={styles.container}>
        <FlatList
          data={ants}
          keyExtractor={item => item.name}
          renderItem={renderItem}
        />
        <Button onPress={setLoginInfo} title={generateLoginText()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
  },
  antRowContainer: {
    flexDirection: 'row',
  },
});

export default RootComponent;
