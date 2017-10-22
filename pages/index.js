/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* material-ui */
import withStyles from 'material-ui/styles/withStyles';
import withRoot from '../components/withRoot';

/* my components */
import ButtonAppBar from '../components/ButtonAppBar';
import ContactButton from '../components/ContactButton';
import ProfileImage from '../components/ProfileImage';
import BlogSummary from '../components/BlogSummary';
import EmploymentSummary from '../components/EmploymentSummary';
import PortfolioSummary from '../components/PortfolioSummary';
import HonorsSummary from '../components/HonorsSummary';
import Footer from '../components/Footer';
import debounce from 'lodash/debounce';
import EventListener, {withOptions} from 'react-event-listener'

/* data sources */
import fetch from 'isomorphic-unfetch'

const styles = {
  root: {
    overflowX: 'hidden',
  },
};

class Index extends Component {
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
      this.setState({viewWidth: document.documentElement.clientWidth});
    }
  }

  componentWillUnmount() {
    this.handleResize.cancel();
    this.handleScroll.cancel();
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
        <ProfileImage positionTop={this.state.positionTop} viewWidth={this.state.viewWidth} />
        <BlogSummary entries={this.props.entries} />
        <EmploymentSummary />
        <PortfolioSummary />
        {/*<HonorsSummary />*/}
        <Footer />
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};


Index.getInitialProps = async function(context) {
  const res = await fetch('http://localhost:3000' + '/blog/posts?limit=4'); // todo replace with env variable
  const data = await res.json();
  console.log(context.req)

  return {
    entries: data,
    viewWidth: (context.res)
                ? undefined
                : document.documentElement.clientWidth,
  }
}

export default withRoot(withStyles(styles)(Index));
