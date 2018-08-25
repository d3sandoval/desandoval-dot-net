import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import debounce from 'lodash/debounce';
import EventListener, { withOptions } from 'react-event-listener';

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
  main: {
    maxWidth: 1800,
    margin: '0 auto',
  },
  mainPost: {
    maxWidth: 1240,
    margin: '80px auto 0',
  },
};

class PageLayout extends Component {
  state = {
    bodyWidth: { overflowX: 'hidden' },
    positionTop: 0,
  };

  handleResize = debounce(() => {
    const width = document.documentElement.clientWidth;
    this.setState({ bodyWidth: { overflowX: 'hidden' } });
    this.setState({ viewWidth: width });
  }, 166);

  handleScroll = debounce(() => {
    const top = window.pageYOffset || document.documentElement.scrollTop;
    this.setState({ positionTop: top });
  });

  componentDidMount() {
    if (!this.state.viewWidth) {
      // this will be undefined when using SSR - set it here just in case
      /* eslint-disable-next-line react/no-did-mount-set-state */
      this.setState({ viewWidth: document.documentElement.clientWidth });
    }
  }

  componentWillUnmount() {
    if (this.handleResize.cancel) {
      this.handleResize.cancel();
    }
    if (this.handleScroll.cancel) {
      this.handleScroll.cancel();
    }
  }

  /* eslint-disable-next-line consistent-return */
  topImage = (path) => {
    switch (path[1]) {
      case '':
        return (
          <ProfileImage
            positionTop={this.state.positionTop}
            viewWidth={this.state.viewWidth}
          />
        );
      case 'portfolio':
        if (path[2]) {
          return (
            <PortfolioImage
              headerData={this.props.headerData}
              positionTop={this.state.positionTop}
              viewWidth={this.state.viewWidth}
            />
          );
        }
        break;
      default:
    }
  };

  render() {
    const path = this.props.currentPage.split('/');
    return (
      <div className={this.props.classes.root} style={this.state.bodyWidth}>
        <EventListener
          target="window"
          onResize={withOptions(this.handleResize, { passive: true, capture: false })}
          onScroll={withOptions(this.handleScroll, { passive: true, capture: true })}
        />
        <ButtonAppBar currentPage={this.props.currentPage} featured={this.props.featured} />
        <ButtonProvider>
          <ContactButton />
        </ButtonProvider>
        { this.topImage(path) }
        <main className={(path[1] == 'portfolio' && path[2]) ? this.props.classes.mainPost : this.props.classes.main}>
          {this.props.children}
        </main>
        <Footer />
      </div>
    );
  }
}

PageLayout.defaultProps = {
  classes: {},
  headerData: {},
};

PageLayout.propTypes = {
  currentPage: PropTypes.string.isRequired,
  headerData: PropTypes.object,
  classes: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
};

export default withStyles(styles)(PageLayout);
