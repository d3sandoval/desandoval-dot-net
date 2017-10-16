// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import ButtonBase from 'material-ui/ButtonBase';
import GithubIcon from 'mdi-react/GithubIcon'
import TwitterIcon from 'mdi-react/TwitterIcon'
import FacebookIcon from 'mdi-react/FacebookIcon'
import LinkedinIcon from 'mdi-react/LinkedinIcon'

const styles = theme => ({
  root: {
    paddingTop: 10,
  },
  icon: {
    fill: 'inherit',
  },
  button: {
    fill: theme.palette.common.darkWhite,
    '&:hover': {
      fill: theme.palette.primary[500],
    }
  }
});

function SocialRow(props) {
  const {classes} = props;

  return (
    <div className={classes.root}>
      <ButtonBase centerRipple
                  keyboardFocusedClassName={classes.keyboardFocused}
                  className={classes.button} aria-label="github">
        <GithubIcon className={classes.icon} />
      </ButtonBase>
      <ButtonBase centerRipple
                  keyboardFocusedClassName={classes.keyboardFocused}
                  className={classes.button} aria-label="twitter">
        <TwitterIcon className={classes.icon} />
      </ButtonBase>
      <ButtonBase centerRipple
                  keyboardFocusedClassName={classes.keyboardFocused}
                  className={classes.button} aria-label="facebook">
        <FacebookIcon className={classes.icon} />
      </ButtonBase>
      <ButtonBase centerRipple
                  keyboardFocusedClassName={classes.keyboardFocused}
                  className={classes.button} aria-label="linkedin">
        <LinkedinIcon className={classes.icon} />
      </ButtonBase>
    </div>
  );
}

SocialRow.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SocialRow);