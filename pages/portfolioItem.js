/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

/* material-ui */
import withStyles from 'material-ui/styles/withStyles';
import withRoot from '../components/withRoot';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

/* my components */
import PageLayout from '../components/PageLayout';

const styles = {};

/*
Renders a portfolio post from the following data (found in the source .md):
title: This is text
description: Also some text
date: June 2017
tags: [tag1, tag two, tag 3#, tag 4%, tag $#!]
category: test                                        // haven't quite decided on this yet
topImage: ![Screen Shot 2017-10-25 at 8.47.07 AM.png](resources/1AF7E97F815E72F0392AD67C648FBA8A.png) // all images (including this one) have to be saved in the /static/resources directory
content: #Markdown Content
 */

class PortfolioItem extends Component {

  handleImage(uri) {
    return '/' + uri;
  }

  paragraphRenderer(props) { // todo create renderers for all typography types
    return <Typography type="body1" gutterBottom key={props.nodeKey}>{props.children}</Typography>
  }

  render() {
    return (
      <PageLayout>
        <Grid container spacing={24} justify="center">
          <Grid item xs={8}>
            <ReactMarkdown transformImageUri={this.handleImage} renderers={{Paragraph: this.paragraphRenderer}} source={this.props.url.query.content} />
          </Grid>
        </Grid>
      </PageLayout>
    )
  }
}

export default withRoot(withStyles(styles)(PortfolioItem));