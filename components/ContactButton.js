// @flow weak

import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import QuestionAnswerIcon from 'material-ui-icons/QuestionAnswer';
import CloseIcon from 'material-ui-icons/Close';
import EmailIcon from 'material-ui-icons/Email';
import PhoneIcon from 'material-ui-icons/Phone';
import CalendarIcon from 'material-ui-icons/Event';

const duration = 500
const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    position: 'fixed',
    bottom: 16,
    right: 16,
    zIndex: 100,
  },
  emailIcon: {
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shorter,
      easing: theme.transitions.easing.easeOut,
    }),
    margin: theme.spacing.unit,
    width: 40,
    height: 40,
    position: 'fixed',
    bottom: 84,
    right: 24,
    zIndex: 100,
  },
  phoneIcon: {
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shorter,
      easing: theme.transitions.easing.easeOut,
    }),
    margin: theme.spacing.unit,
    width: 40,
    height: 40,
    position: 'fixed',
    bottom: 136,
    right: 24,
    zIndex: 100,
  },
  calendarIcon: {
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shorter,
      easing: theme.transitions.easing.easeOut,
    }),
    margin: theme.spacing.unit,
    width: 40,
    height: 40,
    position: 'fixed',
    bottom: 188,
    right: 24,
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
        ? (<span>
            <a href="mailto:daniel@desandoval.net"><Button className={classes.emailIcon} fab color="white">
              <EmailIcon dense={true} />
            </Button></a>
            <a href="tel:+15417198286"><Button className={classes.phoneIcon} fab color="white">
                <PhoneIcon dense={true} />
            </Button></a>
            <a href="https://calendly.com/d3sandoval/30min" target="_blank" rel="noopener noreferrer"><Button className={classes.calendarIcon} fab color="white">
              <CalendarIcon dense={true} />
            </Button></a>
          </span>)
        : <span></span>}
      </div>
    );
  }
}

ContactButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContactButton);