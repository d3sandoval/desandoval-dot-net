/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* material-ui */
import withStyles from 'material-ui/styles/withStyles';
import withRoot from '../components/withRoot';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

/* my components */
import PageLayout from '../components/PageLayout';
import LastFMRecent from '../components/LastFMRecent';
import BlogBox from '../components/BlogBox';

/* data sources */
import fetch from 'isomorphic-unfetch'

const styles = {
  root: {
    marginTop: 24,
    paddingLeft: 16,
    paddingRight: 16,
  }
};

// todo websockets or long polling for auto-updating page
class Iam extends Component {

  render() {
    const {classes} = this.props;

    return (
      <PageLayout currentPage={this.props.url.pathname}>
        <Grid container spacing={24} className={classes.root}>
          <Grid item md={6} xs={12}>
            <Typography type="display2" gutterBottom>Listening To</Typography>
            <LastFMRecent tracks={this.props.recentTracks} />
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography type="display2" gutterBottom>Reading</Typography>
            {this.props.wallabagData.map(function(post) {
                return (
                  <a href={post.link} target="_blank" rel="noopener noreferrer">
                    <BlogBox post={post} />
                  </a>
                )})}
          </Grid>
        </Grid>
      </PageLayout>
    );
  }
}

Iam.propTypes = {
  classes: PropTypes.object.isRequired,
};


Iam.getInitialProps = async function(context) {
  const getRecentTracks = await fetch('http://localhost:3000' + '/lastfm/recent?limit=5');
  const recentTracks = await getRecentTracks.json();

  const wallabag = await fetch('http://localhost:3000' + '/wallabag/recent?limit=7');
  const wallabagData = await wallabag.json();

  return {
    recentTracks: JSON.parse(recentTracks).recenttracks,
    wallabagData: wallabagData,
    viewWidth: (context.res)
                ? undefined
                : document.documentElement.clientWidth,
  }
};

export default withRoot(withStyles(styles)(Iam));
