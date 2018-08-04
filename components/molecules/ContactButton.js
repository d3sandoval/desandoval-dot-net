import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Tooltip from '@material-ui/core/Tooltip';
import ContactRow from './ContactRow';
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
  },
});

class ContactButton extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <ButtonContext>
        {buttonState => (
          <div className={classes.button}>
            <Tooltip classes={{ popper: classes.tooltipText }} title={buttonState.state.rootTooltipText} placement="left" open={buttonState.state.rootTooltip}>
              <AnimatedFab
                onMouseOver={buttonState.mouseOver}
                onFocus={buttonState.mouseOver}
                onMouseOut={buttonState.mouseOut}
                onBlur={buttonState.mouseOut}
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

ContactButton.defaultProps = {
  classes: {},
};

ContactButton.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(ContactButton);
