/* helper functions to render markdown from react-markdown as material-ui components
   See: https://github.com/rexxars/commonmark-react-renderer#type-renderer-options
   and: https://material-ui-next.com/style/typography/#component
 */
import React from 'react';
import Link from 'next/link';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';

import PrismCode from '../components/PrismCode';

function codeBlockRenderer(props) {
  return <PrismCode language={props.language}>{props.literal}</PrismCode>
}

function paragraphRenderer(props) {
  return <Typography type="body1" gutterBottom paragraph={true} key={props.nodeKey}>{props.children}</Typography>;
}

function headingRenderer(props) {
  switch (props.level) {
    case 1:
      return <Typography type="display2" gutterBottom headlineMapping="h1" key={props.nodeKey}>{props.children}</Typography>;
      break;
    case 2:
      return <Typography type="display1" gutterBottom headlineMapping="h2" key={props.nodeKey}>{props.children}</Typography>;
      break;
    case 3:
      return <Typography type="headline" gutterBottom headlineMapping="h3" key={props.nodeKey}>{props.children}</Typography>;
      break;
    case 4:
      return <Typography type="title" gutterBottom headlineMapping="h4" key={props.nodeKey}>{props.children}</Typography>;
      break;
    case 5:
      return <Typography type="subheading" gutterBottom headlineMapping="h5" key={props.nodeKey}>{props.children}</Typography>;
      break;
    case 6:
      return <Typography type="body2" gutterBottom headlineMapping="h6" key={props.nodeKey}>{props.children}</Typography>;
      break;
    default:
      return <Typography type="body1" gutterBottom key={props.nodeKey}>{props.children}</Typography>;
  }
}

function linkRenderer(props) {
  const pattern = /^((http|https|ftp):\/\/)/;
  if (pattern.test(props.href)) {
    // render all non-relative links as new tab urls
    return <a href={props.href} key={props.nodeKey} target="_blank" rel="noopener noreferrer">{props.children}</a>;
  } else {
    let url = props.href;
    if (url[0] !== '/') {
      url = '/' + url;
    }

    // render all relative links in next's link component
    return <Link href={url} as={url} key={props.nodeKey}><a>{props.children}</a></Link>;
  }

  return <span>{props.children}</span>;
}

function imageRenderer(props) {

}

function listRenderer(props) {
  return <Typography type="body1" gutterBottom paragraph={true} component="ul" key={props.nodeKey}>{props.children}</Typography>;
}

function thematicBreakRenderer(props) {
  return <Divider light style={{marginBottom: 24}} className="divider" />;
}

export {
  codeBlockRenderer,
  paragraphRenderer,
  headingRenderer,
  linkRenderer,
  imageRenderer,
  listRenderer,
  thematicBreakRenderer,
}