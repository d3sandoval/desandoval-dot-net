import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-web-animation';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  before: {
    position: 'fixed',
    left: '50%',
    transform: 'translateX(-50%)',
    cursor: 'pointer',
    zIndex: 1,
    '&:hover': {
      opacity: 0.8,
    },
  },
  after: {
    position: 'fixed',
    left: '50%',
    transform: 'translate(-50%, -89%)',
    zIndex: 1,
  },
});

function getKeyFrames(size) {
  return [
    { transform: 'scale(1)', opacity: 1, offset: 0 },
    { transform: 'scale(1)', opacity: 0.75, offset: 0.25 },
    { transform: 'scale(2) translate(-50%, 10%)', opacity: 0.45, offset: 1 },
  ];
}

function getTiming(duration) {
  return {
    duration,
    easing: 'ease-in-out',
    delay: 0,
    iterations: 1,
    direction: 'alternate',
    fill: 'forwards',
  };
}

class Logo extends React.Component {
    state = {
      hasAnimated: false,
      playState: 'paused',
    }

    componentDidUpdate = () => {
      const { homeRoute } = this.props;
      const { hasAnimated } = this.state;
      if (homeRoute && !hasAnimated) {
        this.setState({ playState: 'running', hasAnimated: true });
      }
    }

    handleFinish = () => {
      this.setState({ playState: 'finished' });
    }

    render() {
      const { classes, size } = this.props;
      const { playState, hasAnimated } = this.state;
      return (
        <div className={(hasAnimated) ? classes.after : classes.before}>
          <Animated.div
            keyframes={getKeyFrames(size)}
            timing={getTiming(2000)}
            playState={playState}
            onFinish={this.handleFinish}
          >
            <img
              alt="logo for DESandoval.net"
              width={size}
              height={size}
              src="/img/logo.png"

            />
          </Animated.div>
        </div>
      );
    }
}

Logo.propTypes = {
  classes: PropTypes.object.isRequired,
  homeRoute: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};

export default withStyles(styles)(Logo);
