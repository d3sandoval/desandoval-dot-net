/* eslint-disable max-len */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react-jsx-indent */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Router from 'next/router';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    marginTop: 40,
  },
  tabs: {
    backgroundColor: '#303030',
  },
  swipeable: {
    height: 500,
    WebkitOverflowScrolling: 'touch', // iOS momentum scrolling
  },
});

class HomeTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = (index) => {
    this.setState({ value: index });
  };

  internalLink = (path) => {
    const href = `/?${path}`;
    const as = href;
    Router.push(href, as, { shallow: true });
    switch (path) {
      case 'bio':
        this.handleChangeIndex(0);
        break;
      case 'portfolio':
        this.handleChangeIndex(1);
        break;
      case 'awards':
        this.handleChangeIndex(2);
        break;
      default:
        this.handleChangeIndex(0);
        break;
    }
  }

  render() {
    const { classes, theme } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default" classes={{ colorDefault: classes.tabs }}>
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label="Bio" />
            <Tab label="Portfolio" />
            <Tab label="Awards" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={this.handleChangeIndex}
          className={classes.swipeable}
        >
          <TabContainer dir={theme.direction}>
            <Typography variant="body2" gutterBottom paragraph><strong>People use digital tools everyday</strong>. Those that are significant provide
                practical and navigable solutions to their users&#39; problems. In order for user research and design to have any impact on software development,
                it must become directly involved with the tools and processes that developers use to build software.
            </Typography>
            <Typography variant="body2" gutterBottom paragraph>When designers work closely with developers and remain open to feedback,
                we can work together to make building a usable, consistent, and accessible interface the easiest way to develop new software.
            </Typography>
            <Typography variant="title" gutterBottom paragraph>As a Human Experience Designer,
              <a onClick={() => this.internalLink('portfolio')} onKeyPress={() => this.internalLink('portfolio')} title="Portfolio" role="link" tabIndex={0} style={{ cursor: 'pointer' }}> I connect user needs with the developer experience</a>.
            </Typography>
            <Typography variant="body2" gutterBottom paragraph> In the fall of 2014, I studied computer science, software development, and design
                at <a title="Computer Science Institute" href="http://www.ait-budapest.com/" target="_blank" rel="noopener noreferrer"> AIT-Budapest.</a> I
                was mentored by the great Ernö Rubik (<a href="http://www.rubiks.com/" target="_blank" rel="noopener noreferrer">Rubik’s Cube</a>,
                creator), Ernö Duda (<a href="http://www.solvobiotech.com/" target="_blank" rel="noopener noreferrer">SOLVO BioTech</a>, founder),
                and Gábor Bojár (<a href="http://www.graphisoft.com/" target="_blank" rel="noopener noreferrer">Graphisoft</a>, founder)
                to expand my international view of the user experience.
            </Typography>
            <Typography variant="body2" gutterBottom paragraph>I graduated from University of Washington with a degree in Human Centered Design and Engineering in 2015.
            I am now a Product Designer and &quot;UX Team of One&quot; at <a title="Market Research Software Company" href="http://discuss.io/" target="_blank" rel="noopener noreferrer"> Discuss.io</a>. Living in Cambridge, MA.
            </Typography>
          </TabContainer>
          <TabContainer dir={theme.direction}>Item Two</TabContainer>
          <TabContainer dir={theme.direction}>Item Three</TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

HomeTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(HomeTabs);
