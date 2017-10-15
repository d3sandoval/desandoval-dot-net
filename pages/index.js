/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* material-ui */
import withStyles from 'material-ui/styles/withStyles';
import withRoot from '../components/withRoot';

/* my components */
import ButtonAppBar from '../components/ButtonAppBar';
import ContactButton from '../components/ContactButton';
import ProfileImage from '../components/ProfileImage';
import BlogSummary from '../components/BlogSummary';
import EmploymentSummary from '../components/EmploymentSummary';
import PortfolioSummary from '../components/PortfolioSummary';
import HonorsSummary from '../components/HonorsSummary';

/* data sources */
import fetch from 'isomorphic-unfetch'

const styles = {
  root: {
    'overflow-x': 'hidden'
  },
};

class Index extends Component {

  render() {
    return (
      <div className={this.props.classes.root}>
        <ButtonAppBar />
        <ContactButton />
        <ProfileImage />
        <BlogSummary entries={this.props.entries} />
        <EmploymentSummary />
        <PortfolioSummary />
        <HonorsSummary />
      </div>
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
    entries: data
  }
}

export default withRoot(withStyles(styles)(Index));
