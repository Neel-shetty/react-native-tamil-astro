const palette = {
  white: 'white',
  black: 'black',
  red: '#FF0000',

  //yellow
  primary100: 'rgba(248, 177, 17, 0.05)',
  primary200: 'rgba(254, 239, 207, 0.17)',
  primary300: 'rgba(248, 177, 17, 0.20)',
  primary500: '#F8B111',
  primary700: '#CC9009',

  //
  secondary100: '#3C3030',

  //red
  accent100: 'rgba(196, 0, 0, 0.05)',
  accent200: 'rgba(196, 0, 0, 0.46)',
  accent500: '#C40000',

  background: '#1E1E1E',

  buttonText: '#3C3030',

  underline: '#595151',

  blackOpacity10: 'rgba(0, 0, 0, 0.1)',
  gray: '#B2AAAA',
  gray300: '#343030',
  darkGray: '#504C4C',

  error100: '#FF0909',
} as const;

export const colors = {
  palette,
  transparent: 'rgba(0, 0, 0, 0)',
  text: palette.black,
  textStroke: '#F2EAEA',
  background: palette.primary200,
  backgroundDim: palette.primary100,
  backgroundDimBorder: 'rgba(0, 0, 0, 0.05)',
  border: palette.accent500,
  icon: palette.black,
  error: palette.error100,
} as const;
