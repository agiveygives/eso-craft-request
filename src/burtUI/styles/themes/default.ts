const colors = {
  caribbeanCurrent: '#156064',
	mint: '#00c49a',
	naplesYellow: '#f8e16c',
	melon: '#ffc2b4',
	coral: '#fb8f67',
	white: '#f2f2f2',
};

const defaultTheme =  {
  '--primary': colors.mint,

  /* Card Variables */
  '--card--background-color': colors.white,
  '--card--color': colors.caribbeanCurrent,
  '--card--padding': '15px',

  /* Header Variables */
  '--header-background': colors.white,
  '--header-background-scroll': colors.mint,
  '--header-height': '60px',
  '--header-padding-top': '10px',
  '--header-padding-right': '24px',
  '--header-padding-bottom': '10px',
  '--header-padding-left': '24px',
  '--header-logo-width': '40px',

  /* switch variables */
  '--switch--checked--background-color': colors.mint,
};

export default defaultTheme;
