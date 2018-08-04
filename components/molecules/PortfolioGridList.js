import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import Link from 'next/link';
import PortfolioIcon from '../atoms/PortfolioIcon';

import { handleImageSource } from '../../lib/MarkdownRenderer';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    background: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
    'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
    'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    fontFamily: '"Raleway","Helvetica Neue",Arial,sans-serif',
  },
  overlay: {
    backgroundColor: '#000',
    opacity: 0.5,
    height: '100%',
    transition: 'opacity 0.5s',
    '&:hover': {
      cursor: 'pointer',
      opacity: 0.2,
      transition: 'opacity 0.25s',
    },
  },
});

function getTopImage(id, topImage) {
  const imageData = handleImageSource(topImage);
  return `/portfolio/${id}/${imageData.src}`;
}

class PortfolioGridList extends React.Component {
  render() {
    const { classes, tileData, large } = this.props;
    const cellHeight = (large) ? 400 : 200;
    const listHeight = (large) ? '100%' : 402;

    return (
      <div className={classes.root}>
        <GridList
          cellHeight={cellHeight}
          spacing={(large) ? 12 : 1}
          className={classes.gridList}
          style={{ height: listHeight }}
        >
          {tileData.map((tile, index) => (
            <GridListTile key={tile.id} cols={(index % 3 === 0) ? 2 : 1} rows={1}>
              <Link href={`/portfolio/${tile.id}`}>
                <div
                  style={{
                  background: `url(${getTopImage(tile.id, tile.topImage)})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '100%',
                  width: '100%',
                }}
                  alt={tile.title}
                >
                  <div className={classes.overlay} />
                  <GridListTileBar
                    title={tile.title}
                    titlePosition="top"
                    actionIcon={
                      <IconButton>
                        <PortfolioIcon category={tile.category} />
                      </IconButton>
                    }
                    actionPosition="left"
                    className={classes.titleBar}
                  />
                </div>
              </Link>
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}

PortfolioGridList.defaultProps = {
  classes: {},
  large: false,
};

PortfolioGridList.propTypes = {
  classes: PropTypes.object,
  tileData: PropTypes.array.isRequired,
  large: PropTypes.bool,
};

export default withStyles(styles)(PortfolioGridList);
