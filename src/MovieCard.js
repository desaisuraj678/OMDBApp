/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  TouchableHighlight,
} from 'react-native';
import PopUpCard from './PopUpCard';

const MovieCard = ({moviewCardItem}) => {
  const cardWidth = (Dimensions.get('window').width - 32 - 16) / 2;
  const [modalVisible, setModalVisible] = useState(false);
  const modalHandler = modalState => {
    setModalVisible(modalState);
  };

  return (
    <TouchableHighlight
      style={{
        width: cardWidth,
        minHeight: (16 / 9) * cardWidth,
        backgroundColor: 'white',
        margin: 5,
        alignSelf: 'center',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
      }}
      onPress={() => {
        modalHandler(true);
      }}>
      <>
        <Image
          source={{uri: moviewCardItem.Poster}}
          style={{width: '100%', height: (16 / 9) * cardWidth}}
        />
        <Text
          numberOfLines={1}
          style={{fontSize: 16, fontWeight: '500', padding: 10}}>
          {moviewCardItem.Title}
        </Text>
        {modalVisible && (
          <PopUpCard
            modalVisible={modalVisible}
            modalHandler={modalHandler}
            moviewCardItem={moviewCardItem}
          />
        )}
      </>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({});

export default MovieCard;
