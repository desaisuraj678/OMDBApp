/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useCallback} from 'react';
import {
  StyleSheet,
  Dimensions,
  Image,
  Text,
  TouchableHighlight,
} from 'react-native';
import PopUpCard from './PopUpCard';
const cardWidth = (Dimensions.get('window').width - 32 - 16) / 2;

const MovieCard = ({moviewCardItem}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const modalHandler = useCallback(modalState => {
    setModalVisible(modalState);
  }, []);

  return (
    <TouchableHighlight
      style={styles.cardWrapper}
      activeOpacity={0.9}
      onPress={() => {
        modalHandler(true);
      }}>
      <>
        <Image source={{uri: moviewCardItem?.Poster}} style={styles.Image} />
        <Text numberOfLines={1} style={styles.title}>
          {moviewCardItem?.Title}
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

const styles = StyleSheet.create({
  cardWrapper: {
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
  },
  Image: {width: '100%', height: (16 / 9) * cardWidth},
  title: {fontSize: 16, fontWeight: '500', padding: 10, color: 'black'},
});

export default MovieCard;
