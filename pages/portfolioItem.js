/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  handleImageSource,
  MarkdownHelper,
} from '../lib/MarkdownRenderer';

/* material-ui */
import withStyles from 'material-ui/styles/withStyles';
import withRoot from '../components/withRoot';
import Grid from 'material-ui/Grid';

/* my components */
import PageLayout from '../components/PageLayout';

const styles = {};

/*
Renders a portfolio post from the following data (found in the source .md):
title: This is text
description: Also some text
date: June 2017
tags: tag1, tag two, tag 3#, tag 4%, tag $#!         // need to split on "," to make usable
category: test                                        // haven't quite decided on this yet
topImage: ![Screen Shot 2017-10-25 at 8.47.07 AM.png](resources/1AF7E97F815E72F0392AD67C648FBA8A.png)
content: #Markdown Content
 */

class PortfolioItem extends Component {

  render() {
    const markdownHelper = new MarkdownHelper(this.props.currentPage);

    return (
      <PageLayout pageType="portfolioItem" headerData={this.props.headerData} currentPage={this.props.currentPage}>
        <Grid container spacing={24} justify="center">
          <Grid item xs={10} sm={8}>
            <ReactMarkdown renderers={{
                             Paragraph: markdownHelper.paragraphRenderer,
                             Heading: markdownHelper.headingRenderer,
                             List: markdownHelper.listRenderer,
                             Link: markdownHelper.linkRenderer,
                             CodeBlock: markdownHelper.codeBlockRenderer,
                           }}
                           source={this.props.source} />
          </Grid>
        </Grid>
      </PageLayout>
    )
  }
}

PortfolioItem.getInitialProps = async function(context) {
  let topImage = await handleImageSource(context.query.topImage.toString());

  return {
    headerData: {
      topImage: context.asPath + '/' + topImage.src,
      title: context.query.title.toString(),
      description: context.query.description.toString(),
      category: context.query.category.toString(),
      date: context.query.date.toString(),
      tags: context.query.tags.toString().split(','),
    },
    source: context.query.content.toString(),
    currentPage: context.asPath,
  }
}

export default withRoot(withStyles(styles)(PortfolioItem));