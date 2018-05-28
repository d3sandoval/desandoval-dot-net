/* eslint-disable max-len */

import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';

import SectionTitle from '../atoms/SectionTitle';
import PortfolioGridList from '../molecules/PortfolioGridList';

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit * 6,
  },
  paper: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  }),
  portfolio: {
    marginTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 4,
  },
  portfolioDescription: {
    marginTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
  },
  paperDescription: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 24,
    paddingRight: 24,
  },
  fullLink: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit * 2,
    '& a': {
      textDecoration: 'none',
      color: 'inherit',
      '&:hover': {
        color: theme.palette.primary[500],
      },
    },
  },
});

class PortfolioSummary extends React.Component {
  render() {
    const { classes, entries } = this.props;

    return (
      <div className={classes.root}>
        <SectionTitle title="Portfolio" divider />
        <Grid container spacing={24}>
          {/* Portfolio Pieces */}
          <Grid className={classes.portfolio} item lg={6} xs={12}>
            <PortfolioGridList tileData={entries} />
          </Grid>
          {/* Portfolio Description */}
          <Grid className={classes.portfolioDescription} item lg={6} xs={12}>
            <Paper className={classes.paperDescription}>
              <Typography variant="body2" gutterBottom paragraph>During my undergraduate education, I became enveloped in the study
                of <strong>human-computer interaction</strong>. Through my studies in mathematics, software development,
                and user-centered design, I have found that ubiquitous computing will lead to success in art, science,
                and education. <strong>People use digital artifacts every day</strong>. Those that are significant provide
                practical and navigable solutions to their users&#39; problems.
              </Typography>
              <Typography variant="title" gutterBottom paragraph>As a Human Experience Designer,
                <Link prefetch href="/portfolio"><a title="Portfolio"> I generate such solutions</a></Link>.
              </Typography>
              <Typography variant="body2" gutterBottom paragraph> In the fall of 2014, I studied computer science, software development, and design
                at <a title="Computer Science Institute" href="http://www.ait-budapest.com/" target="_blank" rel="noopener noreferrer"> AIT-Budapest.</a> I
                was mentored by the great Ernö Rubik (<a href="http://www.rubiks.com/" target="_blank" rel="noopener noreferrer">Rubik’s Cube</a>,
                creator), Ernö Duda (<a href="http://www.solvobiotech.com/" target="_blank" rel="noopener noreferrer">SOLVO BioTech</a>, founder),
                and Gábor Bojár (<a href="http://www.graphisoft.com/" target="_blank" rel="noopener noreferrer">Graphisoft</a>, founder)
                to expand my international view of the user experience.
              </Typography>
              <Typography variant="body2" gutterBottom paragraph>Since returning from Hungary and graduating from the University of Washington,
                I have become deeply involved in the Seattle startup community as a designer, developer and small-business consultant.
              </Typography>
            </Paper>
            <Typography className={classes.fullLink} variant="subheading" align="right" gutterBottom>
              <Link prefetch href="/portfolio"><a title="Portfolio">View my entire portfolio...</a></Link>
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}

PortfolioSummary.defaultProps = {
  classes: {},
};

PortfolioSummary.propTypes = {
  classes: PropTypes.object,
  entries: PropTypes.array.isRequired,
};

export default withStyles(styles)(PortfolioSummary);
