// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';

const styles = theme => ({
  root: {}
});

function HonorsBox(props) {
  const {classes} = props;

  return (
    <div className={classes.root}>

    </div>
  );
}

HonorsBox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HonorsBox);