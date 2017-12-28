// @flow weak

import React from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import ButtonBase from 'material-ui/ButtonBase';
import Headroom from 'react-headroom';

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
    }
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

  render() {
    const { classes, currentPage } = this.props;
    let homeButton = function() {
      if (currentPage !== '/') {
        return(
          <a href="/">
            <ButtonBase>
              <img src="/img/logo.png" height="40px" />
            </ButtonBase>
          </a>
        );
      }
    };

    return (
      <div className={classes.root}>
        <Headroom style={{zIndex: 100}}>
          <AppBar color="default" position="static">
            <Toolbar>
              {homeButton()}
              <div className={classes.menu}>
                <Button href="https://blog.desandoval.net/latest" target="_blank" rel="noopener noreferrer" color="primary">Blog</Button>
                <a href="/portfolio"><Button color="primary">Portfolio</Button></a>
                <a href="/iam"><Button color="primary">I am...</Button></a>
              </div>
            </Toolbar>
          </AppBar>
        </Headroom>
      </div>
    );
  }
}

export default withStyles(styles)(ButtonAppBar);