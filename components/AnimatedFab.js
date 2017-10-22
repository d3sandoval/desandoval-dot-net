// @flow weak

import React from 'react';
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
      {
        transform: 'none',
        opacity: '1',
        transformOrigin: 'center',
        offset: 0,
      },
      { transform: (this.state.open) ? 'rotate3d(0, 0, 1, -90deg)' : 'rotate3d(0, 0, 1, 90deg)',
        opacity: '0',
        transformOrigin: 'center',
        offset: 1 },
    ];
  }

  getTiming( duration ) {
    return {
      duration,
      easing: 'ease-in-out',
      delay: 0,
      iterations: 1,
      direction: 'alternate',
      fill: 'forwards'
    };
  }

  animateOut = () => {
    this.setState({playState: 'idle'});
    (this.state.open)
    ? this.setState({open: false})
    : this.setState({open: true});
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
                      timing={this.getTiming(170)} onFinish={this.animateOut}>
          {buttonIcon}
        </Animated.div>
      </Button>
    );
  }
}

export default withStyles(styles)(AnimatedFab);