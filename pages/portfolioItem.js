/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';

/* material-ui */
import withStyles from 'material-ui/styles/withStyles';
import withRoot from '../components/withRoot';

/* my components */
import PageLayout from '../components/PageLayout';

const styles = {};

class PortfolioItem extends Component {

  render() {
    return (
      <PageLayout>
        <h1>{this.props.url.query.title}</h1>
        <p>This is the blog post content.</p>
      </PageLayout>
    )
  }
}

export default withRoot(withStyles(styles)(PortfolioItem));