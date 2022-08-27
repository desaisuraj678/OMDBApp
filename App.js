/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import MovieList from './src/MovieList';
import RNBootSplash from 'react-native-bootsplash';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  useEffect(() => {
    RNBootSplash.hide({fade: true});
  }, []);

  const backgroundStyle = {
    flex: 1,
    backgroundColor: 'black',
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <MovieList />
    </SafeAreaView>
  );
};

export default App;
