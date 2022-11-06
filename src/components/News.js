import React, { Component } from "react";
import Loader from "./Loader";
import NewsItems from "./NewsItems";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    pageSize: 9,
    category: 'general'
  }

toUppercaseTitle=(title)=>{
  return title.toUpperCase();
}

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
    };
    document.title = `NEWS FATAFAT - ${this.toUppercaseTitle(this.props.category)}`
  }

  async updateRendering() {
    let newsAPI = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=121808bfb87c4fd7b5a8e45b3b04184f&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(newsAPI);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  async componentDidMount() {
    this.updateRendering();
  }
  // renderPreviousNews = async () => {
  //   this.setState({
  //     page: --this.state.page,
  //   });
  //   this.updateRendering();
  // };
  // renderNextNews = async () => {
  //   this.setState({
  //     page: ++this.state.page,
  //   });
  //   this.updateRendering();
  // };

  fetchMoreData = async () => {
    this.setState({ page: ++this.state.page });
    let newsAPI = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=121808bfb87c4fd7b5a8e45b3b04184f&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(newsAPI);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
  };
  
  render() {
    return (
      <>
        <div className="container my-3">
          <h1 className="text-center">NEWS FATAFAR - {this.toUppercaseTitle(this.props.category)}</h1>
          {this.state.loading && <Loader />}
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Loader />}
          >
            <div className="container">
              <div className="row">
                {!this.state.loading &&
                  this.state.articles.map((element) => {
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
          </InfiniteScroll>
          {!(this.state.articles.length !== this.state.totalResults) && (
            <h1 className="text-center">THE END</h1>
          )}
        </div>
        {/* <div className="container my-2 d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.renderPreviousNews}
            disabled={this.state.page <= 1}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-primary"
            disabled={
              this.state.page ===
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            onClick={this.renderNextNews}
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  }
}
