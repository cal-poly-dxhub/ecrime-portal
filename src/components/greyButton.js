import React from "react";
import styled from "styled-components";
import { Transition, animated } from "react-spring/renderprops";


class GreyButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  showChild() {
    this.setState({ visible: true });
  }

  hideChild() {
    this.setState({ visible: false });
  }

  render() {
    const onClickFunction = ()=>{
      if(this.props.onClick === undefined){
        this.showChild()
      }else{
        this.props.onClick()
      }
    }

    return (
      <div style={this.props.style}>
        <ButtonGrey onClick={() => onClickFunction()}>
          {this.props.buttonText}
        </ButtonGrey>

        <Transition
          native
          items={this.state.visible}
          from={{
            opacity: 0,
            zoom: 1.2
          }}
          enter={{ opacity: 1, zoom: 0.8 }}
          leave={{ opacity: 0, zoom: 1.2 }}
          config={{ duration: 300 }}
        >
          {show =>
            show &&
            (props => (
              <animated.div style={props}>
                <this.props.destination
                  closeButton={() => this.hideChild()}
                  subjectId={this.props.subjectId}
                  showNotifications={this.props.showNotifications}
                />
              </animated.div>
            ))
          }
        </Transition>
      </div>
    );
  }
}

export default GreyButton;


const ButtonGrey = styled.button`
  background: transparent;
  border: 2px solid #c6cdd9;
  color: #c6cdd9;
  padding: 3px 16px;
  border-radius: 11px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  font-size: 18px;
  cursor: pointer;
  font-weight: 500;
  transition: 0.2s;
  &:focus {
    outline: 0;
  }
  &:hover {
    background: #c6cdd9;
    color: white;
  }
`;