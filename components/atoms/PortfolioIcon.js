// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import InfoIcon from 'material-ui-icons/Info';
import ResearchIcon from 'material-ui-icons/FindInPage'
import PrototypingIcon from 'material-ui-icons/Compare'
import ProgrammingIcon from 'material-ui-icons/Computer'
import HackathonIcon from 'material-ui-icons/FreeBreakfast'
import DesignIcon from 'material-ui-icons/Palette'

const styles = theme => ({
  root: {},
});

function chooseIcon(category) {
  switch(category) {
    case "Research":
      return <ResearchIcon color="inherit" />;
      break;
    case "Prototyping":
      return <PrototypingIcon color="inherit" />;
      break;
    case "Design":
      return <DesignIcon color="inherit" />;
      break;
    case "Hackathon":
      return <HackathonIcon color="inherit" />;
      break;
    case "Programming":
      return <ProgrammingIcon color="inherit" />;
      break;
    default:
      return <InfoIcon color="inherit" />;
  }
}

function SectionTitle(props) {
  const {classes, category} = props;

  return chooseIcon(category);
}

SectionTitle.propTypes = {
  category: PropTypes.string.isRequired, // from parsed markdown
};

export default withStyles(styles)(SectionTitle);