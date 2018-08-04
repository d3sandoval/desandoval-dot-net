import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import getContext from '../styles/getContext';
import { initAnalytics, logPageView } from '../lib/analytics';

initAnalytics();

// Apply some reset
const styles = theme => ({
  '@global': {
    html: {
      background: theme.palette.background.default,
      WebkitFontSmoothing: 'antialiased', // Antialiasing.
      MozOsxFontSmoothing: 'grayscale', // Antialiasing.
    },
    body: {
      margin: 0,
    },
    a: {
      textDecoration: 'none',
      color: theme.palette.primary[500],
      '&:hover': {
        color: theme.palette.secondary[300],
      },
    },
    blockquote: {
      paddingLeft: 15,
      borderLeft: '3px solid #ccc',
    },
  },
});

let AppWrapper = props => props.children;

AppWrapper = withStyles(styles)(AppWrapper);

function withRoot(BaseComponent) {
  class WithRoot extends Component {
    static getInitialProps(ctx) {
      if (BaseComponent.getInitialProps) {
        return BaseComponent.getInitialProps(ctx);
      }

      return {};
    }

    componentWillMount() {
      this.styleContext = getContext();
    }

    componentDidMount() {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
      logPageView(this.props.router.asPath);
    }

    render() {
      // get the path name while we still have a router
      console.log(this.props.router);
      if (this.props.router.asPath) {
        this.props.pageProps.pathName = this.props.router.asPath;
      }

      return (
        <MuiThemeProvider
          theme={this.styleContext.theme}
          sheetsManager={this.styleContext.sheetsManager}
        >
          <AppWrapper>
            <BaseComponent {...this.props} />
          </AppWrapper>
        </MuiThemeProvider>
      );
    }
  }

  WithRoot.propTypes = {
    router: PropTypes.object.isRequired,
    pageProps: PropTypes.object.isRequired,
  };

  return WithRoot;
}

export default withRoot;
