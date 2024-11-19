import React, { useState, useCallback } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import LoadingBar from "react-top-loading-bar";
import "./index.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Memoize the News component to avoid unnecessary re-renders
const MemoizedNews = React.memo(({ category, country, onProgressState }) => {
  return (
    <News
      country={country}
      onProgressState={onProgressState}
      category={category}
      pageSize="9"
    />
  );
});

const App = () => {
  const [progress, setProgress] = useState(0);
  const [country, setCountry] = useState("us");

  // Using useCallback to memoize the function and avoid unnecessary re-renders
  const progressChange = useCallback((newProgress) => {
    setProgress(newProgress);
  }, []);

  const countryChange = useCallback((newCountry) => {
    setCountry(newCountry);
  }, []);

  return (
    <Router>
      <Navbar countryChange={countryChange} />
      <LoadingBar color="#f11946" progress={progress} height={4} />
      <Routes>
        <Route
          exact
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
          exact
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
          exact
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
          exact
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
          exact
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
          exact
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
          exact
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
