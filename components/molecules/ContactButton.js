// @flow weak

import React from 'react';
import { withStyles } from 'material-ui/styles';
import ContactRow from './ContactRow';
import Tooltip from 'material-ui/Tooltip';
import AnimatedFab from '../atoms/AnimatedFab';

import { Subscribe } from 'unstated';

import {ButtonStateContainer} from '../StateContainers/ContactButtonState';

type Props = {
  classes: Object,
}

type State = {
  rootTooltip: boolean,
}

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

class ContactButton extends React.Component<Props, State> {
  state = {
    rootTooltip: false,
  };

  mouseOver = () => () => {
    this.setState({rootTooltip: true});
  }

  mouseOut = () => () => {
    this.setState({rootTooltip: false});
  }

  render() {
    const { classes } = this.props;

    return (
      <Subscribe to={[ButtonStateContainer]}>
        {buttonState => (
          <div className={classes.button}>
          <Tooltip classes={{popper: classes.tooltipText}} title={buttonState.state.rootTooltipText} placement="left" open={(this.state) ? this.state.rootTooltip : false}>
          <AnimatedFab
              onMouseOver={this.mouseOver()}
              onMouseOut={this.mouseOut()}/>
            </Tooltip>
            <ContactRow open={buttonState.state.open} />
          </div>
        )}
      </Subscribe>
    );
  }
}

export default withStyles(styles)(ContactButton);