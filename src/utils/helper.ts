import { AxiosError } from "axios";
import { Country } from "src/types";

export const handleAxiosError = (error: unknown) => {
  if (error instanceof AxiosError) {
    if (error.response?.data) {
      return error.response.data;
    }
    return { error: error.message };
  }
  return { error: "An unknown error occurred" };
};
export const countries: Country[] = [
  { code: "us", name: "EN", flag: "🇺🇸" },
  { code: "np", name: "नेपा", flag: "🇳🇵" },
];
