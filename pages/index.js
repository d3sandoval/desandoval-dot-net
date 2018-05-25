/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withRouter} from "next/router";

/* material-ui */
import withStyles from 'material-ui/styles/withStyles';
import withRoot from '../templates/withRoot';

/* my components */
import PageLayout from '../templates/PageLayout';
import BlogSummary from '../components/molecules/BlogSummary';
import EmploymentSummary from '../components/organisms/EmploymentSummary';
import PortfolioSummary from '../components/organisms/PortfolioSummary';
import HonorsSummary from '../components/organisms/HonorsSummary';

/* data sources */
import fetch from 'isomorphic-unfetch'

const styles = {};

class Index extends Component {

  render() {
    return (
      <PageLayout currentPage={this.props.router.pathname} pageType="home">
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

export default withRouter(withRoot(withStyles(styles)(Index)));
