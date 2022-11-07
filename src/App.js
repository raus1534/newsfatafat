import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import LoadingBar from "react-top-loading-bar";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default class App extends Component {
  state = {
    progress: 0,
    country:"in"
  };

  progressChange = (newProgress)=>{
    this.setState({progress:newProgress})
  }

  countryChange = (newCountry)=>{
    this.setState({country:newCountry})
    this.forceUpdate();
  }
  render() {
    return (
      <Router>
        <Navbar countryChange={this.countryChange} />
        <LoadingBar color="#f11946" progress={this.state.progress} height={4} />
        <Routes>
          <Route
            exact
            path="/"
            element={<News country={this.state.country} onProgressState={this.progressChange} key="general" category="general" pageSize="9" />}
          />
          <Route
            exact
            path="/business"
            element={<News country={this.state.country} onProgressState={this.progressChange} key="business" category="business" pageSize="9" />}
          />
          <Route
            exact
            path="/entertainment"
            element={
              <News country={this.state.country} onProgressState={this.progressChange} key="entertainment" category="entertainment" pageSize="9" />
            }
          />
          <Route
            exact
            path="/health"
            element={<News country={this.state.country} onProgressState={this.progressChange} key="health" category="health" pageSize="9" />}
          />
          <Route
            exact
            path="/science"
            element={<News country={this.state.country} onProgressState={this.progressChange} key="science" category="science" pageSize="9" />}
          />
          <Route
            exact
            path="/sport"
            element={<News country={this.state.country} onProgressState={this.progressChange} key="sports" category="sports" pageSize="9" />}
          />
          <Route
            exact
            path="/tech"
            element={
              <News country={this.state.country} onProgressState={this.progressChange} key="technology" category="technology" pageSize="9" />
            }
          />
        </Routes>
      </Router>
    );
  }
}
