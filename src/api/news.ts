import { ApiParams } from "src/types";
import client from "./client";

export const getNews = async (params: ApiParams) => {
  const { data } = await client.get("/top-headlines", {
    params: {
      country: params.country || "us",
      category: params.category || "general",
      apiKey: process.env.REACT_APP_NEWS_API || "",
      page: params.page,
      pageSize: params.pageSize || 8,
    },
  });

  return data;
};
