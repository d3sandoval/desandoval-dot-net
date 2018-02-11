import React from 'react';
import {withStyles} from 'material-ui/styles';
import { Animated } from 'react-web-animation';
import Button from 'material-ui/Button';
import QuestionAnswerIcon from 'material-ui-icons/QuestionAnswer';
import CloseIcon from 'material-ui-icons/Close';

import { Subscribe } from 'unstated';
import {ButtonStateContainer} from '../StateContainers/ContactButtonState';

const styles = theme => ({
  buttonIcon: {
    color: '#fff',
  }
});

class AnimatedFab extends React.Component {
  state = {
    playState: 'idle',
  };

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

  animateOut (buttonState) {
    this.setState({playState: 'idle'});
    (buttonState.state.open)
    ? buttonState.setClosed()
    : buttonState.setOpen();
  }

  render() {
    const {classes, animationCallback, onMouseOver, onMouseOut} = this.props;

    return (
      <Subscribe to={[ButtonStateContainer]}>
        {buttonState => (
          <div>
            <Button fab color="primary" aria-label="contact" className={classes.button}
                             onClick={(buttonState.state.open)
                               ? buttonState.setClosed
                               : buttonState.setOpen
                             }
                             onMouseOver={onMouseOver}
                             onMouseOut={onMouseOut}
          >

              {(buttonState.state.open)
                ? <CloseIcon className={classes.buttonIcon} key="value1" />
                : <QuestionAnswerIcon className={classes.buttonIcon} key="value2" />}
          </Button>
          </div>
        )}
      </Subscribe>
    );
  }
}

export default withStyles(styles)(AnimatedFab);