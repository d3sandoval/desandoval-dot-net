import React from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    '&:hover': {
      boxShadow: `0 3px 5px 2px ${theme.palette.primary[900]}`
    },
  }),
});

function PaperSheet(props) {
  const { classes, post } = props;
  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography variant="headline" component="h3" dangerouslySetInnerHTML={{__html: post.title}} />
        <Typography variant="body1" component="p">
          {post.date}
        </Typography>
      </Paper>
    </div>
  );
}

export default withStyles(styles)(PaperSheet);