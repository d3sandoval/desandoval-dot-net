import React from 'react';
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

class Logo extends React.Component {
    state = {
      hasAnimated: false,
      playState: 'paused',
    }

    getKeyFrames(size) {
      return [
        { transform: 'scale(1)', opacity: 1, offset: 0 },
        { transform: 'scale(1)', opacity: 0.75, offset: 0.25 },
        { transform: 'scale(2) translate(-50%, 10%)', opacity: 0.45, offset: 1 },
      ];
    }

    getTiming(duration) {
      return {
        duration,
        easing: 'ease-in-out',
        delay: 0,
        iterations: 1,
        direction: 'alternate',
        fill: 'forwards',
      };
    }

    componentDidUpdate = () => {
      if (this.props.homeRoute && !this.state.hasAnimated) {
        this.setState({ playState: 'running', hasAnimated: true });
      }
    }

    render() {
      const { classes, size } = this.props;
      return (
        <div className={(this.state.hasAnimated) ? classes.after : classes.before}>
          <Animated.div
            keyframes={this.getKeyFrames(size)}
            timing={this.getTiming(2000)}
            playState={this.state.playState}
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

export default withStyles(styles)(Logo);
