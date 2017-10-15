// @flow weak

import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grow from 'material-ui/transitions/Grow';
import ContactRow from './ContactRow';
import QuestionAnswerIcon from 'material-ui-icons/QuestionAnswer';
import CloseIcon from 'material-ui-icons/Close';

const duration = 500
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
    open: false
  };

  toggleMenu = () => () => {
    (this.state.open)
    ?  this.setState({open: false})
    :  this.setState({open: true})

  }

  render() {
    const { classes } = this.props;
    return (
      <div>
          <Button onClick={this.toggleMenu()} fab color="primary" aria-label="contact" className={classes.button}>
            {(this.state.open)
            ? (<CloseIcon color="white" />)
            : <QuestionAnswerIcon color="white" />}
          </Button>
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