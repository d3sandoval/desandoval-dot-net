// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Audiotrack from 'material-ui-icons/Audiotrack';
import {grey} from 'material-ui/colors';

const styles = theme => ({
  root: {
    marginBottom: 24,
    paddingRight: 24,
    paddingLeft: 8,
    '&:hover': {
      boxShadow: `0 3px 5px 2px ${grey[400]}`
    },
  },
  leftSide: {
    textAlign: 'center',
    height: 160
  },
  albumPlaceholder: {
    height: 80,
    width: 80,
    position: 'relative',
    top: 32,
    color: grey[400],
  },
});

class LastFMRecent extends React.Component {

  render() {
    const {classes, tracks} = this.props;

    return (
      <div>
        {tracks.track.map(function(track) {
          return (
            <a href={track.url} target="_blank" rel="noopener noreferrer">
              <Paper className={classes.root} elevation={4}>
                <Grid container justify="space-between" alignItems="center">
                  <Grid item xs={4} className={classes.leftSide}>
                    {(track.image[2]['#text'])
                    ? <img src={track.image[2]['#text']} height="140px" width="140px" />
                    : <Audiotrack className={classes.albumPlaceholder} />}
                  </Grid>
                  <Grid item xs={8}>
                    <Typography type="headline" component="h3">
                      {track.name}
                    </Typography>
                    <Typography type="body1" component="p">
                      {track.artist['#text']}
                      <br/>
                      {track.date["#text"]}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </a>
          );
        })}
      </div>
    );
  }
}

LastFMRecent.propTypes = {
  tracks: PropTypes.object,
};

export default withStyles(styles)(LastFMRecent);