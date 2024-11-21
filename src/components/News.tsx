import React, { Component } from "react";
import Loader from "./Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import NewsCard from "./NewsCard";
import { NewsProps, NewsState } from "../types";
import { getNews } from "src/api/news";
import { RotateCw } from "lucide-react";

export default class News extends Component<NewsProps, NewsState> {
  static defaultProps: Partial<NewsProps> = {
    pageSize: 8,
    category: "general",
  };

  private toUppercaseTitle = (title: string): string => {
    return title.toUpperCase();
  };

  constructor(props: NewsProps) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
  }

  private async updateRendering(): Promise<void> {
    try {
      this.props.onProgressState(10);
      const parsedData = await getNews({
        country: this.props.country,
        category: this.props.category,
        page: this.state.page,
        pageSize: this.props.pageSize,
      });

      this.props.onProgressState(50);

      this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults || parsedData.totalArticles,
        loading: false,
      });

      this.props.onProgressState(100);
    } catch (error) {
      console.error("Error fetching news:", error);
      this.setState({ loading: false });
      this.props.onProgressState(100);
    }
  }

  async componentDidMount(): Promise<void> {
    await this.updateRendering();
  }

  private fetchMoreData = async (): Promise<void> => {
    const nextPage = this.state.page + 1;

    try {
      const parsedData = await getNews({
        country: this.props.country,
        category: this.props.category,
        page: nextPage,
        pageSize: this.props.pageSize,
      });
      this.setState({
        page: nextPage,
        articles: [...this.state.articles, ...parsedData.articles],
        totalResults: parsedData.totalResults || parsedData.totalArticles,
      });
    } catch (error) {
      console.error("Error fetching more news:", error);
    }
  };

  async componentDidUpdate(prevProps: NewsProps): Promise<void> {
    if (
      prevProps.category !== this.props.category ||
      prevProps.country !== this.props.country ||
      prevProps.pageSize !== this.props.pageSize
    ) {
      this.setState({ page: 1, articles: [], loading: true }, async () => {
        await this.updateRendering();
      });
    }
  }

  render(): React.ReactNode {
    const hasMore = this.state?.articles?.length
      ? this.state?.articles?.length < this.state.totalResults
      : false;

    // Check if there are no articles or if articles is undefined
    const noArticlesMessage =
      !this.state?.articles?.length || this.state?.articles === undefined;

    return (
      <div className="min-h-screen transition-colors duration-300 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-screen-xl px-1 py-6 mx-auto">
          {this.state.loading ? (
            <div className="flex items-center justify-center w-full min-h-[50vh]">
              <Loader />
            </div>
          ) : noArticlesMessage ? (
            <div className="flex justify-center w-full min-h-[50vh] items-center flex-col">
              <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                No articles available at the moment. Please check back later.
              </p>
              <button
                onClick={this.updateRendering} // Triggers the fetch again
                className="flex items-center justify-center px-4 py-2 mt-4 text-white transition-colors duration-300 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <RotateCw className="w-6 h-6 mr-2" />
                <span className="ml-2 text-sm">Reload</span>
              </button>
            </div>
          ) : (
            <InfiniteScroll
              dataLength={this.state?.articles?.length || 0}
              next={this.fetchMoreData}
              hasMore={hasMore}
              loader={
                <div className="flex justify-center w-full py-4">
                  <Loader />
                </div>
              }
            >
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
                {this.state?.articles &&
                  this.state?.articles?.map((element) => {
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

          {!hasMore && (this.state?.articles?.length || 0) > 0 && (
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
