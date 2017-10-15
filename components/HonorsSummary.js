// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import SectionTitle from './SectionTitle';

const styles = theme => ({
  root: {}
});

function HonorsSummary(props) {
  const {classes} = props;

  return (
    <div className={classes.root}>
      <SectionTitle title="Honors" divider={true} />
    </div>
  );
}

HonorsSummary.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HonorsSummary);