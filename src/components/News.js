import React, { Component } from "react";
import Loader from "./Loader";
import NewsItems from "./NewsItems";

export default class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1
    };
  }

  async updateRendering() {
    this.setState({loading:true})
    let newAPI = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=121808bfb87c4fd7b5a8e45b3b04184f&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(newAPI);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults:parsedData.totalResults,
      loading:false
    });
  }
  async componentDidMount() {
    this.updateRendering();
}
renderPreviousNews = async () => {
    this.setState({
        page: --this.state.page
    });
    this.updateRendering();
};
renderNextNews = async () => {
    this.setState({
        page: ++this.state.page
    });
    this.updateRendering();
  };
  render() {
    return (
      <>
        <div className="container my-3">
          {this.state.loading && <Loader/>} 
          <div className="row">
            {!this.state.loading && this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItems
                    title={element.title}
                    description={element.description}
                    urlToImage={element.urlToImage}
                    url={element.url}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="container my-2 d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.renderPreviousNews}
            disabled={this.state.page<=1}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-primary"
            disabled={this.state.page===Math.ceil(this.state.totalResults/this.props.pageSize)}
            onClick={this.renderNextNews}
          >
            Next &rarr;
          </button>
        </div>
      </>
    );
  }
}
