import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    '& img': {
      height: 50,
    },
    '& a': {
      color: '#fff',
      '&:hover': {
        color: theme.palette.primary[500],
      },
    },
    textAlign: 'center',
    marginBottom: 16,
  },
  linkText: {
    color: 'inherit',
  },
});

function HonorsBox(props) {
  const { classes, details } = props;

  return (
    <div className={classes.root}>
      <a href={details.url} target="_blank" rel="noopener noreferrer">
        <img src={details.logo} alt={`${details.organization} logo`} />
        <Typography variant="title" className={classes.linkText}>
          {details.title}
        </Typography>
        <Typography variant="subheading" className={classes.linkText} gutterBottom>
          {details.organization}
        </Typography>
      </a>
      <Typography variant="body1">
        {details.description}
      </Typography>
    </div>
  );
}

HonorsBox.defaultProps = {
  classes: {},
};

HonorsBox.propTypes = {
  classes: PropTypes.object,
  details: PropTypes.object.isRequired,
};

export default withStyles(styles)(HonorsBox);
