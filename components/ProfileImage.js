import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  topImage: {
    "background": `url("img/looking-bg.jpg")`,
    "height": "600px",
    "background-size": "cover",
    "background-position": "bottom",
  },
  overlay: {
    "background-color": "#000",
    "opacity": "0.4", // todo change on scroll
    "height":"100%",
  },
  logo: {
    position: "relative",
    left: "50px",
    filter: "drop-shadow(5px 5px 5px #222)",
    [theme.breakpoints.up('md')]: {
      width: "300px",
      top: "-150px",
    },
    [theme.breakpoints.down('md')]: {
      width: "150px",
      top: "-75px",
    },
    [theme.breakpoints.down('sm')]: {
      position: "absolute",
      width: "150px",
      top: "75px",
    },
  },
  name: {
    "font-weight": 900,
    position: "relative",
    display: "inline-block",
    filter: "drop-shadow(5px 5px 5px #222)",
    "line-height": "50px",
    [theme.breakpoints.up('md')]: {
      left: "75px",
      top: "-320px",
    },
    [theme.breakpoints.down('md')]: {
      left: "75px",
      top: "-170px",
    },
    [theme.breakpoints.down('sm')]: {
      left: "50px",
      top: "250px",
      position: "absolute"
    },
  },
  subName: {
    position: "relative",
    display: "block",
    [theme.breakpoints.up('md')]: {
      left: "378px",
      top: "-300px",
    },
    [theme.breakpoints.down('md')]: {
      left: "228px",
      top: "-150px",
    },
    [theme.breakpoints.down('sm')]: {
      left: "50px",
      top: "355px",
      filter: "drop-shadow(5px 5px 5px #222)",
      position: "absolute",
    },
  },
});

function ProfileImage(props) {
  const { classes } = props;
  return (
    <div>
      <div className={classes.topImage}>
        <div className={classes.overlay} />
      </div>
      <img src="img/logo.png" className={classes.logo}/>
      <Typography type="display3" className={classes.name}>
        Daniel E. Sandoval
      </Typography>
      <Typography type="subheading" className={classes.subName}>
        Putting the human experience first. Developing solutions to make it better.
      </Typography>
    </div>
  );
}

ProfileImage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileImage);