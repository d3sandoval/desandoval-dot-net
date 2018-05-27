import ReactGA from 'react-ga';

export const initAnalytics = () => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.initialize('UA-42632397-1');
  } else {
    console.log('initAnalytics was called');
  }
};

export const logPageView = (path) => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.set({ page: path });
    ReactGA.pageview(path);
  } else {
    console.log('logPageView was called with the following data:');
    console.log(path);
  }
};

export const logEvent = (category = '', action = '') => {
  if (process.env.NODE_ENV === 'production') {
    if (category && action) {
      ReactGA.event({ category, action });
    }
  } else {
    console.log('logEvent was called with the following data:');
    console.log({ category, action });
  }
};

export const logException = (description = '', fatal = false) => {
  if (process.env.NODE_ENV === 'production') {
    if (description) {
      ReactGA.exception({ description, fatal });
    } else {
      console.log('logException was called with the following data:');
      console.log({ description, fatal });
    }
  }
};
