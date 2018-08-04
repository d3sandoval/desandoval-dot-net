import React from 'react'

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode }
  }

    refreshHandler = () => {
        if (process.browser) {
            window.location.reload();
        }
    }

  render() {
    return (
        <div style={{color: '#fff', textAlign: 'center'}}>
            <h1>Even the greatest inventions sometimes fail</h1>
            <img src="/static/error.gif" />
            <p>
                {this.props.statusCode
                ? `a ${this.props.statusCode} error occurred...`
                : 'an error occurred...'}
            </p>
            <p>Try <a href="#" onClick={this.refreshHandler}>refreshing</a>, or go <a href="/">back to home</a></p>
        </div>
    )
  }
}