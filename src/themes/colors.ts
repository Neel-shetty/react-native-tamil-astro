const palette = {
  white: 'white',
  black: 'black',

  //yellow
  primary100: 'rgba(248, 177, 17, 0.05)',
  primary200: 'rgba(254, 239, 207, 0.17)',
  primary500: '#F8B111',
  primary700: '#CC9009',

  //
  secondary100: '#3C3030',

  //red
  accent100: 'rgba(196, 0, 0, 0.05)',
  accent200: 'rgba(196, 0, 0, 0.46)',
  accent500: '#C40000',

  background: '#1E1E1E',

  error100: '#C40000',
};

export const colors = {
  palette,
  transparent: 'rgba(0, 0, 0, 0)',
  text: palette.black,
  background: palette.primary200,
  backgroundDim: palette.primary100,
  border: palette.accent500,
  icon: palette.black,
  error: palette.error100,
};
