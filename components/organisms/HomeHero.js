import React from 'react';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Logo from '../atoms/Logo';

const styles = theme => ({
  root: {
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
  },
  title: {
    width: '100%',
    textAlign: 'center',
    marginTop: 32,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  bottom: {
    position: 'absolute',
    bottom: 132,
    width: '100%',
    textAlign: 'center',
  },
});

function getHeight() {
  // todo make this sane
  if (typeof (window) === 'undefined') {
    return 500;
  }
  return window.innerHeight / 2;
}

class HomeHero extends React.Component {
    state = {
      homeRoute: null,
    }

    handleClick = () => {
      window.location.hash = 'something';
      this.setState({ homeRoute: 'something' });
    }

    render() {
      const { classes } = this.props;
      return (
        <div
          onClick={(this.state.homeRoute) ? '' : this.handleClick}
          onKeyPress={(this.state.homeRoute) ? '' : this.handleClick}
          role="button"
          tabIndex="0"
          className={classes.root}
        >
          {(this.state.homeRoute === null) ? (
            <span>
              <Typography className={classes.title} variant="display4" gutterBottom>Daniel E. Sandoval</Typography>
              <Typography className={classes.bottom} variant="headline">Putting the human experience first. Developing solutions to make it better.</Typography>
            </span>
          ) : (<p>test</p>)}
          <Logo size={getHeight()} homeRoute={this.state.homeRoute} />
        </div>
      );
    }
}

export default withStyles(styles)(HomeHero);
