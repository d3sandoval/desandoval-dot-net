/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import {withRouter} from "next/router";

/* material-ui */
import withStyles from 'material-ui/styles/withStyles';
import withRoot from '../templates/withRoot';

/* my components */
import PageLayout from '../templates/PageLayout';
import PortfolioGridList from '../components/molecules/PortfolioGridList';

const styles = {};

class Portfolio extends Component {

  render() {

    return (
      <PageLayout currentPage={this.props.router.pathname}>
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

export default withRouter(withRoot(withStyles(styles)(Portfolio)));