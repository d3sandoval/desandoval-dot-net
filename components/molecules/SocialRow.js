import React from 'react';
import {withStyles} from 'material-ui/styles';
import ButtonBase from 'material-ui/ButtonBase';
import GithubIcon from 'mdi-react/GithubCircleIcon';
import TwitterIcon from 'mdi-react/TwitterIcon';
import FacebookIcon from 'mdi-react/FacebookIcon';
import LinkedinIcon from 'mdi-react/LinkedinIcon';
import SpotifyIcon from 'mdi-react/SpotifyIcon';

const styles = theme => ({
  root: {
    paddingTop: 10,
  },
  icon: {
    fill: 'inherit',
    paddingLeft: 8,
    paddingRight: 8,
    path: {
      fill: 'inherit',
    }
  },
  button: {
    fill: '#fafafa',
    '&:hover': {
      fill: theme.palette.primary[500],
    }
  }
});

function SocialRow(props) {
  const {classes} = props;

  return (
    <div className={classes.root}>
      <ButtonBase href="https://github.com/d3sandoval" target="_blank" rel="noopener noreferrer" centerRipple
                  className={classes.button} aria-label="github">
        <GithubIcon className={classes.icon} />
      </ButtonBase>
      <ButtonBase href="https://twitter.com/d3sandoval" target="_blank" rel="noopener noreferrer" centerRipple
                  className={classes.button} aria-label="twitter">
        <TwitterIcon className={classes.icon} />
      </ButtonBase>
      <ButtonBase href="https://open.spotify.com/artist/47mXmNmm2ekoxyCwowItaX" target="_blank" rel="noopener noreferrer" centerRipple
                  className={classes.button} aria-label="spotify">
        <SpotifyIcon className={classes.icon} />
      </ButtonBase>
      <ButtonBase href="https://facebook.com/d3sandoval" target="_blank" rel="noopener noreferrer" centerRipple
                  className={classes.button} aria-label="facebook">
        <FacebookIcon className={classes.icon} />
      </ButtonBase>
      <ButtonBase href="https://linkedin.com/in/d3sandoval" target="_blank" rel="noopener noreferrer" centerRipple
                  className={classes.button} aria-label="linkedin">
        <LinkedinIcon className={classes.icon} />
      </ButtonBase>
    </div>
  );
}

export default withStyles(styles)(SocialRow);