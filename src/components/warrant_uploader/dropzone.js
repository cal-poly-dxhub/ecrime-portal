import React, { useMemo, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import filesIcon from "../../assets/icons/files.svg";
import SVGIcon from "../../assets/icons/SVGIcon";

const docIcon = {
  width: 80
};

const baseStyle = {
  flex: 1,
  width: "77%",
  height: "130px",
  marginLeft: "10%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 5,
  borderColor: "#a4a4a4",
  borderStyle: "dashed",
  backgroundColor: "white",
  color: "#bdbdbd",
  outline: "none",
  textAlign: "center",
  lineHeight: "15px",
  fontFamily: '".SFNSText", SFProText-Regular',
  transition: "border .24s ease-in-out"
};

const activeStyle = {
  borderColor: "#59b7b1"
};

function DragDropBox(props) {
  const onDrop = useCallback(
    acceptedFiles => {
      props.documentHandler(acceptedFiles);
    },
    [props]
  );
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive
  } = useDropzone({
    accept: ".doc,.docx,.pdf,.txt",
    onDrop
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {})
    }),
    [isDragActive]
  );

  const files = acceptedFiles.map(file => (
    <h4 key={file.path}>
      {file.path} - {file.size} bytes
    </h4>
  ));

  return (
    <section className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <img width="40px" src={filesIcon} alt="UPLOAD" />
        <SVGIcon name={"files"} style={docIcon} />
        <p>
          Drag and drop any <br />
          <b>docx</b> file
        </p>
        {files}
      </div>
    </section>
  );
}

export default DragDropBox;
