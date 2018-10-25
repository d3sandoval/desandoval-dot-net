import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import CalendarIcon from '@material-ui/icons/Event';
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
  tooltipText: {
    width: 'max-content',
    textAlign: 'center',
  },
});

function fadeIn() {
  return [
    { opacity: '0', offset: 0 },
    { opacity: '1', offset: 1 },
  ];
}

function fadeOut() {
  return [
    { opacity: '1', offset: 0 },
    { opacity: '0', offset: 1 },
  ];
}

class ContactRow extends React.Component {
  state = {
    playState: 'idle',
    hasOpened: false,
  };

  getStyle() {
    // hacky - should fix with redux
    if ((this.state.hasOpened && this.props.open)
        || (this.state.hasOpened && !this.props.open)) {
      return { opacity: 1 };
    }
    return { opacity: 0 };
  }

  getParentStyle() {
    if (!this.props.open && this.state.hasOpened) {
      this.setState({ hasOpened: false });
      return { display: 'block' };
    } if (this.props.open) {
      return { display: 'block' };
    }
    return { display: 'none' };
  }

  getTiming(duration, delay) {
    return {
      duration,
      easing: 'ease-in-out',
      delay: (this.props.open)
        ? delay
        : (this.transitionTime - delay),
      iterations: 1,
      direction: 'alternate',
      fill: 'forwards',
    };
  }

  animateOut = () => {
    /* eslint-disable-next-line no-unused-expressions */
    (this.props.open)
      ? this.setState({ playState: 'idle', hasOpened: true })
      : this.setState({ playState: 'idle', hasOpened: false });
  }

  transitionTime = 100;

  render() {
    const { classes, open } = this.props;

    return (
      <div style={this.getParentStyle()}>
        <Animated.div
          playState={this.state.playState}
          keyframes={(open) ? fadeIn() : fadeOut()}
          timing={this.getTiming(this.transitionTime, 0)}
          style={this.getStyle()}
        >
          <a href="mailto:daniel@desandoval.net">
            <Tooltip classes={{ popper: classes.tooltipText }} title="Email me" placement="left">
              <Button variant="fab" className={classes.emailIcon}>
                <EmailIcon dense="true" />
              </Button>
            </Tooltip>
          </a>
        </Animated.div>
        <Animated.div
          playState={this.state.playState}
          keyframes={(open) ? fadeIn() : fadeOut()}
          timing={this.getTiming(this.transitionTime, this.transitionTime / 2)}
          style={this.getStyle()}
        >
          <a href="tel:+15417198286">
            <Tooltip classes={{ popper: classes.tooltipText }} title="Call me" placement="left">
              <Button variant="fab" className={classes.phoneIcon}>
                <PhoneIcon dense="true" />
              </Button>
            </Tooltip>
          </a>
        </Animated.div>
        <Animated.div
          playState={this.state.playState}
          keyframes={(open) ? fadeIn() : fadeOut()}
          timing={this.getTiming(this.transitionTime, this.transitionTime)}
          onFinish={this.animateOut}
          style={this.getStyle()}
        >
          <a href="https://calendly.com/d3sandoval/30min" target="_blank" rel="noopener noreferrer">
            <Tooltip classes={{ popper: classes.tooltipText }} title="Schedule a call" placement="left">
              <Button variant="fab" className={classes.calendarIcon}>
                <CalendarIcon dense="true" />
              </Button>
            </Tooltip>
          </a>
        </Animated.div>
      </div>

    );
  }
}

ContactRow.defaultProps = {
  classes: {},
};

ContactRow.propTypes = {
  open: PropTypes.bool.isRequired,
  classes: PropTypes.object,
};

export default withStyles(styles)(ContactRow);
