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
      <HomeHero /> // todo pass current location (hash?)
    );
  }
}

Index.propTypes = {
  pathName: PropTypes.string.isRequired,
  blogPosts: PropTypes.array.isRequired,
  portfolioEntries: PropTypes.array.isRequired,
};

/* eslint-disable-next-line func-names */
Index.getInitialProps = async function (context) {
  const baseUrl = context.res ? `http://localhost:${process.env.PORT}` : '';

  const blog = await fetch(`${baseUrl}/blog/posts?limit=4`);
  const blogData = await blog.json();

  const portfolio = await fetch(`${baseUrl}/portfolio/list?limit=3`);
  const portfolioData = await portfolio.json();

  return {
    blogPosts: blogData,
    portfolioEntries: portfolioData,
    viewWidth: (context.res)
      ? undefined
      : document.documentElement.clientWidth,
  };
};

export default withStyles(styles)(Index);
