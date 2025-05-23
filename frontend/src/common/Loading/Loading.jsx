import React from "react";
import "./styles/Loading.style.css";
import { Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <div>
      <div className="container loading-container">
        <Spinner animation="border" />
      </div>
    </div>
  );
};

export default Loading;
