import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PortfolioTags from '../components/atoms/PortfolioTags';
import PortfolioIcon from '../components/atoms/PortfolioIcon';

const styles = theme => ({
  root: {},
  name: {
    width: '100%',
    textAlign: 'center',
    fontWeight: 900,
    display: 'inline-block',
    position: 'relative',
    filter: 'drop-shadow(5px 5px 5px #222)',
    lineHeight: '50px',
    marginTop: 200,
    marginBottom: 300,
    [theme.breakpoints.up('md')]: {
      top: '-320px',
    },
    [theme.breakpoints.up('sm')]: {
      top: '-400px',
    },
    [theme.breakpoints.down('sm')]: {
      top: '-600px',
    },
    [theme.breakpoints.down('xs')]: {
      top: '-720px',
    },
  },
  subName: {
    display: 'block',
    marginBottom: 24,
    marginTop: 24,
    paddingRight: 40,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 40,
    },
  },
});

class PortfolioImage extends React.Component {
  getOverlayStyle = () => ({
    backgroundColor: '#000',
    opacity: (this.props.viewWidth < 780)
      ? 0.5 // dynamic opacity does not work well on phones
      : 1 - ((300 - this.props.positionTop) / 600),
    height: '100%',
  })

  render() {
    const { classes, headerData } = this.props;
    return (
      <div className={classes.root}>
        <Grid container justify="center">
          <div style={{
            background: `url(${headerData.topImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
          }}
          >
            <div style={this.getOverlayStyle()} />
            <Grid item xs={12} sm={10} style={{ marginLeft: 'auto', marginRight: 'auto' }}>
              <div className={classes.name}>
                <Typography variant="display3">
                  {headerData.title}
                </Typography>
              </div>
            </Grid>
          </div>
          <Grid item sm={8} md={5} lg={3} xl={2}>
            <Typography variant="headline" className={classes.subName}>
              <strong>{headerData.date}</strong>
              {' '}
|
              {headerData.description}
              <br />
              <br />
              <PortfolioIcon category={headerData.category} />
              {' '}
              {headerData.category}
            </Typography>
          </Grid>
          <Grid item sm={8} md={3} lg={3} xl={2}>
            <Typography variant="subheading" className={classes.subName}>
              <PortfolioTags tags={headerData.tags} />
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}

PortfolioImage.defaultProps = {
  classes: {},
  viewWidth: 0,
};

PortfolioImage.propTypes = {
  classes: PropTypes.object,
  viewWidth: PropTypes.number, // not required since it can be loaded on the server
  headerData: PropTypes.object.isRequired,
  positionTop: PropTypes.number.isRequired,
};

export default withStyles(styles)(PortfolioImage);
