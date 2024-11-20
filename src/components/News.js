import React, { Component } from "react";
import Loader from "./Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import NewsCard from "./NewsCard";

export default class News extends Component {
  apiKey = process.env.REACT_APP_NEWS_API;

  static defaultProps = {
    pageSize: 8,
    category: "general",
  };

  toUppercaseTitle = (title) => {
    return title.toUpperCase();
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `NEWS FATAFAT - ${this.toUppercaseTitle(
      this.props.category
    )}`;
  }

  async updateRendering() {
    const newsAPI = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    try {
      this.props.onProgressState(10);
      const data = await fetch(newsAPI);
      this.props.onProgressState(30);
      const parsedData = await data.json();
      this.props.onProgressState(80);

      this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false,
      });

      this.props.onProgressState(100);
    } catch (error) {
      console.error("Error fetching news:", error);
      this.setState({ loading: false });
      this.props.onProgressState(100);
    }
  }

  async componentDidMount() {
    await this.updateRendering();
  }

  fetchMoreData = async () => {
    const nextPage = this.state.page + 1;
    const newsAPI = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.apiKey}&page=${nextPage}&pageSize=${this.props.pageSize}`;

    try {
      const data = await fetch(newsAPI);
      const parsedData = await data.json();

      this.setState({
        page: nextPage,
        articles: [...this.state.articles, ...parsedData.articles],
        totalResults: parsedData.totalResults,
      });
    } catch (error) {
      console.error("Error fetching more news:", error);
    }
  };
  async componentDidUpdate(prevProps) {
    // Check if relevant props have changed
    if (
      prevProps.category !== this.props.category ||
      prevProps.country !== this.props.country ||
      prevProps.pageSize !== this.props.pageSize
    ) {
      // Reset state and update rendering
      this.setState({ page: 1, articles: [], loading: true }, async () => {
        await this.updateRendering();
      });

      // Update the document title if the category changes
      if (prevProps.category !== this.props.category) {
        document.title = `NEWS FATAFAT - ${this.toUppercaseTitle(
          this.props.category
        )}`;
      }
    }
  }

  render() {
    const hasMore = this.state.articles.length < this.state.totalResults;

    return (
      <div className="min-h-screen transition-colors duration-300 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-screen-xl px-1 py-6 mx-auto">
          {this.state.loading ? (
            <div className="flex items-center justify-center w-full min-h-[50vh]">
              <Loader />
            </div>
          ) : (
            <InfiniteScroll
              dataLength={this.state.articles.length}
              next={this.fetchMoreData}
              hasMore={hasMore}
              loader={
                <div className="flex justify-center w-full py-4">
                  <Loader />
                </div>
              }
            >
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
                {this.state.articles.map((element) => {
                  if (element.title === "[Removed]") return null;
                  return (
                    <div
                      key={`${element.url}-${element.publishedAt}`}
                      className="flex justify-center w-full"
                    >
                      <NewsCard
                        title={element.title}
                        description={element.content}
                        urlToImage={element?.urlToImage || ""}
                        url={element.url}
                        source={element.source.name}
                        publishedAt={element.publishedAt}
                      />
                    </div>
                  );
                })}
              </div>
            </InfiniteScroll>
          )}

          {!hasMore && this.state.articles.length > 0 && (
            <div className="py-4 text-center">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                You're All Caught Up! ✨
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                No more articles to load
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
