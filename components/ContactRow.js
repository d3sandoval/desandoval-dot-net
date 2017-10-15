// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import EmailIcon from 'material-ui-icons/Email';
import PhoneIcon from 'material-ui-icons/Phone';
import CalendarIcon from 'material-ui-icons/Event';

const styles = theme => ({
  root: {
    webkitTransition: 'all .5s ease-in-out',
    mozTransition: 'all .5s ease-in-out',
    oTransition: 'all .5s ease-in-out',
    transition: 'all .5s ease-in-out',
  }, // Todo make this relative to the parent (instead of absolute)
  emailIcon: {
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shorter,
      easing: theme.transitions.easing.easeOut,
    }),
    margin: theme.spacing.unit,
    width: 40,
    height: 40,
    position: 'fixed',
    bottom: 84,
    right: 24,
    zIndex: 100,
  },
  phoneIcon: {
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shorter,
      easing: theme.transitions.easing.easeOut,
    }),
    margin: theme.spacing.unit,
    width: 40,
    height: 40,
    position: 'fixed',
    bottom: 136,
    right: 24,
    zIndex: 100,
  },
  calendarIcon: {
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shorter,
      easing: theme.transitions.easing.easeOut,
    }),
    margin: theme.spacing.unit,
    width: 40,
    height: 40,
    position: 'fixed',
    bottom: 188,
    right: 24,
    zIndex: 100,
  },
});

function ContactRow(props) {
  const {classes} = props;

  return (
    <div className={classes.root}>
      <a href="mailto:daniel@desandoval.net"><Button className={classes.emailIcon} fab color="white">
        <EmailIcon dense={true} />
      </Button></a>
      <a href="tel:+15417198286"><Button className={classes.phoneIcon} fab color="white">
        <PhoneIcon dense={true} />
      </Button></a>
      <a href="https://calendly.com/d3sandoval/30min" target="_blank" rel="noopener noreferrer"><Button className={classes.calendarIcon} fab color="white">
        <CalendarIcon dense={true} />
      </Button></a>
    </div>
  );
}

ContactRow.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContactRow);