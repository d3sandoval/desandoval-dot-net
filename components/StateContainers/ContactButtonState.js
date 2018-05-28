import React, { Component } from 'react';
import PropTypes from 'prop-types';

const ButtonContext = React.createContext();

class ButtonProvider extends Component {
  state = {
    open: false,
    rootTooltip: false,
    rootTooltipText: 'Contact me',
  };

  render() {
    return (
      <ButtonContext.Provider value={{
        state: this.state,
        setOpen: (mouse) => {
          this.setState({
            open: true,
          });
          if (mouse) {
            this.setState({
              rootTooltipText: 'Close',
            });
          }
        },

        setClosed: (mouse) => {
          this.setState({
            open: false,
          });
          if (mouse) {
            this.setState({
              rootTooltipText: 'Contact me',
            });
          } else {
            this.setState({
              rootTooltip: false,
            });
          }
        },

        mouseOver: () => {
          this.setState({ rootTooltip: true });
        },

        mouseOut: () => {
          this.setState({ rootTooltip: false });
        },
      }}
      >
        {this.props.children}
      </ButtonContext.Provider>
    );
  }
}

ButtonProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export { ButtonContext, ButtonProvider };
