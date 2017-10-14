/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* material-ui */
import withStyles from 'material-ui/styles/withStyles';
import withRoot from '../components/withRoot';

/* my components */
import ButtonAppBar from '../components/ButtonAppBar';
import ProfileImage from '../components/ProfileImage';
import BlogSummary from '../components/BlogSummary';
import EmploymentSummary from '../components/EmploymentSummary';

/* data sources */
import fetch from 'isomorphic-unfetch'

const styles = {
  root: {
    'overflow-x': 'hidden'
  },
};

class Index extends Component {

  handleScroll() {
    var winHeight = window.innerHeight;

    // Annoying to compute doc height due to browser inconsistency
    var body = document.body;
    var html = document.documentElement;
    var docHeight = Math.max( body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight );

    var value = document.body.scrollTop;
    console.log(value);
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        {/*<ButtonAppBar classes=""/>*/
          /* Hiding until the top image is hidden */
        }
        <ProfileImage/>
        <BlogSummary entries={this.props.entries} />
        <EmploymentSummary />
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
