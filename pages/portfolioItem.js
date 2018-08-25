import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

/* material-ui */
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import {
  handleImageSource,
  MarkdownHelper,
} from '../lib/MarkdownRenderer';

/* my components */
import PageLayout from '../templates/PageLayout';

const styles = {};

/*
Renders a portfolio post from the following data (found in the source .md):
title: This is text
description: Also some text
date: June 2017
tags: tag1, tag two, tag 3#, tag 4%, tag $#!         // need to split on "," to make usable
category: test                                        // haven't quite decided on this yet
topImage:
  ![Screen Shot 2017-10-25 at 8.47.07 AM.png](resources/1AF7E97F815E72F0392AD67C648FBA8A.png)
content: #Markdown Content
 */

class PortfolioItem extends Component {
  render() {
    const markdownHelper = new MarkdownHelper(this.props.currentPage);

    return (
      <PageLayout headerData={this.props.headerData} currentPage={this.props.currentPage} featured={this.props.featured}>
        <Grid container className="portfolio" spacing={24} justify="center">
          <Grid item xs={10} sm={8}>
            <ReactMarkdown
              renderers={{
                Paragraph: markdownHelper.paragraphRenderer,
                Heading: markdownHelper.headingRenderer,
                List: markdownHelper.listRenderer,
                Link: markdownHelper.linkRenderer,
                CodeBlock: markdownHelper.codeBlockRenderer,
              }}
              source={this.props.source}
            />
          </Grid>
        </Grid>
      </PageLayout>
    );
  }
}

PortfolioItem.propTypes = {
  currentPage: PropTypes.string.isRequired,
  headerData: PropTypes.object.isRequired,
  source: PropTypes.string.isRequired,
};

/* eslint-disable-next-line func-names */
PortfolioItem.getInitialProps = async function (context) {
  const getQuery = context.asPath.split('?');
  const path = getQuery[0];
  const featured = !!(getQuery[1]);
  const topImage = await handleImageSource(context.query.topImage.toString());

  return {
    headerData: {
      topImage: `${path}/${topImage.src}`,
      title: context.query.title.toString(),
      description: context.query.description.toString(),
      category: context.query.category.toString(),
      date: context.query.date.toString(),
      tags: context.query.tags.toString().split(','),
    },
    source: context.query.content.toString(),
    currentPage: path,
    featured,
  };
};

export default withStyles(styles)(PortfolioItem);
