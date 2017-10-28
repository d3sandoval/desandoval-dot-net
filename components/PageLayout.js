import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'material-ui/styles/withStyles';
import debounce from 'lodash/debounce';
import EventListener, {withOptions} from 'react-event-listener'

import ButtonAppBar from '../components/ButtonAppBar';
import ContactButton from '../components/ContactButton';
import ProfileImage from '../components/ProfileImage';

const styles = {
  root: {
    overflowX: 'hidden',
  },
}

class PageLayout extends Component {
  state = {
    bodyWidth: {overflowX: 'hidden'},
    positionTop: 0,
  }

  handleResize = debounce(() => {
    let width = document.documentElement.clientWidth;
    this.setState({bodyWidth: {overflowX: 'hidden'}})
    this.setState({viewWidth: width})
  }, 166)

  handleScroll = debounce(() => {
    let top  = window.pageYOffset || document.documentElement.scrollTop;
    this.setState({positionTop: top})
  })

  componentDidMount() {
    if (!this.state.viewWidth) {
      // this will be undefined when using SSR - set it here just in case
      this.setState({viewWidth: document.documentElement.clientWidth});
    }
  }

  componentWillUnmount() {
    this.handleResize.cancel();
    this.handleScroll.cancel();
  }

  topImage = () => {
      switch (this.props.pageType) {
        case "home":
          return <ProfileImage positionTop={this.state.positionTop} viewWidth={this.state.viewWidth} />;
          break;
        case "portfolioItem":
          return <span></span>;
          break;
        case "portfolio":
          return <span></span>;
          break;
        default:
          return;
      }
  }

  render() {
    return (
      <div className={this.props.classes.root} style={this.state.bodyWidth}>
        <EventListener target="window"
                       onResize={withOptions(this.handleResize, {passive: true, capture: false})}
                       onScroll={withOptions(this.handleScroll, {passive: true, capture: true})}
        />
        <ButtonAppBar />
        <ContactButton />
        { this.topImage() }
        {this.props.children}
      </div>
    )
  }
}

PageLayout.propTypes = {
  viewWidth: PropTypes.number,
  pageType: PropTypes.string,
};

export default withStyles(styles)(PageLayout);