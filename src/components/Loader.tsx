import React, { Component } from "react";

export default class Loader extends Component {
  render(): React.ReactNode {
    return (
      <div className="text-center">
        <img src={"./loading.gif"} alt="loading" />
      </div>
    );
  }
}
