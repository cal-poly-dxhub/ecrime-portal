import React, { useState, useEffect } from "react";
import styled from "styled-components";

const List = styled.ul`
  font-weight: 400;
  font-size: 18px;
  font-family: Helvetica, sans-serif;
  list-style-type: none;
  & * {
    cursor: pointer;
    &:hover {
      color: #b7b7b7;
      transition: 0.2s;
    }
  }
`;

const TableOfContents = props => {
  const [currentHighlight, setCurrentHighlight] = useState(5);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });

  const withinRange = (value, expected, threshold) => {
    const lowerBoundary = expected - threshold;
    const upperBoundary = expected + threshold;
    if (lowerBoundary <= value && value <= upperBoundary) {
      return true;
    }
    return false;
  };

  const handleScroll = e => {
    let scrollTop = e.path[1]["scrollY"];

    if (props.sec.current[0].current != null) {
      let yPos1 =
        props.sec.current[0].current.getBoundingClientRect().top +
        window.scrollY;
      let yPos2 =
        props.sec.current[1].current.getBoundingClientRect().top +
        window.scrollY;
      let yPos3 =
        props.sec.current[2].current.getBoundingClientRect().top +
        window.scrollY;
      let yPos4 =
        props.sec.current[3].current.getBoundingClientRect().top +
        window.scrollY;

      let yPosList = [yPos1, yPos2, yPos3, yPos4];

      for (let i = 0; i < yPosList.length; i++) {
        let yPos = yPosList[i];
        let inRange = withinRange(scrollTop, yPos, 75);
        if (inRange) {
          setCurrentHighlight(i);
          break;
        }
      }
    }
  };

  return (
    <List>
      {props.sections.map((section, index) => {
        return (
          <li
            onClick={() => {
              window.scroll(
                0,
                props.sec.current[index].current.getBoundingClientRect().top +
                  +window.scrollY
              );
              setCurrentHighlight(index);
            }}
            key={index}
          >
            <span>
              {index === currentHighlight ? (
                <b>{section}</b>
              ) : (
                <span>{section}</span>
              )}
            </span>
          </li>
        );
      })}
    </List>
  );
};

export default TableOfContents;
