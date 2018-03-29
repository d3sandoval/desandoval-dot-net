import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import BlogBox from '../atoms/BlogBox';
import SectionTitle from '../atoms/SectionTitle';

const styles = theme => ({
  root: {
    '& a': {
      'text-decoration': 'none',
    },
    marginBottom: theme.spacing.unit * 4,
  },
  links: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit * 2,
  },
  externalBlogs: {
    display: 'inline-block',
    width: '50%',
    boxSizing: 'border-box',
    paddingLeft: 8,
  },
  fullLink: {
    display: 'inline-block',
    width: '50%',
    '& a': {
      color: 'inherit',
      '&:hover': {
        color: theme.palette.primary[500],
      }
    },
  }
});

function BlogSummary(props) {
  const {classes, entries} = props;

  return (
    <div className={classes.root}>
      <SectionTitle title="Blog" />
      <Grid container spacing={8}>
        {entries.map(function(post) {
            return (
              <Grid key={post.link} item xs={12} sm={6}>
                <a href={post.link} target="_blank" rel="noopener noreferrer">
                  <BlogBox post={post} />
                </a>
              </Grid>
            );
          })
        }
      </Grid>
      <div className={classes.links}>
        <Typography className={classes.externalBlogs} variant="subheading" align="left" gutterBottom>
        Also found on: <a href="https://encrypted.google.com/search?hl=en&ei=XWosWrC_LcfOjwPs-pSIAg&q=%22DJ+Desman%22+site%3Ahttp%3A%2F%2Frainydawgradioblog.tumblr.com&oq=%22DJ+Desman%22+site%3Ahttp%3A%2F%2Frainydawgradioblog.tumblr.com&gs_l=psy-ab.3...100756.104016.0.104249.7.7.0.0.0.0.99.521.7.7.0....0...1c.1.64.psy-ab..0.0.0....0.WhaD743wny4"
                         target="_blank" rel="noopener noreferrer">Rainy Dawg Radio</a> and <a href="http://blog.kexp.org/author/desandoval/"
                                                                                               target="_blank" rel="noopener noreferrer">KEXP</a>
        </Typography>
        <Typography className={classes.fullLink} variant="subheading" align="right" gutterBottom>
          <a href="https://medium.com/@d3sandoval/latest" target="_blank" rel="noopener noreferrer">View all from my blog...</a>
        </Typography>
      </div>
    </div>
  );
}

BlogSummary.propTypes = {
  entries: PropTypes.array.isRequired,
};

export default withStyles(styles)(BlogSummary);