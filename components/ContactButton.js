// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ContactRow from './ContactRow';
import Tooltip from 'material-ui/Tooltip';
import AnimatedFab from './AnimatedFab';

const styles = theme => ({});

class ContactButton extends React.Component {
  state = {
    open: false,
    rootTooltip: false,
    rootTooltipText: "Contact me",
  };

  onAnimateOut(newState) {
    this.setState({
      open: newState,
      rootTooltipText: (newState) ?  "Close" : "Contact me"
    });
  }

  // toggleMenu = () => () => {
  //   (this.state.open)
  //     ?  this.setState({open: false, rootTooltipText: "Contact me"})
  //     :  this.setState({open: true, rootTooltip: false, rootTooltipText: "Close"})
  //
  // }

  mouseOver = () => () => {
    this.setState({rootTooltip: true});
  }

  mouseOut = () => () => {
    this.setState({rootTooltip: false});
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Tooltip title={this.state.rootTooltipText} placement="left" open={this.state.rootTooltip}>
          <AnimatedFab
            onMouseOver={this.mouseOver()}
            onMouseOut={this.mouseOut()}
            animationCallback={(newState) => this.onAnimateOut(newState)}
            initialOpen={this.state.open} />
        </Tooltip>
        {(this.state.open)
          ? (<span><ContactRow /></span>)
          : <span></span>}
      </div>
    );
  }
}

ContactButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContactButton);