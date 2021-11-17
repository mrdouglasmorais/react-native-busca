/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  TextInput,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';

interface ISearch {
  width?: number;
  textInputAnimation: any;
  iconSize?: number;
}

const Find: React.FC = () => {
  const [search, setSearch] = useState<ISearch>({
    width: 100,
    textInputAnimation: new Animated.Value(1),
    iconSize: 40,
  });

  const SearchIcon = (props: any) => {
    const {searchIconColor, searchIconSize} = props;
    return (
      <Svg viewBox="0 0 416 416" width={searchIconSize} height={searchIconSize}>
        <Path
          fill="none"
          stroke={searchIconColor}
          strokeMiterlimit="10"
          strokeWidth="32"
          d="M173.09 16a157.09 157.09 0 10157.09 157.09h0A157.1 157.1 0 00173.09 16z"
        />
        <Path
          fill="none"
          stroke={searchIconColor}
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="32"
          d="M290.29 290.29L400 400"
        />
      </Svg>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.animatedContainer,
          {
            transform: [{scaleX: 1}, {scaleY: 1}],
            opacity: search.textInputAnimation,
            width: 100,
          },
        ]}>
        <SearchIcon
          style={styles.inputSearchIcon}
          searchIconColor="pink"
          searchIconSize={search.iconSize}
        />
        <TextInput style={styles.searchInput} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
  },
  animatedContainer: {
    marginLeft: 'auto',
  },
  searchInput: {
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 1,
    shadowRadius: 12,
  },
  inputSearchIcon: {
    position: 'absolute',
    left: 0,
  },
});

export default Find;
