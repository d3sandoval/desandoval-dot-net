import React from 'react';
import { withStyles } from 'material-ui/styles';
import ContactRow from './ContactRow';
import Tooltip from 'material-ui/Tooltip';
import AnimatedFab from '../atoms/AnimatedFab';
import { ButtonContext } from '../StateContainers/ContactButtonState';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    position: 'fixed',
    bottom: 16,
    right: 16,
    zIndex: 100,
  },
  tooltipText: {
    width: 'max-content',
    textAlign: 'center',
  }
});

class ContactButton extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <ButtonContext>
        {(buttonState) => (
          <div className={classes.button}>
          <Tooltip classes={{popper: classes.tooltipText}} title={buttonState.state.rootTooltipText} placement="left" open={buttonState.state.rootTooltip}>
          <AnimatedFab
              onMouseOver={buttonState.mouseOver}
              onMouseOut={buttonState.mouseOut}
              onTouchStart={buttonState.mouseOver}
          />
            </Tooltip>
            <ContactRow open={buttonState.state.open} />
          </div>
        )}
      </ButtonContext>
    );
  }
}

export default withStyles(styles)(ContactButton);