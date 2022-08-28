/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import MovieCard from './MovieCard';

const MovieList = () => {
  const title = 'Batman';
  const page = useRef(1);
  const [searchedValue, setSearchedValue] = useState('');
  const [movieListData, setMovieListData] = useState([]);
  const [movieDataToDisplay, setMovieDataToDisplay] = useState('');
  const fetchMoviewFromDB = pageNum => {
    const api = `https://www.omdbapi.com/?s=${title}&apikey=eeefc96f&page=${pageNum}`;
    fetch(api)
      .then(resp => {
        return resp.json();
      })
      .then(res => {
        setMovieListData([...movieListData, ...res.Search]);
      })
      .catch(e => {});
  };

  useEffect(() => {
    fetchMoviewFromDB(page.current);
    return setMovieListData([]);
  }, []);

  const renderMoviewCard = ({item}) => {
    return <MovieCard moviewCardItem={item} key={item?.imdbID} />;
  };
  const onEndReachedHandler = () => {
    if (page.current < 10 && !searchedValue.trim()) {
      fetchMoviewFromDB(page.current + 1);
      page.current = page.current + 1;
    }
  };
  useEffect(() => {
    if (searchedValue) {
      let searchedMoview = movieListData?.filter(movie => {
        let parsedValue = searchedValue?.toLowerCase();
        if (movie.Title?.toLowerCase()?.includes(parsedValue)) return true;
        return false;
      });
      setMovieDataToDisplay([...searchedMoview]);
    } else {
      setMovieDataToDisplay([...movieListData]);
    }
  }, [searchedValue, movieListData]);

  const onChangeTextHandler = value => {
    setSearchedValue(value);
  };

  const headerComponent = () => {
    return (
      <View style={styles.moviesHeader}>
        <Text style={styles.headerContent}>Movies</Text>
        <TextInput
          placeholder="Search"
          placeholderTextColor={'gray'}
          onChangeText={onChangeTextHandler}
          value={searchedValue}
          style={styles.search}></TextInput>
      </View>
    );
  };

  const footerComponent = () => {
    return <ActivityIndicator size="large" />;
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        numColumns={2}
        data={movieDataToDisplay}
        renderItem={renderMoviewCard}
        keyExtractor={item => item.imdbID}
        style={{flex: 1}}
        columnWrapperStyle={{justifyContent: 'center'}}
        onEndReachedThreshold={0.1}
        onEndReached={onEndReachedHandler}
        ListHeaderComponent={headerComponent()}
        initialNumToRender={8}
        ListHeaderComponentStyle={{
          padding: 8,
        }}
        ListFooterComponent={footerComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  moviesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    alignItems: 'center',
  },
  headerContent: {
    color: 'white',
    paddingLeft: 16,
    fontSize: 18,
    fontWeight: '600',
  },
  search: {
    backgroundColor: 'white',
    flex: 1,
    height: 40,
    marginHorizontal: 8,
    borderRadius: 8,
    paddingHorizontal: 4,
  },
});

export default MovieList;
