/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, FlatList, Text, TextInput} from 'react-native';
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
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchMoviewFromDB(page.current);
    return setMovieListData([]);
  }, []);
  const renderMoviewCard = ({item}) => {
    console.log(item);
    return <MovieCard moviewCardItem={item} key={item?.imdbID} />;
  };
  const onEndReachedHandler = () => {
    if (page.current < 10) {
      fetchMoviewFromDB(page.current + 1);
      page.current = page.current + 1;
    }
  };
  useEffect(() => {
    if (searchedValue) {
      let searchedMoview = movieListData.filter(movie => {
        console.log(movie.Title);
        let parsedValue = searchedValue.toLowerCase();
        if (movie.Title.toLowerCase().includes(parsedValue)) return true;
        return false;
      });
      setMovieDataToDisplay([...searchedMoview]);
      console.log('sdsaed', searchedMoview);
    } else {
      setMovieDataToDisplay([...movieListData]);
    }
  }, [searchedValue, movieListData]);
  const onChangeTextHandler = value => {
    setSearchedValue(value);
  };
  console.log('sdesai11', movieListData);
  console.log('desai9', page.current, movieDataToDisplay);
  const HeaderComponent = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: 40,
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: 'white',
            paddingLeft: 16,
            fontSize: 18,
            fontWeight: '600',
          }}>
          Movies
        </Text>
        <TextInput
          placeholder="Search"
          placeholderTextColor={'gray'}
          onChangeText={onChangeTextHandler}
          value={searchedValue}
          style={{
            backgroundColor: 'white',
            flex: 1,
            height: 40,
            marginHorizontal: 8,
            borderRadius: 8,
            paddingHorizontal: 4,
          }}></TextInput>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        numColumns={2}
        data={movieDataToDisplay}
        renderItem={renderMoviewCard}
        keyExtractor={item => {
          return item.imdbID;
        }}
        style={{flex: 1}}
        columnWrapperStyle={{justifyContent: 'center'}}
        onEndReachedThreshold={0.9}
        onEndReached={onEndReachedHandler}
        ListHeaderComponent={HeaderComponent()}
        ListHeaderComponentStyle={{
          padding: 8,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default MovieList;
