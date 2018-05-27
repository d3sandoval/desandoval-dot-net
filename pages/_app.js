import App, {Container} from 'next/app'
import React from 'react';
import ReactGA from 'react-ga';
import NProgress from 'nprogress';
import Router from 'next/router'

// google analytics page tracking
if (process.env.NODE_ENV === 'production') {
  ReactGA.initialize('UA-42632397-1');
}

// loading animation
Router.onRouteChangeStart = (url) => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

export default class MyApp extends App {

  static async getInitialProps ({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return {pageProps}
  }

  render () {
    const {Component, pageProps} = this.props;
    return <Container>
        <Component {...pageProps} />
    </Container>
  }
}