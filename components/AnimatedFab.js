// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import { Animated } from 'react-web-animation';
import Button from 'material-ui/Button';
import QuestionAnswerIcon from 'material-ui-icons/QuestionAnswer';
import CloseIcon from 'material-ui-icons/Close';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    position: 'fixed',
    bottom: 16,
    right: 16,
    zIndex: 100,
  },
});

class AnimatedFab extends React.Component {
  constructor({ initialOpen }) {
    super();
    this.state = {
      open: initialOpen,
      playState: 'idle',
    }
  }

  getKeyFrames() {
    return [
      { transform: 'scale(1)',    opacity: 1,     offset: 0 },
      { transform: 'scale(.5)',   opacity: 0.5,   offset: 0.3 },
      { transform: 'scale(.667)', opacity: 0.667, offset: 0.7875 },
      { transform: 'scale(.6)',   opacity: 0.6,   offset: 1 }
    ];
  }

  getTiming( duration ) {
    return {
      duration,
      easing: 'ease-in-out',
      delay: 0,
      iterations: 2,
      direction: 'alternate',
      fill: 'forwards'
    };
  }

  animateOut = () => {
    this.setState({playState: 'paused'});
    if (this.state.open) {
      this.setState({open: false})
    } else {
      this.setState({open: true})
    }
    this.props.animationCallback(this.state.open);
  }

  render() {
    const {classes, animationCallback, onMouseOver, onMouseOut} = this.props;
    let buttonIcon = (this.state.open)
      ? <CloseIcon color="white" key="value1" />
      : <QuestionAnswerIcon color="white" key="value2" />;

    return (
      <Button fab color="primary" aria-label="contact" className={classes.button}
              onClick={() => {
                this.setState({ playState: 'running' });
              }}
              onMouseOver={onMouseOver}
              onMouseOut={onMouseOut}
      >
        <Animated.div playState={this.state.playState} keyframes={this.getKeyFrames()}
                      timing={this.getTiming(2500)} onFinish={this.animateOut}>
          {buttonIcon}
        </Animated.div>
      </Button>
    );
  }
}

// AnimatedFab.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(AnimatedFab);