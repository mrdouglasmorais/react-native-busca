/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  TextInput,
  LayoutChangeEvent,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import PropTypes from 'prop-types';

interface ISearch {
  width: number;
  textInputAnimated: any;
  parentViewWidthAnimated: any;
  isScaled: boolean;
}

interface IFindComponent {
  height: number;
  borderRadius?: number;
  fontSize?: number;
  backgroundColor?: string;
  placeholderTextColor?: string;
  searchIconSize?: number;
  searchIconColor?: string;
  focusAfterOpened?: boolean;
  shadowColor?: string;
  placeholder?: string;
  animationSpeed?: [];
  onOpened?: () => {};
  onClosed?: () => {};
  onOpening?: () => {};
  onClosing?: () => {};
}

const Find: React.FC<IFindComponent> = (props: IFindComponent) => {
  const {
    height,
    borderRadius,
    fontSize,
    backgroundColor,
    placeholderTextColor,
    shadowColor,
    placeholder,
  } = props;
  const [state, setState] = useState<ISearch>({
    width: 0,
    textInputAnimated: new Animated.Value(0),
    parentViewWidthAnimated: new Animated.Value(height),
    isScaled: false,
  } as ISearch);;

  const onLayout = (e: LayoutChangeEvent) => {
    const {width} = e.nativeEvent.layout;
    setState({...state, width: width});
  };;

  //Icone de pesquisa
  const SearchIcon = (props: any) => {
    const {searchIconSize, searchIconColor} = props;
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
  };;

  //Inicia a animação
  const open = (props: any) => {
    const {focusAfterOpened, animationSpeed, onOpened, onOpening} = props;
    onOpening && onOpening();

    Animated.timing(state.textInputAnimated, {
      toValue: 1,
      duration: animationSpeed[0],
      easing: Easing.linear,
    }).start(() => {
      setTimeout(() => {
        setState({...state, isScaled: true});

        Animated.timing(state.parentViewWidthAnimated, {
          toValue: state.width,
          duration: animationSpeed[1],
          easing: Easing.linear,
        }).start(() => {
          onOpened && onOpened();
          if (focusAfterOpened) {refTextInput.focus();}
        });
      }, 125);
    });
  };;

  //Inicio da animação efeito de fechar
  const close = (props: any) => {
    const {animationSpeed, onClosed, onClosing} = props;
    onClosing && onClosing();

    Animated.timing(state.parentViewWidthAnimated, {
      toValue: props.height,
      duration: animationSpeed[1],
      easing: Easing.linear,
    }).start(() => {
      setState({...state, isScaled: false});

      setTimeout(() => {
        Animated.timing(state.textInputAnimated, {
          toValue: 0,
          duration: animationSpeed[0],
          easing: Easing.linear,
        }).start(() => {
          onClosed && onClosed();
        });
      }, 125);
    });
  };;

  return (
    <View onLayout={onLayout} style={styles.container}>
      <Animated.View
        style={[
          styles.animatedContainer,
          {
            transform: [
              {scaleX: state.textInputAnimated},
              {scaleY: state.textInputAnimated},
            ],
            opacity: state.textInputAnimated,
            width: state.parentViewWidthAnimated,,
          },
        ]}>
        <TextInput
          {...props}
          placeholderTextColor={
            state.isScaled ? placeholderTextColor : 'transparent'
          }
          placeholder={placeholder}
          style={[
            styles.searchInput,
            {
              shadowColor: shadowColor,
              backgroundColor: backgroundColor,
              height: height,
              borderRadius: borderRadius,
              fontSize: fontSize,
              paddingLeft: height,
            },,
          ]}
        />

        {state.isScaled ? (
          <View
            style={[styles.inputSearchIcon, {width: height, height: height}]}>
            {SearchIcon()}
          </View>
        ) : null}
      </Animated.View>

      {state.isScaled ? null : (
        <TouchableOpacity
          onPress={open}
          style={[
            styles.inputClosedSearchIcon,
            {width: height, height: height},
          ]}>
          {searchIcon()}
        </TouchableOpacity>
      )}
    </View>
  );;
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
  inputClosedSearchIcon: {
    position: 'absolute',
    right: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

Find.defaultProps = {
  height: 48,
  borderRadius: 48,
  searchIconColor: '#555555',
  searchIconSize: 20,
  focusAfterOpened: false,
  placeholderTextColor: '#555555',
  fontSize: 16,
  backgroundColor: 'rgba(255,255,255,0.70)',
  shadowColor: 'rgba(0,0,0,0.12)',
  animationSpeed: [200, 250],
};

Find.propTypes = {
  height: PropTypes.number,
  borderRadius: PropTypes.number,
  fontSize: PropTypes.number,
  backgroundColor: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  searchIconSize: PropTypes.number,
  searchIconColor: PropTypes.string,
  focusAfterOpened: PropTypes.bool,
  shadowColor: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  animationSpeed: PropTypes.array,
  onOpened: PropTypes.func,
  onClosed: PropTypes.func,
  onOpening: PropTypes.func,
  onClosing: PropTypes.func
}

export default Find;
