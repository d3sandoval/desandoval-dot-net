import React from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    height: '780px',
  },
  topImage: {
    "background": `url("img/looking-bg.jpg")`,
    "height": "600px",
    "background-size": "cover",
    "background-position": "center",
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
  },
  subName: {
    position: "relative",
    display: "block",
    [theme.breakpoints.up('md')]: {
      left: "378px",
      top: "-300px",
      fontSize: 18,
    },
    [theme.breakpoints.down('md')]: {
      left: "228px",
      top: "-150px",
    },
  },
  '@media (max-width: 780px)': {
    root: {
      height: '640px',
    },
    name: {
      left: "50px",
      top: "290px",
      position: "absolute"
    },
    subName: {
      left: "50px",
      top: "355px",
      'max-width': '300px',
      filter: "drop-shadow(5px 5px 5px #222)",
      position: "absolute",
    },
    logo: {
      position: "absolute",
      width: "180px",
      top: "95px",
    },
    '@media (max-width: 532px)': {
      name: {
        'max-width': '300px',
      },
      subName: {
        top: "400px",
      }
    }
  },
});

class PortfolioImage extends React.Component {
  getOverlayStyle = () => {
    return {
      backgroundColor: "#000",
      opacity: (this.props.viewWidth < 780)
                ? 0.5 // dynamic opacity does not work well on phones
                : 1 - ((600 - this.props.positionTop)/600),
      height:"100%",
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.topImage}>
          <div style={this.getOverlayStyle()} />
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
}

export default withStyles(styles)(PortfolioImage);