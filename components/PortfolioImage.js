import React from 'react';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import PortfolioTags from '../components/PortfolioTags';
import PortfolioIcon from '../components/PortfolioIcon';

const styles = theme => ({
  root: {},
  name: {
    width: "100%",
    textAlign: "center",
    fontWeight: 900,
    display: "inline-block",
    position: "relative",
    filter: "drop-shadow(5px 5px 5px #222)",
    lineHeight: "50px",
    marginTop: 200,
    marginBottom: 300,
    [theme.breakpoints.up('md')]: {
      top: "-320px",
    },
    [theme.breakpoints.down('md')]: {
      top: "-400px",
    },
    [theme.breakpoints.down('sm')]: {
      top: "-600px",
    },
  },
  subName: {
    display: "block",
    marginBottom: 32,
  },
});

class PortfolioImage extends React.Component {
  getOverlayStyle = () => {
    return {
      backgroundColor: "#000",
      opacity: (this.props.viewWidth < 780)
                ? 0.5 // dynamic opacity does not work well on phones
                : 1 - ((300 - this.props.positionTop)/600),
      height:"100%",
    }
  }
  render() {
    const { classes, headerData } = this.props;
    return (
      <div className={classes.root}>
        <Grid container justify="space-around" >
          <div style={{
            background: `url(${headerData.topImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
          }}>
            <div style={this.getOverlayStyle()} />
            <Grid item xs={12} sm={10} style={{marginLeft: "auto", marginRight: "auto"}}>
              <div className={classes.name}>
              <Typography type="display3">
                {headerData.title}
              </Typography>
              </div>
            </Grid>
          </div>
          <Grid item sm={8} md={2}>
            <Typography type="subheading" className={classes.subName}>
              <strong>{headerData.date}</strong> | {headerData.description}
              <br/><br/>
              <PortfolioIcon category={headerData.category} /> {headerData.category}
            </Typography>
          </Grid>
          <Grid item sm={8} md={2}>
            <Typography type="subheading" className={classes.subName}>
              <PortfolioTags tags={headerData.tags} />
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(PortfolioImage);