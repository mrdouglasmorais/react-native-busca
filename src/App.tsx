import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import Find from './Components/Find';

const App: React.FC = () => {
  return (
    <View style={styles.default}>
      <ImageBackground
        style={styles.imageBG}
        source={require('./Assets/Image/white.jpeg')}>
        <Find />
        <View style={styles.buttonsArea}>
          <View style={styles.rows}>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text style={styles.textButton}>Abrir</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text style={styles.textButton}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  default: {
    flex: 1,
  },
  imageBG: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover',
    paddingBottom: 42,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 20,
  },
  textButton: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#555',
  },
  buttonsArea: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  rows: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    maxHeight: 50,
  },
});

export default App;