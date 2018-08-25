import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import Router from 'next/router';
import { Typography } from '@material-ui/core';

import PortfolioIcon from '../atoms/PortfolioIcon';
import { handleImageSource } from '../../lib/MarkdownRenderer';

const styles = theme => ({
  root: {
    marginBottom: 124,
  },
  portfolioItem: {
    marginBottom: 16,
    '&:hover': {
      color: theme.palette.primary[500],
      cursor: 'pointer',
    },
    '&:focus': {
      color: theme.palette.primary[500],
      cursor: 'pointer',
    },
  },
  subHeading: {
    marginTop: 8,
  },
  subHeadingText: {
    display: 'inline',
    paddingLeft: 8,
    verticalAlign: 'top',
  },
  button: {
    float: 'right',
  },
});

function getTopImage(id, topImage) {
  const imageData = handleImageSource(topImage);
  return `/portfolio/${id}/${imageData.src}`;
}

class HomePortfolio extends React.Component {
  render() {
    const { classes, tileData } = this.props;

    return (
      <div className={classes.root}>
        {tileData.map((tile, index) => (
          <Link href={`/portfolio/${tile.id}?featured`} key={tile.id}>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
              spacing={16}
              className={classes.portfolioItem}
              role="button"
              tabIndex={0}
              onKeyPress={() => Router.push(`/portfolio/${tile.id}?featured`)}
            >
              <Grid item xs={12} md={3}>
                <div
                  style={{
                    background: `url(${getTopImage(tile.id, tile.topImage)})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: 16,
                    height: '100%',
                    minHeight: 124,
                    width: '100%',
                  }}
                  alt={tile.title}
                />
              </Grid>
              <Grid
                container
                item
                xs={12}
                md={9}
                direction="column"
              >
                <Typography variant="title" color="inherit">{tile.title}</Typography>
                <div className={classes.subHeading}>
                  <PortfolioIcon category={tile.category} />
                  <Typography variant="body2" className={classes.subHeadingText}>{tile.description}</Typography>
                </div>

              </Grid>
            </Grid>
          </Link>
        ))}
        <Link prefetch href="/portfolio">
          <Button variant="outlined" color="secondary" className={classes.button}>
          View all projects
          </Button>
        </Link>
      </div>
    );
  }
}

HomePortfolio.defaultProps = {
  classes: {},
  large: false,
};

HomePortfolio.propTypes = {
  classes: PropTypes.object,
  tileData: PropTypes.array.isRequired,
  large: PropTypes.bool,
};

export default withStyles(styles)(HomePortfolio);
