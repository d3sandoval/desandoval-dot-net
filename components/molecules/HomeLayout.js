import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import SocialRow from './SocialRow';
import HomeTabs from './HomeTabs';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 16,
  },
});

class HomeLayout extends React.Component {
    componentDidUpdate = () => {
      const { homeRoute } = this.props;
      const { hasAnimated } = this.state;
      if (homeRoute && !hasAnimated) {
        this.setState({ playState: 'running', hasAnimated: true });
      }
    }

    render() {
      const { classes, homeRoute } = this.props;
      return (
        <div className={classes.root}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="flex-start"
          >
            <div className={classes.menu}>
              <Button style={{ fontFamily: '"Raleway","Helvetica Neue",Arial,sans-serif' }} href="https://medium.com/@d3sandoval/latest" target="_blank" rel="noopener noreferrer" color="primary">Blog</Button>
              <Link prefetch href="/iam"><Button style={{ fontFamily: '"Raleway","Helvetica Neue",Arial,sans-serif' }} color="primary">I am...</Button></Link>
            </div>
            <SocialRow />
          </Grid>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="flex-start"
            style={{ maxWidth: 1800, margin: 'auto' }}
          >
            <Grid item xs={12} sm={6}>
              <HomeTabs homeRoute={homeRoute} />
            </Grid>
          </Grid>
        </div>
      );
    }
}

HomeLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  homeRoute: PropTypes.string.isRequired,
};


export default withStyles(styles)(HomeLayout);
