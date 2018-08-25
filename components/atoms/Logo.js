import React from 'react';
import { Animated } from 'react-web-animation';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  before: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.8,
    },
  },
  after: {
    position: 'absolute',
    top: '50%',
    left: '50%',
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
        { transform: `scale(2) translateX(-${size / 1.5}px) translateY(-${size / 4}px)`, opacity: 0.45, offset: 1 },
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
        <React.Fragment>
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
              className={(this.state.hasAnimated) ? classes.after : classes.before}
              style={{
                marginLeft: -(size / 2),
              }}
            />
          </Animated.div>
        </React.Fragment>
      );
    }
}

export default withStyles(styles)(Logo);
