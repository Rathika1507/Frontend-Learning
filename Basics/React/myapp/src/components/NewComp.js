import React, { Component } from "react";
import images from "./images.png";
import imagesb from "./imagesb.png";

export class Newcomp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "Subscribe to Chickko Tickko",
      sub: "Subscribe",
      imageURL: imagesb
    };
  }

  styles = {
    fontStyle: "italic",
    color: "purple"
  };

  Buttonchange = () => {
    this.setState({
      message: "Hit the bell icon to never miss an update",
      sub: "Subscribe"
    });
  };

  imageChange = () => {
    this.setState({
      imageURL: images,
      message: "Thank you! Happy and Enjoy!"
    });
  };

  render() {
    return (
      <div className="App">
        <h3 style={this.styles}>{this.state.message}</h3>
        <button onClick={this.Buttonchange}>{this.state.sub}</button>
        <p />
        <img
          style={{ width: "40px", height: "40px", cursor: "pointer" }}
          src={this.state.imageURL}
          alt="bell icon"
          onClick={this.imageChange}
        />
      </div>
    );
  }
}

export default Newcomp;
