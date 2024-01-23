import React, { Component } from "react";
import Loader from "./Loader";
import NewsItems from "./NewsItems";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  apiKey = process.env.REACT_APP_NEWS_API;
  
  static defaultProps = {
    pageSize: 9,
    category: 'general'
  }

  toUppercaseTitle = (title) => {
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
    let newsAPI = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.props.onProgressState(10);
    let data = await fetch(newsAPI);
    this.props.onProgressState(30);
    let parsedData = await data.json();
    this.props.onProgressState(80);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.onProgressState(100);
  }

  async componentDidMount() {
    this.updateRendering();
  }

  fetchMoreData = async () => {
    this.setState({ page: ++this.state.page });
    let newsAPI = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
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
      </>
    );
  }
}
