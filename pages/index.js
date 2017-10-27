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
      <PageLayout>
        <BlogSummary entries={this.props.entries} />
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
  const res = await fetch('http://localhost:3000' + '/blog/posts?limit=4'); // todo replace with env variable
  const data = await res.json();

  return {
    entries: data,
    viewWidth: (context.res)
                ? undefined
                : document.documentElement.clientWidth,
  }
}

export default withRoot(withStyles(styles)(Index));
