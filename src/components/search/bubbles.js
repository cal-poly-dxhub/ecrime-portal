import React from "react";
import styled from "styled-components";
import { createRipples } from "react-ripples";

const RipplesLarge = createRipples({
  color: "#3d918c",
  during: 1000
});
const RipplesMedium = createRipples({
  color: "#0f5870",
  during: 700
});
const RipplesSmall = createRipples({
  color: "#113564",
  during: 500
});

const Ripple_Styles = {
  display: "inline-flex",
  borderRadius: 375,
  overflow: "hidden"
};

// LARGE BUBBLE CSS
const LargeBubbleContainer = styled.div`
  height: 375px;
  width: 375px;
  background: #59b7b1;
  display: block;
  overflow: hidden;
  margin: 0;
  border-radius: 50%;
  cursor: pointer;
`;
const LargeBubbleContainer2 = styled.div`
  height: 375px;
  width: 375px;
  background: #59b7b1;
  display: block;
  overflow: hidden;
  margin: 0;
  border-radius: 50%;
  font-family: "Helvetica-Bold", "Helvetica", sans-serif;
  color: white;
  letter-spacing: 0px;
  font-size: 38px;
  font-weight: 700;
  text-align: center;
  vertical-align: middle;
  line-height: 357px;
  cursor: pointer;
`;
const LargeBubbleTittleContainer = styled.div`
  margin-left: 27px;
  position: relative;
  display: flex;
  top: 32%;
`;
const LargeBubbleIcon = styled.img`
  display: block;
  max-width: 24px;
  max-height: 24px;
  position: relative;
  top: 24px;
  left: 8px;
  padding-right: 10px;
`;
const LargeBubbleTitle = styled.span`
  display: block;
  font-family: "Helvetica-Bold", "Helvetica", sans-serif;
  color: white;
  font-size: 38px;
  -webkit-letter-spacing: 0px;
  -moz-letter-spacing: 0px;
  -ms-letter-spacing: 0px;
  letter-spacing: 0px;
  font-weight: 700;
  width: 100%;
  padding: 1px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-left: 14px;
  border-bottom: 3px solid white;
`;
const IconContainers = styled.ul`
  width: 80%;
  height: 45px;
  margin-left: 20%;
  margin-top: 135px;
  padding: 0;
`;
const IconContainersChildren = styled.li`
  display: inline-flex;
  width: 45px;
  height: 45px;
  margin-right: 12px;
  background: white;
  border-radius: 15%;
  overflow: hidden;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    transform: scale(0.9);
  }
`;

/**
 * Large Bubble With Icons
 *
 * @param {string} title
 * @param {string} category_icon
 * @param {2D Array} companies
 * @param {function} onClick
 */
class BubbleLarge extends React.Component {
  bubble_button() {
    this.props.onClick();
  }

  render() {
    return (
      <div style={Ripple_Styles}>
        <RipplesLarge>
          <LargeBubbleContainer onClick={() => this.bubble_button()}>
            <LargeBubbleTittleContainer>
              <LargeBubbleIcon
                width="20px"
                height="20px"
                src={this.props.category_icon}
              />
              <LargeBubbleTitle>{this.props.title}</LargeBubbleTitle>
            </LargeBubbleTittleContainer>
            <IconContainers>
              {this.props.companies.map(company => (
                <IconContainersChildren
                  key={company[0]}
                  onClick={e => {
                    e.stopPropagation();
                    company[1]();
                  }}
                >
                  <img
                    width="32px"
                    height="32px"
                    style={{ margin: "auto" }}
                    src={company[0]}
                    alt="not found"
                  />
                </IconContainersChildren>
              ))}
            </IconContainers>
          </LargeBubbleContainer>
        </RipplesLarge>
      </div>
    );
  }
}

/**
 * Large Bubble w/o Icons
 *
 * @param {string} title
 * @param {function} onClick
 */
class BubbleLarge2 extends React.Component {
  render() {
    return (
      <div style={Ripple_Styles}>
        <RipplesLarge>
          <LargeBubbleContainer2 onClick={() => this.props.onClick()}>
            {this.props.title}
          </LargeBubbleContainer2>
        </RipplesLarge>
      </div>
    );
  }
}

//Medium Bubble CSS
const MediumBubbleContainer = styled.div`
  height: 200px;
  width: 200px;
  background: #186b87;
  display: block;
  overflow: hidden;
  margin: 0;
  border-radius: 50%;
  cursor: pointer;
`;
const MediumBubbleContainer2 = styled.div`
  height: 200px;
  width: 200px;
  background: #186b87;
  display: block;
  overflow: hidden;
  margin: 0;
  border-radius: 50%;
  font-family: "Helvetica-Bold", "Helvetica", sans-serif;
  color: white;
  letter-spacing: 0px;
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  vertical-align: middle;
  line-height: 195px;
  cursor: pointer;
`;
const MediumBubbleTitle = styled.span`
  display: block;
  font-family: "Helvetica-Bold", "Helvetica", sans-serif;
  color: white;
  font-size: 28px;
  -webkit-letter-spacing: 0px;
  -moz-letter-spacing: 0px;
  -ms-letter-spacing: 0px;
  letter-spacing: 0px;
  font-weight: 700;
  width: 100%;
  margin-left: auto;
  text-align: center;
`;
const MediumBubbleIcon = styled.img`
  display: block;
  max-width: 24px;
  max-height: 24px;
  position: relative;
  margin: auto;
  margin-top: 32%;
  margin-bottom: 10px;
`;

/**
 * Medium Bubble With Icon
 *
 * @param {string} title
 * @param {string} category_icon
 * @param {function} onClick
 */
class BubbleMedium extends React.Component {
  render() {
    return (
      <div style={Ripple_Styles}>
        <RipplesMedium>
          <MediumBubbleContainer onClick={() => this.props.onClick()}>
            <MediumBubbleIcon
              width="20px"
              height="20px"
              src={this.props.category_icon}
            />
            <MediumBubbleTitle>{this.props.title}</MediumBubbleTitle>
          </MediumBubbleContainer>
        </RipplesMedium>
      </div>
    );
  }
}

/**
 * Medium Bubble w/o Icons
 *
 * @param {string} title
 * @param {string} category_icon
 * @param {2D Array} companies
 * @param {function} onClick
 */
class BubbleMedium2 extends React.Component {
  render() {
    return (
      <div style={Ripple_Styles}>
        <RipplesMedium>
          <MediumBubbleContainer2 onClick={() => this.props.onClick()}>
            {this.props.title}
          </MediumBubbleContainer2>
        </RipplesMedium>
      </div>
    );
  }
}

//Medium Bubble CSS
const SmallBubbleContainer = styled.div`
  height: 100px;
  width: 100px;
  background: #1d477f;
  display: block;
  overflow: hidden;
  margin: 0;
  border-radius: 50%;
  font-family: "Helvetica-Bold", "Helvetica", sans-serif;
  color: white;
  letter-spacing: 0px;
  font-weight: 700;
  text-align: center;
  vertical-align: middle;
  line-height: 93px;
  cursor: pointer;
`;

/**
 * Small Bubble
 *
 * @param {string} title
 * @param {function} onClick
 */
class BubbleSmall extends React.Component {
  render() {
    return (
      <div style={Ripple_Styles}>
        <RipplesSmall>
          <SmallBubbleContainer onClick={() => this.props.onClick()}>
            {this.props.title}
          </SmallBubbleContainer>
        </RipplesSmall>
      </div>
    );
  }
}

export { BubbleLarge, BubbleLarge2, BubbleMedium, BubbleMedium2, BubbleSmall };
