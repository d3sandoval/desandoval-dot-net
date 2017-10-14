// @flow weak
/* eslint-disable no-underscore-dangle */

import { create, SheetsRegistry } from 'jss';
import preset from 'jss-preset-default';
import { createMuiTheme } from 'material-ui/styles';
import createGenerateClassName from 'material-ui/styles/createGenerateClassName';

export const daniGreen = {
  50: '#eff7ea',
  100: '#d6eccb',
  200: '#bbdfa8',
  300: '#a0d285',
  400: '#8bc96b',
  500: '#77bf51',
  600: '#6fb94a',
  700: '#64b140',
  800: '#5aa937',
  900: '#479b27',
  A100: '#e4ffdb',
  A200: '#beffa8',
  A400: '#98ff75',
  A700: '#85ff5c',
  'contrastDefaultColor': 'dark',
};

export const daniPurple = {
  50: '#f9ebee',
  100: '#efccd4',
  200: '#e5abb7',
  300: '#db899a',
  400: '#d36f85',
  500: '#cb566f',
  600: '#c64f67',
  700: '#be455c',
  800: '#b83c52',
  900: '#ac2b40',
  A100: '#ffeef0',
  A200: '#ffbbc5',
  A400: '#ff8899',
  A700: '#ff6e83',
  'contrastDefaultColor': 'light',
};

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: daniGreen,
    secondary: daniPurple
  },
  typography: {
    fontFamily: '"Raleway","Helvetica Neue",Arial,sans-serif',
  }
});

// Configure JSS
const jss = create(preset());
jss.options.createGenerateClassName = createGenerateClassName;

function createContext() {
  return {
    jss,
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
  };
}

export default function getContext() {
  // Make sure to create a new store for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return createContext();
  }

  // Reuse context on the client-side
  if (!global.__INIT_MATERIAL_UI__) {
    global.__INIT_MATERIAL_UI__ = createContext();
  }

  return global.__INIT_MATERIAL_UI__;
}
