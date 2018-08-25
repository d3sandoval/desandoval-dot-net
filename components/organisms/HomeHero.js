import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Animated } from 'react-web-animation';
import Router from 'next/router';

import Logo from '../atoms/Logo';
import ContactButton from '../molecules/ContactButton';
import { ButtonProvider } from '../StateContainers/ContactButtonState';
import HomeLayout from '../molecules/HomeLayout';

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
    [theme.breakpoints.down('xs')]: {
      fontSize: '3em',
    },
  },
  bottom: {
    position: 'absolute',
    [theme.breakpoints.up('xs')]: {
      bottom: 132,
    },
    [theme.breakpoints.up('xl')]: {
      bottom: 240,
      fontSize: '2.25em',
    },
    [theme.breakpoints.down('xs')]: {
      bottom: 40,
      fontSize: '1em',
    },
    width: '100%',
    textAlign: 'center',
  },
  layout: {
    position: 'relative',
    zIndex: 10,
  },
});

function getHeight() {
  // todo make this sane
  if (typeof (window) === 'undefined') {
    return 500;
  }
  return window.innerHeight / 2;
}

function getKeyFrames() {
  return [
    { transform: 'scale(1)', opacity: 0, offset: 0 },
    { transform: 'scale(1)', opacity: 1, offset: 1 },
  ];
}

function getTiming(duration) {
  return {
    duration,
    easing: 'ease-in-out',
    delay: 0,
    iterations: 1,
    direction: 'alternate',
    fill: 'forwards',
  };
}

class HomeHero extends React.Component {
    state = {
      homeRoute: null,
      hasAnimated: false,
      playState: 'paused',
      logoSize: 500,
    }

    constructor(props) {
      super(props);
      if (props.homeRoute) {
        this.state = { homeRoute: props.homeRoute };
      }
    }

    componentDidMount = () => {
      const { homeRoute } = this.props;
      if (homeRoute) {
        this.setState({ homeRoute });
      }
      this.setState({ logoSize: getHeight() });
    }

    handleClick = () => {
      const href = '/?bio';
      const as = href;
      Router.push(href, as, { shallow: true });
      this.setState({ homeRoute: 'bio' });
    }

    render() {
      const { classes, portfolioEntries } = this.props;
      const { homeRoute, logoSize } = this.state;
      return (
        <div
          onClick={(homeRoute) ? undefined : this.handleClick}
          onKeyPress={(homeRoute) ? undefined : this.handleClick}
          role={(homeRoute) ? undefined : 'button'}
          tabIndex={(homeRoute) ? undefined : '0'}
          className={classes.root}
        >
          {(homeRoute === null) ? (
            <span>
              <Typography className={classes.title} variant="display4" gutterBottom>Daniel E. Sandoval</Typography>
              <Typography className={classes.bottom} variant="headline">Putting the human experience first. Developing solutions to make it better.</Typography>
            </span>
          ) : (
            <Animated.div
              keyframes={getKeyFrames()}
              timing={getTiming(3000)}
              className={classes.layout}
            >
              <HomeLayout homeRoute={homeRoute} portfolioEntries={portfolioEntries} />
            </Animated.div>
          )}
          <Logo size={logoSize} homeRoute={homeRoute} />
          <ButtonProvider>
            <ContactButton hidden={homeRoute === null} />
          </ButtonProvider>
        </div>
      );
    }
}

HomeHero.propTypes = {
  classes: PropTypes.object.isRequired,
  homeRoute: PropTypes.string.isRequired,
};

export default withStyles(styles)(HomeHero);
