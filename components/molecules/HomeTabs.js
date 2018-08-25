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
import Link from 'next/link';

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
        >
          <TabContainer dir={theme.direction}>
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
