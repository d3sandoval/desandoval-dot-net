/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* material-ui */
import withStyles from 'material-ui/styles/withStyles';
import withRoot from '../components/withRoot';
import ButtonAppBar from '../components/ButtonAppBar';
import Typography from 'material-ui/Typography';

/* my components */
import ProfileImage from '../components/ProfileImage';
import BlogSummary from '../components/BlogSummary';

/* data sources */
import fetch from 'isomorphic-unfetch'

const styles = {
  root: {},
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
      <div>
        {/*<ButtonAppBar classes=""/>*/
          /* Hiding until the top image is hidden */
        }
        <ProfileImage/>
        <BlogSummary classes="" entries={this.props.entries} />
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};




Index.getInitialProps = async function(context) {
  const res = await fetch('http://localhost:3000' + '/blog/posts'); // todo replace with env variable
  const data = await res.json();

  return {
    entries: data
  }
}

export default withRoot(withStyles(styles)(Index));
