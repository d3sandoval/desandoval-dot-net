// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Link from 'next/link';
import Headroom from 'react-headroom';

const styles = theme => ({
  root: {
    // marginTop: theme.spacing.unit * 3,
    width: '100%',
  },
  flex: {
    flex: 1,
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
          <AppBar position="static">
            <Toolbar>
              <Typography type="title" color="inherit" className={classes.flex}>
                Human Experience Designer
              </Typography>
              <Button href="https://blog.desandoval.net/latest" target="_blank" rel="noopener noreferrer" color="contrast">Blog</Button>
              <Link href="/portfolio"><Button color="contrast">Portfolio</Button></Link>
              <Link href="/iam"><Button color="contrast">I am...</Button></Link>
            </Toolbar>
          </AppBar>
        </Headroom>
      </div>
    );
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);