/* helper functions to render markdown from react-markdown as material-ui components
   See: https://github.com/rexxars/commonmark-react-renderer#type-renderer-options
   and: https://material-ui-next.com/style/typography/#component
 */
import React from 'react';
import Link from 'next/link';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import ImageZoom from 'react-medium-image-zoom';

import PrismCode from './PrismCode';

// takes a markdown-formatted string and returns img-ready data from it
function handleImageSource(uri) {
  const regExpParens = /\(([^)]+)\)/;
  const regExpBrackets = /\[(.*?)\]/;
  let data = regExpBrackets.exec(uri)[1]; // todo include positioning data in this
  let imageUri = handleImageURI(regExpParens.exec(uri)[1])
  let processedData = {
    src: imageUri,
    alt: data,
  }
  return processedData;

}

class MarkdownHelper {
  constructor(currentPage) {
    this.currentPage = currentPage;
  }

  codeBlockRenderer(props) {
    return <PrismCode language={props.language}>{props.literal}</PrismCode>
  }

  paragraphRenderer = (props) => {
    // have to do this to handle weirdly formatted images :/
    let text = props.children[0].toString();
    if (text.startsWith("![")) {
      let img = handleImageSource(text);
      return <div style={{textAlign: 'center'}}>
        <ImageZoom
          image={{
            src: (this.currentPage + '/' + img.src),
            alt: img.alt,
            className: 'img',
            style: {
              maxHeight: 500,
              padding: "0px 16px",
              maxWidth: '100%'
            }
          }}
          defaultStyles={{overlay: {backgroundColor: '#000'}}}
        />
      </div>
    } else {
      return <Typography variant="body1" gutterBottom paragraph={true} key={props.nodeKey} style={{fontSize: '1rem'}}>{props.children}</Typography>;
    }
  }

  headingRenderer(props) {
    switch (props.level) {
      case 1:
        return <Typography variant="display2" gutterBottom component="h1" key={props.nodeKey}>{props.children}</Typography>;
        break;
      case 2:
        return <Typography variant="display1" gutterBottom component="h2" key={props.nodeKey}>{props.children}</Typography>;
        break;
      case 3:
        return <Typography variant="headline" gutterBottom component="h3" key={props.nodeKey}>{props.children}</Typography>;
        break;
      case 4:
        return <Typography variant="title" gutterBottom component="h4" key={props.nodeKey}>{props.children}</Typography>;
        break;
      case 5:
        return <Typography variant="subheading" gutterBottom component="h5" key={props.nodeKey}>{props.children}</Typography>;
        break;
      case 6:
        return <Typography variant="body2" gutterBottom component="h6" key={props.nodeKey}>{props.children}</Typography>;
        break;
      default:
        return <Typography variant="body1" gutterBottom key={props.nodeKey}>{props.children}</Typography>;
    }
  }

  linkRenderer(props) {
    // check for video and invision elements
    if(props.href.startsWith('https://www.youtube.com/embed') || props.href.startsWith('https://invis.io/')) {
      let data = props.children[0];
      const wRegex = /width="(\d+)/;
      const hRegex = /height="(\d+)/;
      let width = wRegex.exec(data)[1];
      let height = hRegex.exec(data)[1];
      return <iframe style={{maxWidth: '100%'}}width={width} height={height} src={props.href} frameBorder="0" allowFullScreen></iframe>;
    }

    // check for relative links
    const pattern = /^((http|https|ftp):\/\/)/;
    if (pattern.test(props.href)) {
      // render all non-relative links as new tab urls
      return <a href={props.href} key={props.nodeKey} target="_blank" rel="noopener noreferrer">{props.children}</a>;
    } else {
      let url = props.href;
      if (url[0] !== '/') {
        url = '/' + url;
      }
      // render all relative links from static directory
      return <Link href={url} key={props.nodeKey}><a>{props.children}</a></Link>;
    }

    return <span>{props.children}</span>;
  }

  imageRenderer(props) {
    console.log(props);
  }

  listRenderer(props) {
    return <Typography variant="body1" gutterBottom paragraph={true} component="ul" key={props.nodeKey}>{props.children}</Typography>;
  }

  thematicBreakRenderer(props) {
    return <Divider light style={{marginBottom: 24}} className="divider" />;
  }
}

function handleImageURI(uri) {
  let imageUri = uri.split("="); // todo handle responsive images with <picture>
  return imageUri[0].trim();
}

export {
  handleImageSource,
  handleImageURI,
  MarkdownHelper,
}