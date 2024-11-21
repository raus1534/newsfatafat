import React, { useState, useCallback } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import LoadingBar from "react-top-loading-bar";
import "./index.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MemoizedNewsProps } from "./types";

const MemoizedNews: React.FC<MemoizedNewsProps> = React.memo(
  ({ category, country, onProgressState }) => {
    return (
      <News
        country={country}
        onProgressState={onProgressState}
        category={category}
        pageSize={8}
      />
    );
  }
);

const App: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);
  const [country, setCountry] = useState<string>("us");

  // Using useCallback to memoize the function and avoid unnecessary re-renders
  const progressChange = useCallback((newProgress: number) => {
    setProgress(newProgress);
  }, []);

  const countryChange = useCallback((newCountry: string) => {
    setCountry(newCountry);
  }, []);

  return (
    <Router>
      <Navbar countryChange={countryChange} />
      <LoadingBar color="#f11946" progress={progress} height={4} />
      <Routes>
        <Route
          path="/"
          element={
            <MemoizedNews
              category="general"
              country={country}
              onProgressState={progressChange}
            />
          }
        />
        <Route
          path="/business"
          element={
            <MemoizedNews
              category="business"
              country={country}
              onProgressState={progressChange}
            />
          }
        />
        <Route
          path="/entertainment"
          element={
            <MemoizedNews
              category="entertainment"
              country={country}
              onProgressState={progressChange}
            />
          }
        />
        <Route
          path="/health"
          element={
            <MemoizedNews
              category="health"
              country={country}
              onProgressState={progressChange}
            />
          }
        />
        <Route
          path="/science"
          element={
            <MemoizedNews
              category="science"
              country={country}
              onProgressState={progressChange}
            />
          }
        />
        <Route
          path="/sport"
          element={
            <MemoizedNews
              category="sports"
              country={country}
              onProgressState={progressChange}
            />
          }
        />
        <Route
          path="/tech"
          element={
            <MemoizedNews
              category="technology"
              country={country}
              onProgressState={progressChange}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
