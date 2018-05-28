import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Chip from 'material-ui/Chip';

const styles = theme => ({
  root: {},
  chip: {
    display: 'inline-block',
    margin: theme.spacing.unit,
  },
});

function PortfolioTags(props) {
  const { classes, tags } = props;

  return (
    <div className={classes.root}>
      {tags.map(tag => (
        <Chip key={tag} label={tag} className={classes.chip} />
        ))}
    </div>
  );
}

PortfolioTags.defaultProps = {
  classes: {},
};

PortfolioTags.propTypes = {
  classes: PropTypes.object,
  tags: PropTypes.array.isRequired,
};

export default withStyles(styles)(PortfolioTags);
