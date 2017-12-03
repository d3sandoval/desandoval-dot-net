import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'material-ui/styles/withStyles';
import debounce from 'lodash/debounce';
import EventListener, {withOptions} from 'react-event-listener'

import ButtonAppBar from '../components/ButtonAppBar';
import ContactButton from '../components/ContactButton';
import ProfileImage from '../components/ProfileImage';
import PortfolioImage from '../components/PortfolioImage';
import Footer from '../components/Footer';

const styles = {
  root: {
    overflowX: 'hidden',
  },
}

// todo introduce loading animation: https://github.com/zeit/next.js/tree/master/examples/with-loading
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
          return <PortfolioImage headerData={this.props.headerData} positionTop={this.state.positionTop} viewWidth={this.state.viewWidth} />;
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
        <ButtonAppBar currentPage={this.props.currentPage} />
        <ContactButton />
        { this.topImage() }
        {this.props.children}
        <Footer/>
      </div>
    )
  }
}

PageLayout.propTypes = {
  viewWidth: PropTypes.number,
  pageType: PropTypes.string,
  currentPage: PropTypes.string.isRequired, // usually context.url.pathname or this.props.url.pathname
};

export default withStyles(styles)(PageLayout);