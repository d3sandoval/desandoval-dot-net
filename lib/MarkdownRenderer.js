/* helper functions to render markdown from react-markdown as material-ui components
   See: https://github.com/rexxars/commonmark-react-renderer#type-renderer-options
   and: https://material-ui-next.com/style/typography/#component
 */
import React from 'react';
import Link from 'next/link';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ImageZoom from 'react-medium-image-zoom';

import PrismCode from './PrismCode';

function handleImageURI(uri) {
  const imageInfo = uri.split('='); // todo handle responsive images with <picture>
  return imageInfo;
}

// takes a markdown-formatted string and returns img-ready data from it
function handleImageSource(uri) {
  const regExpParens = /\(([^)]+)\)/;
  const regExpBrackets = /\[(.*?)\]/;
  const data = regExpBrackets.exec(uri)[1]; // todo include positioning data in this
  const imageInfo = handleImageURI(regExpParens.exec(uri)[1]);
  const processedData = {
    src: imageInfo[0],
    pos: imageInfo[1],
    alt: data,
  };
  return processedData;
}

/* eslint-disable react/prop-types */
class MarkdownHelper {
  constructor(currentPage) {
    this.currentPage = currentPage;
  }

  /* eslint-disable-next-line class-methods-use-this */
  codeBlockRenderer(props) {
    return <PrismCode language={props.language}>{props.literal}</PrismCode>;
  }

  paragraphRenderer = (props) => {
    // have to do this to handle weirdly formatted images :/
    const text = props.children[0].toString();

    function bannerStyle(bannerProps) {
      let height;
      if (bannerProps.length > 1) {
        height = `${bannerProps[1]}px`;
      } else {
        height = '200px';
      }
      return {
        width: '100%',
        height,
        overflow: 'hidden',
        position: 'relative',
      };
    }

    function getImageStyle(img, banner, gallery) {
      if (banner) {
        return bannerStyle(img.pos.split('-'));
      } else if (gallery) {
        return { textAlign: 'left', display: 'inline-block' };
      }
      return {};
    }

    if (text.startsWith('![')) {
      const img = handleImageSource(text);
      const banner = img.pos.startsWith('banner');
      const gallery = img.pos.startsWith('gallery');

      return (
        <div
          className="img"
          style={getImageStyle(img, banner, gallery)}
        >
          <ImageZoom
            image={{
            src: (`${this.currentPage}/${img.src}`),
            alt: img.alt,
            className: img.pos,
            style: {
              maxHeight: banner ? 'none' : 500,
              padding: '0px 16px',
              maxWidth: '100%',
            },
          }}
            defaultStyles={{ overlay: { backgroundColor: '#000' } }}
          />
        </div>);
    }
    return <Typography variant="body1" gutterBottom paragraph key={props.nodeKey} style={{ fontSize: '1rem', textAlign: 'left' }}>{props.children}</Typography>;
  }

  /* eslint-disable-next-line class-methods-use-this */
  headingRenderer(props) {
    switch (props.level) {
      case 1:
        return <Typography variant="display2" gutterBottom component="h1" style={{ textAlign: 'left', clear: 'both' }} key={props.nodeKey}>{props.children}</Typography>;
      case 2:
        return <Typography variant="display1" gutterBottom component="h2" style={{ textAlign: 'left', clear: 'both' }} key={props.nodeKey}>{props.children}</Typography>;
      case 3:
        return <Typography variant="headline" gutterBottom component="h3" style={{ clear: 'both' }} key={props.nodeKey}>{props.children}</Typography>;
      case 4:
        return <Typography variant="title" gutterBottom component="h4" style={{ textAlign: 'left', clear: 'both' }} key={props.nodeKey}>{props.children}</Typography>;
      case 5:
        return <Typography variant="subheading" gutterBottom component="h5" style={{ textAlign: 'left', clear: 'both' }} key={props.nodeKey}>{props.children}</Typography>;
      case 6:
        return <Typography variant="body2" gutterBottom component="h6" style={{ textAlign: 'left', clear: 'both' }} key={props.nodeKey}>{props.children}</Typography>;
      default:
        return <Typography variant="body1" gutterBottom style={{ textAlign: 'left', clear: 'both' }} key={props.nodeKey}>{props.children}</Typography>;
    }
  }

  /* eslint-disable-next-line class-methods-use-this */
  linkRenderer(props) {
    // check for video and invision elements
    if (props.href.startsWith('https://www.youtube.com/embed') || props.href.startsWith('https://invis.io/')) {
      const data = props.children[0];
      const wRegex = /width="(\d+)/;
      const hRegex = /height="(\d+)/;
      const width = wRegex.exec(data)[1];
      const height = hRegex.exec(data)[1];
      const domain = props.href.match(/:\/\/(.[^/]+)/)[1];
      return <iframe title={`embed via ${domain}`} style={{ maxWidth: '100%' }} width={width} height={height} src={props.href} frameBorder="0" allowFullScreen />;
    }

    // check for relative links
    const pattern = /^((http|https|ftp):\/\/)/;
    if (pattern.test(props.href)) {
      // render all non-relative links as new tab urls
      return <a href={props.href} key={props.nodeKey} target="_blank" rel="noopener noreferrer">{props.children}</a>;
    }
    let url = props.href;
    if (url[0] !== '/') {
      url = `/${url}`;
    }
    // render all relative links from static directory
    return <Link href={url} key={props.nodeKey}><a>{props.children}</a></Link>;
  }

  /* eslint-disable-next-line class-methods-use-this */
  imageRenderer(props) {
    /* eslint-disable-next-line no-console */
    console.log(props);
  }

  /* eslint-disable-next-line class-methods-use-this */
  listRenderer(props) {
    return <Typography variant="body1" gutterBottom paragraph component="ul" style={{ textAlign: 'left' }} key={props.nodeKey}>{props.children}</Typography>;
  }

  /* eslint-disable-next-line class-methods-use-this */
  thematicBreakRenderer(props) {
    return <Divider light style={{ marginBottom: 24 }} className="divider" />;
  }
}

export {
  handleImageSource,
  handleImageURI,
  MarkdownHelper,
};
