import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* material-ui */
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

/* data sources */
import fetch from 'isomorphic-unfetch';

/* my components */
import PageLayout from '../templates/PageLayout';
import LastFMRecent from '../components/molecules/LastFMRecent';
import BlogBox from '../components/atoms/BlogBox';
import BlogSummary from '../components/molecules/BlogSummary';

const styles = {
  root: {
    marginTop: 24,
    paddingLeft: 16,
    paddingRight: 16,
  },
};

// todo websockets or long polling for auto-updating page
class Iam extends Component {
  render() {
    const { classes } = this.props;

    return (
      <PageLayout currentPage={this.props.pathName}>

        <Grid container spacing={24} className={classes.root}>
          <Grid item xs={12}>
            <Typography variant="display1" gutterBottom>Writing</Typography>
            <BlogSummary entries={this.props.blogPosts} />
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography variant="display1" gutterBottom>Listening To</Typography>
            <LastFMRecent tracks={this.props.recentTracks} />
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography variant="display1" gutterBottom>Reading</Typography>
            {this.props.wallabagData.map(post => (
              <a key={post.link} href={post.link} target="_blank" rel="noopener noreferrer">
                <BlogBox post={post} />
              </a>
            ))}
          </Grid>
        </Grid>
      </PageLayout>
    );
  }
}

Iam.propTypes = {
  classes: PropTypes.object.isRequired,
  pathName: PropTypes.string.isRequired,
  recentTracks: PropTypes.object.isRequired,
  wallabagData: PropTypes.array.isRequired,
};

/* eslint-disable-next-line func-names */
Iam.getInitialProps = async function (context) {
  const baseUrl = context.res ? `http://localhost:${process.env.PORT}` : '';

  const blog = await fetch(`${baseUrl}/blog/posts?limit=4`);
  const blogData = await blog.json();

  const getRecentTracks = await fetch(`${baseUrl}/lastfm/recent?limit=5`);
  const recentTracks = await getRecentTracks.json();

  const wallabag = await fetch(`${baseUrl}/wallabag/recent?limit=8`);
  const wallabagData = await wallabag.json();

  return {
    blogPosts: blogData,
    recentTracks: JSON.parse(recentTracks).recenttracks,
    wallabagData,
    viewWidth: (context.res)
      ? undefined
      : document.documentElement.clientWidth,
  };
};

export default withStyles(styles)(Iam);
