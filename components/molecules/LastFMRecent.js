import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Audiotrack from '@material-ui/icons/Audiotrack';
import { grey } from '@material-ui/core/colors';

const styles = theme => ({
  root: {
    marginBottom: 24,
    paddingRight: 24,
    paddingLeft: 8,
    '&:hover': {
      boxShadow: `0 3px 5px 2px ${grey[400]}`,
    },
  },
  leftSide: {
    textAlign: 'center',
    height: 160,
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
    const { classes, tracks } = this.props;

    return (
      <div>
        {tracks.track.map(track => (
          <a key={track.url} href={track.url} target="_blank" rel="noopener noreferrer">
            <Paper className={classes.root} elevation={4}>
              <Grid container justify="space-between" alignItems="center">
                <Grid item xs={4} className={classes.leftSide}>
                  {(track.image[2]['#text'])
                    ? <img alt={`${track.album['#text']} album cover`} src={track.image[2]['#text']} height="140px" width="140px" />
                    : <Audiotrack className={classes.albumPlaceholder} />}
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="headline" component="h3">
                    {track.name}
                  </Typography>
                  <Typography variant="body1" component="p">
                    {track.artist['#text']}
                    <br />
                    {(track.date) ? `Played ${track.date['#text']}` : 'Now Playing'}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </a>
        ))}
      </div>
    );
  }
}

LastFMRecent.defaultProps = {
  classes: {},
  tracks: {},
};

LastFMRecent.propTypes = {
  classes: PropTypes.object,
  tracks: PropTypes.shape({
    album: PropTypes.shape({
      '#text': PropTypes.string,
      mbid: PropTypes.string,
    }),
    artist: PropTypes.shape({
      '#text': PropTypes.string,
      mbid: PropTypes.string,
    }),
    date: PropTypes.shape({
      '#text': PropTypes.string,
      mbid: PropTypes.string,
    }),
    image: PropTypes.arrayOf({
      '#text': PropTypes.string, // url
      size: PropTypes.string,
    }),
  }),
};

export default withStyles(styles)(LastFMRecent);
