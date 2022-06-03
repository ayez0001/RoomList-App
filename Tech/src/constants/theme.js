const colors = {

  // App main color
  blue: '#0021ab',
  white: '#FFFFFF',
  black: '#000000',

  // Other general color
  lightblue: 'rgba(46,92,255,0.2)',
  green: '#A8E05F',
  green1:'#4BDA64',
  green2:'#5ABE8D',
  red: '#D63649',
  red1: '#FF0000',
  yellow: '#FDD64B',
  yellow1:'#FFC30E',
  teal: '#00C1D4',
  purple: '#8C54FF',
  black2: '#69707F',
  black3: '#8798AD',
  gray: '#BFC5D2',
  gray1: '#CCCCCC',
  gray2: '#F4F6FC',
  gray3: '#EEF3F5',
  gray4:'#808080',
  gray5:'#F2F2F2',
  gray6:'#E6E6E6',
  gray7:'#808080',
  caption: '#B0BAC9',
  input: 'rgba(224, 231, 255, 0.20)', // '#E0E7FF' 20%
  border: '#D6DDF6',
  card: 'rgba(46,91,255,0.08)',
  shadow: 'rgba(46,91,255,0.07)',
  turquoise: '#00A7BC',
  turquoise1:'#66CAD7',
  turquoise2:'#C2EAEF',
  orange:'#FFA94B',
  orange1:'#FFE0BE'
}

const sizes = {
  font15: 15,
  font17: 17,
  font18: 18,
  font24: 24,
  h1: 48,
  h2: 34,
  h3: 28,
  h4: 15,
  paragraph: 15,
  caption: 13,
  captionMedium: 12,
};

const fonts = {
  h1: {
    // fontFamily: 'Rubik-Light',
    fontSize: sizes.h1,
    color: colors.black,
    letterSpacing: -0.5,
    lineHeight: 57,
  },
  h2: {
    // fontFamily: 'Rubik-Light',
    fontSize: sizes.h2,
    color: colors.black,
    letterSpacing: -0.5,
    lineHeight: 32,
  },
  h3: {
    // fontFamily: 'Rubik-Light',
    fontSize: sizes.h3,
    color: colors.black,
    letterSpacing: -0.5,
    lineHeight: 32,
  },
  h4: {
    // fontFamily: 'Rubik-Medium',
    fontSize: sizes.h4,
    color: colors.black,
    letterSpacing: -0.5,
    lineHeight: 18,
  },
  paragraph: {
    // fontFamily: 'Rubik-Regular',
    fontSize: sizes.paragraph,
    color: colors.black,
    letterSpacing: -0.5,
    lineHeight: 22,
  },
  paragraphGray: {
    // fontFamily: 'Rubik-Regular',
    fontSize: sizes.paragraph,
    color: colors.gray,
    letterSpacing: -0.5,
    lineHeight: 22,
  },
  paragraphGray2: {
    // fontFamily: 'Rubik-Regular',
    fontSize: sizes.paragraph,
    color: colors.gray2,
    letterSpacing: -0.5,
    lineHeight: 22,
  },
  caption: {
    // fontFamily: 'Rubik-Regular',
    fontSize: sizes.caption,
    color: colors.black3,
    letterSpacing: -0.5,
    lineHeight: 15,
  },
  captionMedium: {
    // fontFamily: 'Rubik-Medium',
    fontSize: sizes.captionMedium,
    color: colors.black3,
    letterSpacing: -0.5,
    lineHeight: 14,
  },
  button: {
    // fontFamily: 'Rubik-Medium',
    fontSize: sizes.font,
    color: colors.white,
    letterSpacing: -0.5,
    lineHeight: 21,
  },
};

export {
  colors,
  sizes,
  fonts,
};