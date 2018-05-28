import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    height: '780px',
  },
  topImage: {
    background: 'url("img/looking-bg.jpg")',
    height: 600,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  logo: {
    position: 'relative',
    left: '50px',
    filter: 'drop-shadow(5px 5px 5px #222)',
    [theme.breakpoints.up('md')]: {
      width: '300px',
      top: '-150px',
    },
    [theme.breakpoints.down('md')]: {
      width: '150px',
      top: '-75px',
    },
  },
  name: {
    fontWeight: 900,
    position: 'relative',
    display: 'inline-block',
    filter: 'drop-shadow(5px 5px 5px #222)',
    lineHeight: '50px',
    [theme.breakpoints.up('md')]: {
      left: '75px',
      top: '-320px',
    },
    [theme.breakpoints.down('md')]: {
      left: '75px',
      top: '-170px',
    },
  },
  subName: {
    position: 'relative',
    display: 'block',
    [theme.breakpoints.up('md')]: {
      left: '378px',
      top: '-300px',
      fontSize: 18,
    },
    [theme.breakpoints.down('md')]: {
      left: '228px',
      top: '-150px',
    },
  },
  '@media (max-width: 780px)': {
    root: {
      height: '640px',
    },
    name: {
      left: '50px',
      top: '290px',
      position: 'absolute',
    },
    subName: {
      left: '50px',
      top: '355px',
      maxWidth: '300px',
      filter: 'drop-shadow(5px 5px 5px #222)',
      position: 'absolute',
    },
    logo: {
      position: 'absolute',
      width: '180px',
      top: '95px',
    },
    '@media (max-width: 532px)': {
      name: {
        'max-width': '300px',
      },
      subName: {
        top: '400px',
      },
    },
  },
});

class ProfileImage extends React.Component {
  getOverlayStyle = () => ({
    backgroundColor: '#000',
    opacity: (this.props.viewWidth < 780)
      ? 0.5 // dynamic opacity does not work well on phones
      : 1 - ((600 - this.props.positionTop) / 600),
    height: '100%',
  })
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.topImage}>
          <div style={this.getOverlayStyle()} />
        </div>
        <img alt="Daniel E. Sandoval logo" src="img/logo.png" className={classes.logo} />
        <Typography variant="display3" className={classes.name}>
          Daniel E. Sandoval
        </Typography>
        <Typography variant="subheading" className={classes.subName}>
          Putting the human experience first. Developing solutions to make it better.
        </Typography>
      </div>
    );
  }
}

ProfileImage.defaultProps = {
  classes: {},
  viewWidth: 0,
};

ProfileImage.propTypes = {
  classes: PropTypes.object,
  viewWidth: PropTypes.number, // not required since it could be loaded on server
  positionTop: PropTypes.number.isRequired,
};

export default withStyles(styles)(ProfileImage);
