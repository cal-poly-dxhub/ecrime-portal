import React from "react";
import styled from "styled-components";
import downloadIcon from "../../assets/icons/download.svg";
import { Storage } from "aws-amplify";

//Search Warrant CSS
const SearchWarrantContainer = styled.div`
  height: 300px;
  width: 240px;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: flex-end;
  margin: 0px;
  overflow: hidden;
  cursor: pointer;
  border-style: solid;
  box-sizing: content-box;
  border-width: 0px;
  border-color: rgba(65, 150, 165, 0.25);
  border-radius: 10%;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
  margin: 10px;
  transition: 0.2s;
  &:hover {
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.5);
  }
`;

// Relevency Score Styled component (color ranges)

const BottomContainer = styled.div`
  display: flex;
  width: 100%;
`;

const RankingBlock = styled.div`
  display: block;
  margin-left: 5px;
  margin-right: 5px;
  & > * {
    display: block;
    text-align: center;
    color: #7ac5c1;
    font-size: 16px;
    font-weight: 700;
    font-family: ".SFNSText", "SFProText-Regular", "SFUIText-Regular",
      ".SFUIText", sans-serif;
    margin: 5px;
  }
  & svg path:hover {
    fill: #186b87;
  }
`;

const InfoBlock = styled.div`
  display: block;
  width: 100%;
`;

const RelavanceScore = styled.div`
  font-family: "Helvetica-Bold", "Helvetica", sans-serif;
  color: ${props => props.relevancyColor};
  font-size: 16px;
  font-weight: 500;
  width: 100%;
  margin-bottom: 20px;
  //   margin-left: 20px;
  font-weight: 700;
`;

const Title = styled.div`
  font-family: "Helvetica-Bold", "Helvetica", sans-serif;
  color: black;
  font-size: 21px;
  font-weight: 600;
  margin-top: 17px;
  margin-bottom: 10px;
  //   margin-left: 20px;
  margin-right: 20px;
`;

const DateElement = styled.div`
  font-family: "Helvetica", "Helvetica", sans-serif;
  color: #b4bdcc;
  font-size: 15px;
  font-weight: 400;
  padding-left: 10px;
  width: 100%;
  text-align: right;
  margin-right: 20px;
`;

const PreviewContainer = styled.a`
  height: 100%;
  overflow: hidden;
  position: relative;
  text-decoration: none;
  font-size: 7px;
  color: black;
  text-align: left;
  & p {
    padding: 16px;
    margin: 0;
    filter: blur(1.5px);
  }
  &:hover {
    & .downloadHover {
      opacity: 1;
      line-height: 275px;
    }
  }
`;

const DownloadPreview = styled.div`
  height: 100%;
  width: 100%;
  background: rgba(255, 255, 255, 0.75);
  z-index: 2;
  text-align: center;
  line-height: 250px;
  vertical-align: middle;
  position: absolute;
  opacity: 0;
  transition: 0.5s;
  & img {
    width: 45px;
  }
`;

/**
 * Search Warrant Preview Card
 *
 * @param {string} key
 * @param {string} title
 * @param {double} relavance
 * @param {double} ranking // votes
 * @param {string} date
 * @param {string} previewImg
 * @param {string} downloadURL
 * @param {string} content //used to display a preview
 */
class SearchWarrant extends React.Component {
  //Converts regular date format to user friendly format based on the range of dates
  dateToDays(date) {
    let date1 = new Date(date);
    let date2 = new Date();
    let diffTime = Math.abs(date2.getTime() - date1.getTime());
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays - 1 > 99) {
      //return regular date if it's been >99 days
      return (
        date1.getMonth() + 1 + "/" + date1.getDate() + "/" + date1.getFullYear()
      );
    }
    if (diffDays - 1 === 1) {
      return "1 day ago";
    } else if (diffDays - 1 > 1) {
      return diffDays - 1 + " days ago";
    } else {
      return "Today";
    }
  }

  downloadWarrant = event => {
    Storage.get(this.props.id, { expires: 60 })
      .then(result => window.open(result))
      .catch(err => console.log(err));
  };

  render() {
    let relevancyColor =
      parseInt(this.props.relavance) > 79
        ? "#59B7B1"
        : parseInt(this.props.relavance) > 50
        ? "#186B87"
        : "#1D477F;";

    return (
      <SearchWarrantContainer>
        <PreviewContainer onClick={this.downloadWarrant} download>
          <DownloadPreview className="downloadHover">
            <img src={downloadIcon} alt="DOWNLOAD" />
          </DownloadPreview>
          <p>{this.props.content}</p>
        </PreviewContainer>

        <BottomContainer>
          <RankingBlock>
            <svg
              onClick={e => {
                e.stopPropagation();
              }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 121.55 132.81"
              preserveAspectRatio="none"
              width="19px"
              height="19px"
            >
              <g data-name="Layer 2">
                <path
                  d="M119.22 55.85L66.5 2.4a8 8 0 0 0-11.45 0L2.33 55.85a8 8 0 0 0 5.73 13.69h25V122a10.84 10.84 0 0 0 10.84 10.81h33.75A10.84 10.84 0 0 0 88.49 122V69.54h25a8 8 0 0 0 5.73-13.69z"
                  fill="#59b7b1"
                  data-name="Layer 4"
                />
              </g>
            </svg>
            <p>{this.props.ranking}</p>
            <svg
              onClick={e => {
                e.stopPropagation();
              }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 121.55 132.81"
              preserveAspectRatio="none"
              width="19px"
              height="19px"
            >
              <g data-name="Layer 2">
                <path
                  d="M2.33 77l52.72 53.46a8 8 0 0 0 11.45 0L119.22 77a8 8 0 0 0-5.73-13.69h-25V10.84A10.84 10.84 0 0 0 77.65 0H43.9a10.84 10.84 0 0 0-10.84 10.84v52.43h-25A8 8 0 0 0 2.33 77z"
                  fill="#59b7b1"
                  data-name="Layer 4"
                />
              </g>
            </svg>
          </RankingBlock>
          <InfoBlock>
            <Title>{this.props.title}</Title>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <RelavanceScore relevancyColor={relevancyColor}>
                {this.props.relavance}
              </RelavanceScore>
              <DateElement>{this.dateToDays(this.props.date)}</DateElement>
            </div>
          </InfoBlock>
        </BottomContainer>
      </SearchWarrantContainer>
    );
  }
}

export default SearchWarrant;
