import App, { Container } from 'next/app';
import React from 'react';
import NProgress from 'nprogress';
import Router from 'next/router';
import withRoot from '../templates/withRoot';
import '@babel/polyfill';

// loading animation
Router.onRouteChangeStart = (url) => {
  if (!url.startsWith('/?')) {
    NProgress.start();
  }
};
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default withRoot(MyApp);
