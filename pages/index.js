import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import EventListener, { withOptions } from 'react-event-listener';

/* data sources */
import fetch from 'isomorphic-unfetch';

/* material-ui */
import withStyles from '@material-ui/core/styles/withStyles';

/* my components */
import HomeHero from '../components/organisms/HomeHero';

const styles = {};

class Index extends Component {
  state = {};

  handleResize = debounce(() => {
    const height = document.documentElement.clientHeight;
    this.setState({ viewHeight: height });
  }, 166);

  componentDidMount() {
    if (document && !this.state.viewHeight) {
      // this will be undefined when using SSR - set it here just in case
      /* eslint-disable-next-line react/no-did-mount-set-state */
      this.setState({ viewHeight: document.documentElement.clientHeight });
    }
  }


  render() {
    return (
      <React.Fragment>
        <EventListener
          target="window"
          onResize={withOptions(this.handleResize, { passive: true, capture: false })}
        />
        <HomeHero {...this.props} viewHeight={this.state.viewHeight} />
      </React.Fragment>
    );
  }
}

Index.propTypes = {
  pathName: PropTypes.string.isRequired,
  portfolioEntries: PropTypes.array.isRequired,
};

/* eslint-disable-next-line func-names */
Index.getInitialProps = async function (context) {
  const baseUrl = context.res ? `http://localhost:${process.env.PORT}` : '';
  let homeRoute;
  if (context.query) {
    // eslint-disable-next-line prefer-destructuring
    homeRoute = Object.keys(context.query)[0];
  }

  const portfolio = await fetch(`${baseUrl}/portfolio/list?featured=true`);
  const portfolioData = await portfolio.json();

  return {
    homeRoute,
    portfolioEntries: portfolioData,
    viewWidth: (context.res)
      ? undefined
      : document.documentElement.clientWidth,
  };
};

export default withStyles(styles)(Index);
