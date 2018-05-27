import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'material-ui/styles/withStyles';
import debounce from 'lodash/debounce';
import EventListener, {withOptions} from 'react-event-listener';

import ButtonAppBar from '../components/molecules/ButtonAppBar';
import ContactButton from '../components/molecules/ContactButton';
import ProfileImage from './ProfileImage';
import PortfolioImage from './PortfolioImage';
import Footer from '../components/molecules/Footer';
import { ButtonProvider } from '../components/StateContainers/ContactButtonState';

const styles = {
  root: {
    minHeight: '100vh',
    overflow: 'hidden',
    display: 'block',
    position: 'relative',
    paddingBottom: '120px',
  },
};

class PageLayout extends Component {
  state = {
    bodyWidth: {overflowX: 'hidden'},
    positionTop: 0,
  };

  handleResize = debounce(() => {
    let width = document.documentElement.clientWidth;
    this.setState({bodyWidth: {overflowX: 'hidden'}})
    this.setState({viewWidth: width})
  }, 166);

  handleScroll = debounce(() => {
    let top  = window.pageYOffset || document.documentElement.scrollTop;
    this.setState({positionTop: top})
  });

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
    const path = this.props.currentPage.split("/");
    switch (path[1]) {
      case "":
        return <ProfileImage positionTop={this.state.positionTop} viewWidth={this.state.viewWidth} />;
        break;
      case "portfolio":
        if (path[2]) {
          return <PortfolioImage headerData={this.props.headerData} positionTop={this.state.positionTop} viewWidth={this.state.viewWidth} />;
        }
        break;
      default:
        return;
    }
  };

  render() {
    return (
      <div className={this.props.classes.root} style={this.state.bodyWidth}>
        <EventListener target="window"
                       onResize={withOptions(this.handleResize, {passive: true, capture: false})}
                       onScroll={withOptions(this.handleScroll, {passive: true, capture: true})}
        />
        <ButtonAppBar currentPage={this.props.currentPage} />
        <ButtonProvider>
          <ContactButton />
        </ButtonProvider>
        { this.topImage() }
        <main>
          {this.props.children}
        </main>
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