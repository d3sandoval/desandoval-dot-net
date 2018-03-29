// @flow
import { Provider, Subscribe, Container } from 'unstated';

type ContactButtonState = {
  open: boolean,
  rootTooltip: boolean,
  rootTooltipText: string,
}

class ButtonStateContainer extends Container<ContactButtonState> {
  state = {
    open: false,
    rootTooltip: false,
    rootTooltipText: "Contact me"
  };

  setOpen = (mouse: boolean = true) => {
    this.setState({
      open: true,
    });
    if (mouse) {
      this.setState({
        rootTooltipText: "Close"
      });
    }
  };

  setClosed = (mouse: boolean = true) => {
    this.setState({
      open: false,
    });
    if (mouse) {
      this.setState({
        rootTooltipText: "Contact me"
      });
    } else {
      this.setState({
        rootTooltip: false,
      })
    }
  };

  mouseOver = () => {
    this.setState({rootTooltip: true});
  };

  mouseOut = () => {
    this.setState({rootTooltip: false});
  };
}

export {ButtonStateContainer};