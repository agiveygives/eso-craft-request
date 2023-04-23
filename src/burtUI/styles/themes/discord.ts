const colors = {
  blurple: '#7289da',
  white: '#e0e0e0',
  greyple: '#99aab5',
  lessdark: '#3b3b3b',
  dark: '#2c2f33',
  darker: '#23272a1',
};

const discordTheme = {
  '--primary': colors.blurple,
  '--light': colors.white,

  /* button variables */
  '--button-primary-background': colors.white,

  /* card variables */
  '--card--background-color': colors.dark,
  '--card--color': colors.white,

  /* footer variables */
  '--footer--background-color': 'black',
  '--footer--color': colors.white,

  /* header variables */
  '--header-background': colors.blurple,
  '--header-background-scroll': colors.blurple,
  '--header-height': '64px',
  '--header-padding-top': '10px',
  '--header-padding-right': '24px',
  '--header-padding-bottom': '10px',
  '--header-padding-left': '24px',
  '--header-logo-width': '40px',

  /* input */
  '--input--background-color': colors.lessdark,
  '--input--color': colors.white,

  /* section header variables */
  '--section-header--background-color': colors.blurple,
  '--section-header--color': colors.dark,

  /* switch variables */
  '--switch--checked--background-color': colors.blurple,
};

export default discordTheme;
