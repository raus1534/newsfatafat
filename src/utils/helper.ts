import { AxiosError } from "axios";

export const handleAxiosError = (error: unknown) => {
  if (error instanceof AxiosError) {
    if (error.response?.data) {
      return error.response.data;
    }
    return { error: error.message };
  }
  return { error: "An unknown error occurred" };
};
