import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import CalendarIcon from '@material-ui/icons/Event';
import Grow from '@material-ui/core/Grow';

const styles = theme => ({
  emailIcon: {
    margin: theme.spacing.unit,
    width: 40,
    height: 40,
    position: 'fixed',
    bottom: 84,
    right: 24,
    zIndex: 100,
  },
  phoneIcon: {
    margin: theme.spacing.unit,
    width: 40,
    height: 40,
    position: 'fixed',
    bottom: 136,
    right: 24,
    zIndex: 100,
  },
  calendarIcon: {
    margin: theme.spacing.unit,
    width: 40,
    height: 40,
    position: 'fixed',
    bottom: 188,
    right: 24,
    zIndex: 100,
  },
  tooltipText: {
    width: 'max-content',
    textAlign: 'center',
  },
});

class ContactRow extends React.Component {
  render() {
    const { classes, open } = this.props;

    return (
      <React.Fragment>
        <Grow mountOnEnter unmountOnExit in={open} style={{ transformOrigin: 'bottom' }} {...(open ? { timeout: 200 } : {})}>
          <a href="mailto:daniel@desandoval.net">
            <Tooltip classes={{ popper: classes.tooltipText }} title="Email me" placement="left">
              <Button variant="fab" className={classes.emailIcon}>
                <EmailIcon dense="true" />
              </Button>
            </Tooltip>
          </a>
        </Grow>
        <Grow
          mountOnEnter
          unmountOnExit
          in={open}
          style={{ transformOrigin: 'bottom' }}
          {...(open ? { timeout: 400 } : {})}
        >
          <a href="tel:+15417198286">
            <Tooltip classes={{ popper: classes.tooltipText }} title="Call me" placement="left">
              <Button variant="fab" className={classes.phoneIcon}>
                <PhoneIcon dense="true" />
              </Button>
            </Tooltip>
          </a>
        </Grow>
        <Grow
          mountOnEnter
          unmountOnExit
          in={open}
          style={{ transformOrigin: 'bottom' }}
          {...(open ? { timeout: 600 } : {})}
        >
          <a href="https://calendly.com/d3sandoval/30min" target="_blank" rel="noopener noreferrer">
            <Tooltip classes={{ popper: classes.tooltipText }} title="Schedule a call" placement="left">
              <Button variant="fab" className={classes.calendarIcon}>
                <CalendarIcon dense="true" />
              </Button>
            </Tooltip>
          </a>
        </Grow>
      </React.Fragment>
    );
  }
}

ContactRow.defaultProps = {
  classes: {},
};

ContactRow.propTypes = {
  open: PropTypes.bool.isRequired,
  classes: PropTypes.object,
};

export default withStyles(styles)(ContactRow);
