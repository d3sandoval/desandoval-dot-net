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

  setOpen = () => {
    this.setState({
      open: true,
      rootTooltipText: "Close"
    });
  };

  setClosed = () => {
    this.setState({
      open: false,
      rootTooltipText: "Contact me"
    });
  }
}

export {ButtonStateContainer};