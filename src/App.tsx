import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import Find from './Components/Find';

const App: React.FC = (props: any) => {
  console.log('props', props);
  const [state, setState] = useState({
    searchIconColor: '#555',
  });

  const openSearchBox = () => console.log('open');
  const closeSearchBox = () => console.log('close');

  useEffect(() => {
    openSearchBox();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.bgImage}
        source={require('./Assets/Image/white.jpeg')}>
        <Find
          {...props}
          ref={(ref: any) => console.log(ref)}
          placeholder={'Pesquisar...'}
          searchIconColor={state.searchIconColor}
          onClosed={() => setState({...state, searchIconColor: '#fff'})}
          onOpening={() => setState({...state, searchIconColor: '#555'})}
        />

        <View style={styles.buttonsArea}>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={openSearchBox}>
              <Text style={styles.buttonText}>ABRIR</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={closeSearchBox}>
              <Text style={styles.buttonText}>FECHAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    resizeMode: 'cover',
    paddingTop: 45,
    paddingLeft: 15,
    paddingRight: 15,
  },
  buttonsArea: {
    flex: 1,
    marginBottom: 15,
    justifyContent: 'flex-end',
  },
  row: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: -10,
    marginRight: -10,
    maxHeight: 50,
    marginTop: 5,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.80)',
    margin: 10,
    height: 40,
    borderRadius: 40,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#555',
  },
});

export default App;
