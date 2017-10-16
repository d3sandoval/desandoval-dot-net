// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import ContactRow from './ContactRow';
import QuestionAnswerIcon from 'material-ui-icons/QuestionAnswer';
import CloseIcon from 'material-ui-icons/Close';
import Tooltip from 'material-ui/Tooltip';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    position: 'fixed',
    bottom: 16,
    right: 16,
    zIndex: 100,
  },
  animated: {
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shorter,
      easing: theme.transitions.easing.easeOut,
    }),
  }
});

class ContactButton extends React.Component {
  state = {
    open: false,
    rootTooltip: false,
    rootTooltipText: "Contact me",
  };

  toggleMenu = () => () => {
    (this.state.open)
    ?  this.setState({open: false, rootTooltipText: "Contact me"})
    :  this.setState({open: true, rootTooltip: false, rootTooltipText: "Close"})

  }

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
          <Button fab color="primary" aria-label="contact" className={classes.button}
                  onClick={this.toggleMenu()}
                  onMouseOver={this.mouseOver()}
                  onMouseOut={this.mouseOut()}
          >
            {(this.state.open)
            ? (<CloseIcon color="white" />)
            : (<QuestionAnswerIcon color="white" />)}
          </Button>
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