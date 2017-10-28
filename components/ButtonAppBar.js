// @flow weak

import React from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import ButtonBase from 'material-ui/ButtonBase';
import Link from 'next/link';
import Headroom from 'react-headroom';

const styles = theme => ({
  root: {
    // marginTop: theme.spacing.unit * 3,
    width: '100%',
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
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Headroom>
          <AppBar color="default" position="static">
            <Toolbar>
              <Link href="/">
                <ButtonBase><Typography type="title" color="inherit" className={classes.subTitle}>
                  Human Experience Designer
                </Typography></ButtonBase>
              </Link>
              <div className={classes.menu}>
                <Button href="https://blog.desandoval.net/latest" target="_blank" rel="noopener noreferrer" color="primary">Blog</Button>
                <Link href="/portfolio"><Button color="primary">Portfolio</Button></Link>
                <Link href="/iam"><Button color="primary">I am...</Button></Link>
              </div>
            </Toolbar>
          </AppBar>
        </Headroom>
      </div>
    );
  }
}

export default withStyles(styles)(ButtonAppBar);