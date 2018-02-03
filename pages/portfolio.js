/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';

/* material-ui */
import withStyles from 'material-ui/styles/withStyles';
import withRoot from '../templates/withRoot';
import Grid from 'material-ui/Grid';

/* my components */
import PageLayout from '../templates/PageLayout';
import PortfolioGridList from '../components/molecules/PortfolioGridList';

const styles = {};

class Portfolio extends Component {

  render() {

    return (
      <PageLayout currentPage={this.props.url.pathname}>
        <PortfolioGridList tileData={this.props.portfolioEntries} large={true} />
      </PageLayout>
    )
  }
}

Portfolio.getInitialProps = async function(context) {
  const baseUrl = context.res ? `http://localhost:${process.env.PORT}` : '';

  const portfolio = await fetch(baseUrl + '/portfolio/list');
  const portfolioData = await portfolio.json();

  return {
    portfolioEntries: portfolioData,
  }
};

export default withRoot(withStyles(styles)(Portfolio));