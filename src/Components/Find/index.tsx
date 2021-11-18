/* eslint-disable no-sparse-arrays */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  TextInput,
  LayoutChangeEvent,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';

interface ISearch {
  width?: number;
  textInputAnimation: any;
  parentViewedAnimation: any;
  iconSize?: number;
  isScaled: boolean;
}

interface ISearchComponent {
  height: number;
  width?: number;
  borderRadius?: number;
  searchIconColor?: string;
  shadowColor?: string;
  backgroundColor?: string;
  fontSize?: number;
  paddingLeft?: number;
  placeholder?: string;
}

const Find: React.FC<ISearchComponent> = ({
  height,
  shadowColor,
  backgroundColor,
  borderRadius,
  fontSize,
  paddingLeft,
  placeholder,
}) => {
  const [search, setSearch] = useState<ISearch>({
    width: 0,
    textInputAnimation: new Animated.Value(1),
    parentViewedAnimation: new Animated.Value(400),
    iconSize: 40,
    isScaled: true,
  });

  const onLayout = (event: LayoutChangeEvent) => {
    const {width} = event.nativeEvent.layout;
    setSearch({...search, width});
  };

  const SearchIcon = (props: any) => {
    const {searchIconColorComponent, searchIconSize} = props;
    return (
      <Svg viewBox="0 0 416 416" width={searchIconSize} height={searchIconSize}>
        <Path
          fill="none"
          stroke={searchIconColorComponent}
          strokeMiterlimit="10"
          strokeWidth="32"
          d="M173.09 16a157.09 157.09 0 10157.09 157.09h0A157.1 157.1 0 00173.09 16z"
        />
        <Path
          fill="none"
          stroke={searchIconColorComponent}
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="32"
          d="M290.29 290.29L400 400"
        />
      </Svg>
    );
  };

  return (
    <View onLayout={onLayout} style={styles.container}>
      <Animated.View
        style={[
          styles.animatedContainer,
          {
            transform: [
              {scaleX: search.textInputAnimation},
              {scaleY: search.textInputAnimation},
            ],
            opacity: search.textInputAnimation,
            width: search.parentViewedAnimation,
          },
        ]}>
        {search.isScaled && (
          <View
            style={[
              styles.inputSearchIcon,
              {
                width: height,
                height: height,
              },
              ,
            ]}>
            {SearchIcon({
              searchIconColorComponent: 'red',
              searchIconSize: height - 40,
            })}
          </View>
        )}
        <TextInput
          placeholderTextColor=""
          placeholder={placeholder}
          style={[
            styles.searchInput,
            {
              shadowColor: shadowColor,
              backgroundColor: backgroundColor,
              height: height,
              borderRadius: borderRadius,
              fontSize: fontSize,
              paddingLeft: paddingLeft,
            },
          ]}
        />
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

Find.defaultProps = {
  height: 48,
  borderRadius: 30,
  searchIconColor: '#555',
  shadowColor: 'rgba(0,0,0,0.12)',
  backgroundColor: 'rgba(255,255,255,0.7)',
  fontSize: 18,
  paddingLeft: 22,
  placeholder: '',
};

export default Find;
