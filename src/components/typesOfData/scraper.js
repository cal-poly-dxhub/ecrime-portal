import React from 'react';
import styled from 'styled-components';
import { Transition, animated } from 'react-spring/renderprops';

const MainContainer = styled.div`
  width: 80%;
  border-left: 5px solid #63bbb6;
`;
const SubContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
`;
const Title = styled.h1`
  font-family: Helvetica, sans-serif;
  font-size: 24px;
  color: grey;
  margin-top: 0;
  margin-bottom: 0px;
`;
const SubTitle = styled.p`
  color: black;
  font-family: Helvetica, sans-serif;
  font-size: 13px;
  margin-bottom: 3px;
`;
const BodyContainer = styled.div`
  background: #e8ebef;
  color: #5c5c5c;
  border-radius: 5px;
  font-family: FiraCode-Regular, serif;
  margin: 10px;
  padding: 7px;
  font-size: 13px;
  & p {
    word-break: break-word;
  }
`;
const ButtonContainer = styled.div`
  display: inline-block;
  & button {
    background: transparent;
    margin: 2px;
    border-radius: 10px;
    cursor: pointer;
    padding: 4px 11px;
    transition: 0.1s;
    &:focus {
      outline: 0;
    }
  }
`;
const AddButton = styled.button`
  color: #59b7b1;
  border: 1.8px solid #59b7b1;
  font-weight: 700;
  &:hover {
    background: #59b7b1;
    color: white;
  }
`;
const IgnoreButton = styled.button`
  color: #b9c1cf;
  border: 1.8px solid #b9c1cf;
  &:hover {
    background: #b9c1cf;
    color: white;
  }
`;

/**
 * scraper
 *
 * @param {object} data
 */
class Scraper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: false
    };
  }

  getTime(timeStamp) {
    const dt = new Date();
    const seconds = dt.getTime();
    const timeDiff = Math.floor((seconds - timeStamp) / 1000);

    if (timeDiff < 60) {
      return timeDiff + ' seconds ago:';
    } else if (timeDiff < 3600) {
      return Math.floor(timeDiff / 60) + ' minutes ago:';
    } else if (timeDiff < 86400) {
      return Math.floor(timeDiff / 3600) + ' hours ago:';
    } else if (timeDiff < 2592000) {
      return Math.floor(timeDiff / 86400) + ' days ago:';
    } else {
      return Math.floor(timeDiff / 2592000) + ' months ago:';
    }
  }

  highLightWords(excerpt, query) {
    let keywordsList = query.split(' ');
    let excerptList = excerpt.split(' ');

    let newList = [''];

    for (let i = 0; i < excerptList.length; i++) {
      if (keywordsList.includes(excerptList[i])) {
        //if its a keyword
        newList[newList.length] = excerptList[i];
        newList[newList.length] = '';
      } else {
        newList[newList.length - 1] += excerptList[i] + ' ';
      }
    }
    return newList;
  }

  render() {
    return (
      <Transition
        native
        items={!this.state.hidden}
        from={{
          opacity: 0
        }}
        enter={{
          opacity: 1,
          overflow: 'hidden',
          height: 'auto'
        }}
        leave={{
          opacity: 0,
          height: 0
        }}
        config={{ duration: 300, ease: 'easeOut' }}
      >
        {show =>
          show &&
          (props => (
            <animated.div style={props}>
              <MainContainer>
                <SubContainer>
                  <Title>Location</Title>
                  <SubTitle>
                    {this.props.data['category']} data is likely collected based
                    on the following excerpt scraped from &nbsp;
                    <a
                      href={this.props.data['privacyPolicy']}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {this.props.data['company']}'s Privacy Policy.
                    </a>
                    &nbsp; {this.getTime(this.props.data['timeStamp'])}
                  </SubTitle>
                  <BodyContainer>
                    <p>
                      "
                      {this.highLightWords(
                        this.props.data['excerptContent'],
                        this.props.data['query']
                      ).map((word, index) => {
                        if (
                          this.props.data['query'].split(' ').includes(word)
                        ) {
                          return <b key={index}>{word} </b>;
                        } else {
                          return <span key={index}>{word} </span>;
                        }
                      })}
                      "
                    </p>
                  </BodyContainer>
                  <ButtonContainer>
                    <AddButton>Add</AddButton>
                    <IgnoreButton
                      onClick={() => this.setState({ hidden: true })}
                    >
                      Ignore
                    </IgnoreButton>
                  </ButtonContainer>
                </SubContainer>
              </MainContainer>
            </animated.div>
          ))
        }
      </Transition>
    );
  }
}

export default Scraper;
