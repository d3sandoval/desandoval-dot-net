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
import Footer from '../components/Footer';

/* data sources */
import fetch from 'isomorphic-unfetch'

const styles = {};

class Index extends Component {

  render() {
    return (
      <PageLayout pageType="home">
        <BlogSummary entries={this.props.blogPosts} />
        <EmploymentSummary />
        <PortfolioSummary />
        {/*<HonorsSummary />*/}
        <Footer />
      </PageLayout>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};


Index.getInitialProps = async function(context) {
  const blog = await fetch('http://localhost:3000' + '/blog/posts?limit=4'); // todo replace with env variable
  const blogData = await blog.json();

  const portfolio = await fetch('http://localhost:3000' + '/portfolio/list');
  const portfolioData = await portfolio.json();
  // console.log(portfolioData);

  return {
    blogPosts: blogData,
    portfolioEntries: portfolioData,
    viewWidth: (context.res)
                ? undefined
                : document.documentElement.clientWidth,
  }
}

export default withRoot(withStyles(styles)(Index));
