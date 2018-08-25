import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Headroom from 'react-headroom';
import ChevronLeft from '@material-ui/icons/ChevronLeft';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';

const styles = theme => ({
  root: {
    // marginTop: theme.spacing.unit * 3,
    width: '100%',
  },
  appBar: {
    zIndex: 100,
  },
  subTitle: {
    flex: 1,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  menu: {
    margin: '0 0 0 auto',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

class ButtonAppBar extends React.Component {
  /* eslint-disable-next-line consistent-return */
  getHomeButton = () => {
    if (this.props.featured) {
      return (
        <Link prefetch href="/?portfolio">
          <Button>
            <ChevronLeft />
              BACK
          </Button>
        </Link>
      );
    } if (this.props.currentPage.startsWith('/portfolio/')) {
      return (
        <React.Fragment>
          <Link prefetch href="/?bio">
            <ButtonBase tabIndex={0} role="navigation">
              <img alt="home page" src="/img/logo.png" height="40px" />
            </ButtonBase>
          </Link>
          <Link prefetch href="/portfolio">
            <Button style={{ marginLeft: 24 }}>
            All Projects
            </Button>
          </Link>
        </React.Fragment>
      );
    }
    return (
      <Link prefetch href="/?bio">
        <ButtonBase tabIndex={0} role="navigation">
          <img alt="home page" src="/img/logo.png" height="40px" />
        </ButtonBase>
      </Link>
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Headroom style={{ zIndex: 100 }}>
          <AppBar color="default" position="static">
            <Toolbar>
              {this.getHomeButton()}
              <div className={classes.menu}>
                <Button style={{ fontFamily: '"Raleway","Helvetica Neue",Arial,sans-serif' }} href="https://medium.com/@d3sandoval/latest" target="_blank" rel="noopener noreferrer" color="primary">Blog</Button>
                <Link prefetch href="/iam"><Button style={{ fontFamily: '"Raleway","Helvetica Neue",Arial,sans-serif' }} color="primary">I am...</Button></Link>
              </div>
            </Toolbar>
          </AppBar>
        </Headroom>
      </div>
    );
  }
}

ButtonAppBar.defaultProps = {
  classes: {},
};

ButtonAppBar.propTypes = {
  classes: PropTypes.object,
  currentPage: PropTypes.string.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
