/* eslint-disable */ // disabling until we get animation back in here
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import EventListener, { withOptions } from 'react-event-listener';
import { Animated } from 'react-web-animation';
import Button from '@material-ui/core/Button';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import CloseIcon from '@material-ui/icons/Close';
import { ButtonContext } from '../StateContainers/ContactButtonState';

const styles = theme => ({
  buttonIcon: {
    color: '#fff',
  },
});

class AnimatedFab extends React.Component {
  state = {
    playState: 'idle',
    touched: false,
  };

  getKeyFrames() {
    return [
      {
        transform: 'none',
        opacity: '1',
        transformOrigin: 'center',
        offset: 0,
      },
      {
        transform: (this.state.open) ? 'rotate3d(0, 0, 1, -90deg)' : 'rotate3d(0, 0, 1, 90deg)',
        opacity: '0',
        transformOrigin: 'center',
        offset: 1,
      },
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

  animateOut(buttonState) {
    this.setState({ playState: 'idle' });
    (buttonState.state.open)
      ? buttonState.setClosed()
      : buttonState.setOpen();
  }

  onClick = (buttonState, touched) => {
    if (buttonState.state.open) {
      buttonState.setClosed(!this.state.touched);
    } else {
      buttonState.setOpen(!this.state.touched);
    }
  };

  handleScroll = (buttonState) => {
    buttonState.setClosed(!this.state.touched);
  };

  render() {
    const {
      classes, animationCallback, onMouseOver, onMouseOut,
    } = this.props;

    return (
      <ButtonContext>
        {buttonState => (
          <div>
            <EventListener
              target="window"
              onScroll={withOptions(() => this.handleScroll(buttonState), { capture: true })}
            />
            <Button
              variant="fab"
              color="primary"
              aria-label="contact"
              className={classes.button}
              onClick={() => this.onClick(buttonState)}
              onMouseOver={onMouseOver}
              onMouseOut={onMouseOut}
              onTouchStart={() => this.setState({ touched: true })}
            >
              {(buttonState.state.open)
              ? <CloseIcon className={classes.buttonIcon} key="value1" />
              : <QuestionAnswerIcon className={classes.buttonIcon} key="value2" />}
            </Button>
          </div>
        )}
      </ButtonContext>
    );
  }
}

export default withStyles(styles)(AnimatedFab);
