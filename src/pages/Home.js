import React, { Component } from "react";
import "./Home.css";

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>Discover Relevant Warrants.</h1>
          <p>
            Developed collaboratively
            <br />
            <i>State of California Law Enforcement</i> +{" "}
            <i>
              Cal Poly DxHub <sub>powered by AWS</sub>
            </i>
          </p>
        </div>
      </div>
    );
  }
}
