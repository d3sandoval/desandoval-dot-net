// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Tooltip from 'material-ui/Tooltip';
import Button from 'material-ui/Button';
import EmailIcon from 'material-ui-icons/Email';
import PhoneIcon from 'material-ui-icons/Phone';
import CalendarIcon from 'material-ui-icons/Event';
import { Animated } from 'react-web-animation';

const styles = theme => ({
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

class ContactRow extends React.Component {
  transitionTime = 100;

  state = {
    playState: 'idle',
    hasOpened: false, // need redux to make this more robust
  };

  fadeIn() {
    return [
      { opacity: '0', offset: 0 },
      { opacity: '1', offset: 1 },
    ];
  }

  fadeOut() {
    return [
      { opacity: '1', offset: 0 },
      { opacity: '0', offset: 1 },
    ];
  }

  getTiming( duration, delay ) {
    return {
      duration: duration,
      easing: 'ease-in-out',
      delay: (this.props.open)
        ? delay
        : (this.transitionTime - delay),
      iterations: 1,
      direction: 'alternate',
      fill: 'forwards'
    };
  }

  getStyle() {
    // hacky - should fix with redux
    if ((this.state.hasOpened && this.props.open)
        || this.state.hasOpened && !this.props.open) {
      return {opacity: 1}
    } else {
      return {opacity: 0}
    }
  }

  getParentStyle() {
    if(!this.props.open && this.state.hasOpened) {
      return {display: 'block'}
    } else if (this.props.open) {
      return {display: 'block'}
    } else {
      return {display: 'none'}
    }
  }

  animateOut = () => {
    (this.props.open)
      ? this.setState({playState: 'idle', hasOpened: true})
      : this.setState({playState: 'idle', hasOpened: false})
  }

  render () {
    const {classes, open} = this.props;

    return (
      <div style={this.getParentStyle()}>
      <Animated.div playState={this.state.playState}
                    keyframes={(open) ? this.fadeIn() : this.fadeOut()}
                    timing={this.getTiming(this.transitionTime, 0)}
                    style={this.getStyle()}>
        <a href="mailto:daniel@desandoval.net">
          <Tooltip title="Email me" placement="left">
            <Button className={classes.emailIcon} fab color="white">
              <EmailIcon dense={true} />
        </Button></Tooltip></a>
      </Animated.div>
      <Animated.div playState={this.state.playState}
                    keyframes={(open) ? this.fadeIn() : this.fadeOut()}
                    timing={this.getTiming(this.transitionTime, this.transitionTime / 2)}
                    style={this.getStyle()}>
        <a href="tel:+15417198286">
          <Tooltip title="Call me" placement="left">
            <Button className={classes.phoneIcon} fab color="white">
             <PhoneIcon dense={true} />
        </Button></Tooltip></a>
      </Animated.div>
      <Animated.div playState={this.state.playState}
                    keyframes={(open) ? this.fadeIn() : this.fadeOut()}
                    timing={this.getTiming(this.transitionTime, this.transitionTime)}
                    onFinish={this.animateOut}
                    style={this.getStyle()}>
      <a href="https://calendly.com/d3sandoval/30min" target="_blank" rel="noopener noreferrer">
          <Tooltip title="Schedule a call" placement="left">
            <Button className={classes.calendarIcon} fab color="white">
              <CalendarIcon dense={true} />
        </Button></Tooltip></a>
      </Animated.div>
      </div>

    );
  }
}

ContactRow.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default withStyles(styles)(ContactRow);