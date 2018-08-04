import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info';
import ResearchIcon from '@material-ui/icons/FindInPage';
import PrototypingIcon from '@material-ui/icons/Compare';
import ProgrammingIcon from '@material-ui/icons/Computer';
import HackathonIcon from '@material-ui/icons/FreeBreakfast';
import DesignIcon from '@material-ui/icons/Palette';

const styles = theme => ({
  root: {},
});

function chooseIcon(category) {
  switch (category) {
    case 'Research':
      return <ResearchIcon color="inherit" />;
    case 'Prototyping':
      return <PrototypingIcon color="inherit" />;
    case 'Design':
      return <DesignIcon color="inherit" />;
    case 'Hackathon':
      return <HackathonIcon color="inherit" />;
    case 'Programming':
      return <ProgrammingIcon color="inherit" />;
    default:
      return <InfoIcon color="inherit" />;
  }
}

function SectionTitle(props) {
  const { category } = props;

  return chooseIcon(category);
}

SectionTitle.propTypes = {
  category: PropTypes.string.isRequired, // from parsed markdown
};

export default withStyles(styles)(SectionTitle);
