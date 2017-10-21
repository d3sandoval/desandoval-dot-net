// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: {},
});

function SectionTitle(props) {
  const {classes, divider, title} = props;

  return (
    <div className={classes.root}>
      {divider &&
        <Divider light style={{marginBottom: 24}} className="divider" />
      }
      <Typography id={title} type="display1" align="center" gutterBottom>
        {title}
      </Typography>
    </div>
  );
}

SectionTitle.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired, // title of section
  // divider: PropTypes.bool.isRequired, // true/false
};

export default withStyles(styles)(SectionTitle);