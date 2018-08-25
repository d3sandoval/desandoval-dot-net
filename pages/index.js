import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* data sources */
import fetch from 'isomorphic-unfetch';

/* material-ui */
import withStyles from '@material-ui/core/styles/withStyles';

/* my components */
import HomeHero from '../components/organisms/HomeHero';
import PageLayout from '../templates/PageLayout';
import BlogSummary from '../components/molecules/BlogSummary';
import EmploymentSummary from '../components/organisms/EmploymentSummary';
import PortfolioSummary from '../components/organisms/PortfolioSummary';
import HonorsSummary from '../components/organisms/HonorsSummary';

const styles = {};

class Index extends Component {
  render() {
    return (
      <HomeHero {...this.props} /> // todo pass current location (hash?)
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

  const portfolio = await fetch(`${baseUrl}/portfolio/list?limit=3`);
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
