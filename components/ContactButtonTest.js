// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import QuestionAnswerIcon from 'material-ui-icons/QuestionAnswer';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import { SpeedDial, SpeedDialItem } from '../lib/react-mui-speeddial/dist/index';

// just some icons for illustration (example only):
import ContentAdd from 'material-ui-icons/Add';
import NavigationClose from 'material-ui-icons/Close';
import NewGameIcon from 'material-ui-icons/PlaylistAdd';
import NewPageIcon from 'material-ui-icons/NoteAdd';


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    position: 'fixed',
    bottom: 16,
    right: 24,
  },
});

function ContactButtonTest(props) {
  const { classes } = props;
    return (
      <SpeedDial
        fabContentOpen={
          <ContentAdd />
        }
        fabContentClose={
          <NavigationClose />
        }
      >

        <SpeedDialItem
          label="new game"
          fabContent={<NewGameIcon/>}
          onTouchTap={this.startNewGame}
        />

        <SpeedDialItem
          label="new page"
          fabContent={<NewPageIcon/>}
          onTouchTap={this.startNewPage}
        />

      </SpeedDial>
    );
}

ContactButtonTest.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContactButtonTest);