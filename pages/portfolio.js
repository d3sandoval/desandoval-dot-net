/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';

/* material-ui */
import withStyles from 'material-ui/styles/withStyles';
import withRoot from '../components/withRoot';
import Grid from 'material-ui/Grid';

/* my components */
import PageLayout from '../components/PageLayout';
import PortfolioSummary from '../components/PortfolioSummary';

const styles = {};

class Portfolio extends Component {

  render() {

    return (
      <PageLayout>
        <PortfolioSummary entries={this.props.portfolioEntries} />
      </PageLayout>
    )
  }
}

Portfolio.getInitialProps = async function(context) {

  const portfolio = await fetch('http://localhost:3000' + '/portfolio/list?limit=3');
  const portfolioData = await portfolio.json();

  return {
    portfolioEntries: portfolioData,
  }
};

export default withRoot(withStyles(styles)(Portfolio));