import React from "react";
import styled from "styled-components";

const ChipContainer = styled.div`
  display: block;
`;

const Chip = styled.div`
  display: inline-block;
  max-width: 400px;
  height: 29px;
  background: ${props => props.chipColor};
  line-height: 27px;
  color: white;
  border-radius: 20px;
  cursor: pointer;
  margin-left: 9px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  & p {
    display: inline-block;
    margin: 0px 15px 0px 9px;
    max-width: 325px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  & svg {
    display: inline-block;
    width: 13px;
    height: 13px;
    position: relative;
    top: -5px;
    right: 7px;
  }
`;

/**
 * chips
 *
 * @param {array} list
 * @param {function} closeFunc
 */
class Chips extends React.Component {
  chipColor(size) {
    return size > 39 ? "#bc35ff" : size > 18 ? "#35a0ff" : "#46d8c5;";
  }
  render() {
    return (
      <ChipContainer>
        {this.props.list.map(chip => (
          <Chip
            key={chip}
            chipColor={() => this.chipColor(chip.length)}
            onClick={() => this.props.closeFunc(chip)}
          >
            <p>{chip}</p>
            <svg
              viewport="0 0 12 12"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="1"
                y1="11"
                x2="11"
                y2="1"
                stroke="black"
                strokeWidth="2"
              />
              <line
                x1="1"
                y1="1"
                x2="11"
                y2="11"
                stroke="black"
                strokeWidth="2"
              />
            </svg>
          </Chip>
        ))}
      </ChipContainer>
    );
  }
}

export default Chips;
