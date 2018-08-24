import React from 'react';
import PropTypes from 'prop-types';

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    // eslint-disable-next-line no-nested-ternary
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

    refreshHandler = () => {
      if (process.browser) {
        window.location.reload();
      }
    }

    render() {
      const { statusCode } = this.props;
      return (
        <div style={{ color: '#fff', textAlign: 'center' }}>
          <h1>
Even the greatest inventions sometimes fail
          </h1>
          <img alt="An animation of a man falling off a bike" src="/static/error.gif" />
          <p>
            {statusCode
              ? `a ${statusCode} error occurred...`
              : 'an error occurred...'}
          </p>
          <p>
Try
            {' '}
            <a href="#" onClick={this.refreshHandler}>
refreshing
            </a>
, or go
            {' '}
            <a href="/">
back to home
            </a>
          </p>
        </div>
      );
    }
}

Error.propTypes = {
  statusCode: PropTypes.number.isRequired,
};
