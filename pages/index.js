/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProfileImage from '../components/ProfileImage';
import ButtonAppBar from '../components/ButtonAppBar';
import Typography from 'material-ui/Typography';
import withStyles from 'material-ui/styles/withStyles';
import withRoot from '../components/withRoot';

const styles = {

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
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));
