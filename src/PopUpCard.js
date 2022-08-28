import React from 'react';
import {
  Modal,
  Dimensions,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight,
} from 'react-native';

const PopUpCard = ({modalHandler, modalVisible, moviewCardItem}) => {
  const cardWidth = Dimensions.get('window').width / 1.5;
  const onRequestCloseHandler = () => {
    modalHandler(false);
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onRequestCloseHandler}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              source={{uri: moviewCardItem?.Poster}}
              style={{width: cardWidth, height: (16 / 9) * cardWidth}}
            />
            <Text numberOfLines={2} style={styles.Title}>
              {moviewCardItem?.Title}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text numberOfLines={1} style={styles.Type}>
                {moviewCardItem?.Type}
              </Text>
              <Text numberOfLines={1} style={styles.Year}>
                {moviewCardItem?.Year}
              </Text>
            </View>
            <TouchableHighlight
              onPress={onRequestCloseHandler}
              style={styles.OKButton}>
              <Text>OK</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    height: '100%',
    alignItems: 'center',
    width: Dimensions.get('window').width - 32 - 16,
    marginTop: 22,
    alignSelf: 'center',
    position: 'absolute',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 18,
  },
  OKButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#F194FF',
    width: 80,
    height: 40,
    top: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Year: {fontSize: 14, fontWeight: '400', padding: 2, left: 0},
  Type: {fontSize: 14, fontWeight: '400', padding: 2, left: 0},
  Title: {
    fontSize: 17,
    fontWeight: '600',
    padding: 5,
    textAlign: 'center',
  },
});

export default PopUpCard;
