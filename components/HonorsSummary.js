// @flow weak

import React from 'react';
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

export default withStyles(styles)(HonorsSummary);