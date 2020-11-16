import React, { ReactNode } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type from '@material-ui/lab/themeAugmentation';

interface Props {
  themeColors?: { [colorType: string]: string };
  children: ReactNode;
}

const defaultProps = {
  themeColors: {
    primary: '#7289da',
    secondary: '#0e0e0e',
    error: '#f44336',
    warning: '#ff9800',
    info: '#2196f3',
    success: '#4caf50',
  },
};

const ThemeWrapper = ({ themeColors, children }: Props): JSX.Element => {
  const dsoTheme = themeColors && {
    palette: {
      primary: {
        main: themeColors.primary,
      },
      secondary: {
        main: themeColors.secondary,
      },
      error: {
        main: themeColors.error,
      },
      warning: {
        main: themeColors.warning,
      },
      info: {
        main: themeColors.info,
      },
      success: {
        main: themeColors.success,
      },
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          a: {
            color: themeColors.primary,
          },
          'a:hover': {
            color: themeColors.secondary,
          },
        },
      },
      MuiToggleButtonGroup: {
        root: {
          display: 'block',
        },
        groupedHorizontal: {
          '&&:not(:first-child)': {
            '&&:not(:disabled)': {
              borderLeft: `1px solid ${themeColors.primary}`,
            },
          },
        },
      },
      MuiToggleButton: {
        root: {
          border: `1px solid ${themeColors.primary}`,
          color: themeColors.primary,
          '&&:hover': {
            backgroundColor: themeColors.primary,
            color: '#ffffff',
          },
          '&$selected': {
            backgroundColor: themeColors.primary,
            color: '#ffffff',
            '&&:hover': {
              backgroundColor: themeColors.primary,
              color: '#ffffff',
            },
          },
          '&$disabled': {
            border: 0,
          },
        },
      },
      MuiFormControlLabel: {
        root: {
          marginBottom: '-0.5rem',
          marginTop: '-0.5rem',
        },
      },
    },
  };

  return (
    <ThemeProvider theme={createMuiTheme(dsoTheme)}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

ThemeWrapper.defaultProps = defaultProps;

export default ThemeWrapper;
