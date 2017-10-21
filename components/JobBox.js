// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  jobLogo: {
    width: '50%',
  },
  description: {
    textAlign: 'left',
    [theme.breakpoints.up('lg')]: {
      paddingRight: theme.spacing.unit *4,
      paddingLeft: theme.spacing.unit *4,
    },
    [theme.breakpoints.down('lg')]: {
      paddingRight: theme.spacing.unit *2,
      paddingLeft: theme.spacing.unit *2,
    },
    [theme.breakpoints.down('xs')]: {
      paddingRight: 0,
      paddingLeft: 0,
    },
    '& li': {
      marginBottom:theme.spacing.unit,
    }
  },
});

// prints the string passed in as the props.description
// or formats a passed in list as an html list
function printDescription(description) {
  if (typeof description === 'string') {
    return description;
  } else {
    return (<ul>
      {description.map(function(listItem) {
        return (
          <li key={listItem}>{listItem}</li>
        );
      })}
    </ul>);
  }
}

function JobBox(props) {
  const {classes, job} = props;

  return (
    <div>
      <Paper style={{boxShadow: `0 3px 5px 2px ${job.color}`}} className={classes.root} elevation={4}>
        <a href={job.website} target="_blank" rel="noopener noreferrer">
          <img className={classes.jobLogo} src={job.logo} />
        </a>
        <Typography type="headline" component="h3">
          {job.title}
        </Typography>
        <Typography className={classes.description} type="body1" component="span">
          {printDescription(job.description)}
        </Typography>
      </Paper>
    </div>
  );
}

JobBox.propTypes = {
  classes: PropTypes.object.isRequired,
  job: PropTypes.object.isRequired,
};

export default withStyles(styles)(JobBox);