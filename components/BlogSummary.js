// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import BlogBox from './BlogBox';

const styles = theme => ({
  root: {
    '& a': {
      'text-decoration': 'none',
    }
  }
});

function BlogSummary(props) {
  const {classes, entries} = props;

  return (
    <div className={classes.root}>
      <Typography type="display1" align="center" gutterBottom>
        Blog
      </Typography>
      {entries.map(function(post) {
          return <a href={post.link} target="_blank" ><BlogBox post={post} /></a>;
        })
      }
    </div>
  );
}

BlogSummary.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BlogSummary);