/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* material-ui */
import withStyles from 'material-ui/styles/withStyles';
import withRoot from '../templates/withRoot';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

/* my components */
import PageLayout from '../templates/PageLayout';
import LastFMRecent from '../components/molecules/LastFMRecent';
import BlogBox from '../components/atoms/BlogBox';

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
            <Typography variant="display2" gutterBottom>Listening To</Typography>
            <LastFMRecent tracks={this.props.recentTracks} />
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography variant="display2" gutterBottom>Reading</Typography>
            {this.props.wallabagData.map(function(post) {
                return (
                  <a key={post.link} href={post.link} target="_blank" rel="noopener noreferrer">
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
  const baseUrl = context.res ? `http://localhost:${process.env.PORT}` : '';

  const getRecentTracks = await fetch(baseUrl + '/lastfm/recent?limit=5');
  const recentTracks = await getRecentTracks.json();

  const wallabag = await fetch(baseUrl + '/wallabag/recent?limit=8');
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
