// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import BlogBox from './BlogBox';

const styles = theme => ({
  root: {
    '& a': {
      'text-decoration': 'none',
    }
  },
  fullLink: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit * 2,
    '& a': {
      color: 'inherit',
      '&:hover': {
        color: theme.palette.primary[500],
      }
    },
  }
});

function BlogSummary(props) {
  const {classes, entries} = props;

  return (
    <div className={classes.root}>
      <Typography type="display1" align="center" gutterBottom>
        Blog
      </Typography>
      <Grid container spacing={8}>
        {entries.map(function(post) {
            return (
              <Grid key={post.link} item xs={12} sm={6}>
                <a href={post.link} target="_blank" >
                  <BlogBox post={post} />
                </a>
              </Grid>
            );
          })
        }
      </Grid>
      <Typography className={classes.fullLink} type="subheading" align="right" gutterBottom>
        <a href="https://blog.desandoval.net/latest" target="_blank">View all...</a>
      </Typography>
    </div>
  );
}

BlogSummary.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BlogSummary);