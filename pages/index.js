/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* material-ui */
import withStyles from 'material-ui/styles/withStyles';
import withRoot from '../components/withRoot';

/* my components */
import PageLayout from '../components/PageLayout';
import BlogSummary from '../components/BlogSummary';
import EmploymentSummary from '../components/EmploymentSummary';
import PortfolioSummary from '../components/PortfolioSummary';
import HonorsSummary from '../components/HonorsSummary';

/* data sources */
import fetch from 'isomorphic-unfetch'

const styles = {};

class Index extends Component {

  render() {
    return (
      <PageLayout currentPage={this.props.url.pathname} pageType="home">
        <BlogSummary entries={this.props.blogPosts} />
        <EmploymentSummary />
        <PortfolioSummary entries={this.props.portfolioEntries} />
        <HonorsSummary />
      </PageLayout>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};


Index.getInitialProps = async function(context) {
  const baseUrl = context.res ? `http://localhost:${process.env.PORT}` : '';

  const blog = await fetch(baseUrl + '/blog/posts?limit=4');
  const blogData = await blog.json();

  const portfolio = await fetch(baseUrl + '/portfolio/list?limit=3');
  const portfolioData = await portfolio.json();

  return {
    blogPosts: blogData,
    portfolioEntries: portfolioData,
    viewWidth: (context.res)
                ? undefined
                : document.documentElement.clientWidth,
  }
};

export default withRoot(withStyles(styles)(Index));
