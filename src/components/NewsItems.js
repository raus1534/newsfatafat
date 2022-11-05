import React, { Component } from "react";
import stockimg from "../img/newsimg.jpg";

export default class NewsItems extends Component {
  render() {
    let { title, description, urlToImage, url,source } = this.props;
    return (
      <>
        <div className="card my-3" style={{ width: "18rem" }}>
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {source}
          </span>
          <img
            src={urlToImage ? urlToImage : stockimg}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              Read here
            </a>
          </div>
        </div>
      </>
    );
  }
}
