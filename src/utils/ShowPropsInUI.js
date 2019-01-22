import React from "react";

const ShowPropsInUi = props => {
  return (
    <div>
      <div style={{ margin: "1rem 0" }}>
        <div style={{ fontFamily: "monospace" }} />
        <pre
          style={{
            background: "#f6f8fa",
            fontSize: ".65rem",
            padding: ".5rem"
          }}
        >
          {JSON.stringify(props.data, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default ShowPropsInUi;
