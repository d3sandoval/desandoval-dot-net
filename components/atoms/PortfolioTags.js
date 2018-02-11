import React from 'react';
import {withStyles} from 'material-ui/styles';
import Chip from 'material-ui/Chip';

const styles = theme => ({
  root: {},
  chip: {
    display: 'inline-block',
    margin: theme.spacing.unit,
  },
});

function PortfolioTags(props) {
  const {classes, tags} = props;

  return (
    <div className={classes.root}>
      {tags.map(function(tag) {
        return (
          <Chip key={tag} label={tag} className={classes.chip} />
        );
      })}
    </div>
  );
}

export default withStyles(styles)(PortfolioTags);