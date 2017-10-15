// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: {}
});

function HonorsSummary(props) {
  const {classes} = props;

  return (
    <div className={classes.root}>
      <Typography type="display1" align="center" gutterBottom>
        Honors
      </Typography>
    </div>
  );
}

HonorsSummary.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HonorsSummary);