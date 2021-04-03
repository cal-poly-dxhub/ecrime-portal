import React from "react";
import styled from "styled-components";

const PdfContainer = styled.div`
  position: fixed;
  width: 100%
  height: 100%;
  display: block;
  margin: 0px;
  top: 0px;
  left: 0px;
  background: rgba(0, 0, 0, 0.5);
  cursor: auto;
`;
const Pdf = styled.embed`
  display: block;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.5);
  //   overflow: hidden !important;
  height: 100%;
  width: 65%;
  margin: auto;
`;
const Close = styled.button`
  display: block;
  position: absolute;
  top: 0;
  left: 100%;
  margin: 20px -70px;
  color: white;
  font-size: 34px;
  font-weight: 700;
`;

/**
 * PDF Viewer
 *
 * @param {string} pdfFile
 * @param {function} onClose
 */
class PdfViewer extends React.Component {
  render() {
    return (
      <PdfContainer
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <Pdf src={this.props.pdfFile} width="745" height="962" />
        <Close onClick={() => this.props.onClose()}>X</Close>
      </PdfContainer>
    );
  }
}

export default PdfViewer;
