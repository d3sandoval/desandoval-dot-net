import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* material-ui */
import withStyles from 'material-ui/styles/withStyles';

/* my components */
import PageLayout from '../templates/PageLayout';
import PortfolioGridList from '../components/molecules/PortfolioGridList';

const styles = {};

class Portfolio extends Component {
  render() {
    return (
      <PageLayout currentPage={this.props.pathName}>
        <PortfolioGridList tileData={this.props.portfolioEntries} large />
      </PageLayout>
    );
  }
}

Portfolio.propTypes = {
  pathName: PropTypes.string.isRequired,
  portfolioEntries: PropTypes.object.isRequired,
};

/* eslint-disable-next-line func-names */
Portfolio.getInitialProps = async function (context) {
  const baseUrl = context.res ? `http://localhost:${process.env.PORT}` : '';

  const portfolio = await fetch(`${baseUrl}/portfolio/list`);
  const portfolioData = await portfolio.json();

  return {
    portfolioEntries: portfolioData,
  };
};

export default withStyles(styles)(Portfolio);
