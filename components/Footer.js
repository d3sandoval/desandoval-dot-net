// @flow weak

import React from 'react';
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import SocialRow from './SocialRow';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.appBar,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 24,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  footerContent: {
    width: 'calc(100% - 88px)'
  },
  footerLeft: {
    paddingTop: 12,
    marginBottom: 8,
    '& a': {
      textDecoration: 'none',
      color: theme.palette.primary[500],
      '&:hover': {
        color: theme.palette.secondary[300],
      }
    }
  },
});

function Footer(props) {
  const {classes} = props;

  return (
    <div className={classes.root}>
      <Grid container justify='space-between' className={classes.footerContent}>
        <Typography xs={12} md={4} className={classes.footerLeft}>
          © 2017 Daniel E. Sandoval ( <a href="https://github.com/d3sandoval/desandoval-dot-net"
                                         target="_blank" rel="noopener noreferrer">Source Code</a> | <a
                                          href="https://spdx.org/licenses/CC-BY-ND-4.0.html"
                                          target="_blank" rel="noopener noreferrer">CC-BY-ND-4.0</a> )
        </Typography>
        <SocialRow xs={12} md={4} />
      </Grid>
    </div>
  );
}

export default withStyles(styles)(Footer);