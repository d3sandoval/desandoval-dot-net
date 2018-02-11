import React from 'react';
import {withStyles} from 'material-ui/styles';
import "prismjs";

import { PrismCode } from "react-prism";
import prismGlobalStyles from "prismjs/themes/prism-twilight.css"; // importing CSS files using babel-plugin-inline-import
// import a new css file for every language you end up using
import 'prismjs/components/prism-python.min.js'


const styles = theme => ({
  root: {}
});

function PortfolioTags(props) {
  const {classes, language} = props;

  return (
    <div className={classes.root}>
      <style global jsx>
        {prismGlobalStyles}
      </style>
      <PrismCode component="pre" className={`language-${language}`}>
        {props.children}
      </PrismCode>
    </div>
  );
}

export default withStyles(styles)(PortfolioTags);