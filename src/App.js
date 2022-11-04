import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<News key="general" category="general" pageSize='9' />} />
          <Route exact path="/business" element={<News key="business" category="business" pageSize='9' />} />
          <Route exact path="/entertainment" element={<News key="entertainment" category="entertainment" pageSize='9' />} />
          <Route exact path="/health" element={<News key="health" category="health" pageSize='9' />} />
          <Route exact path="/science" element={<News key="science" category="science" pageSize='9' />} />
          <Route exact path="/sport" element={<News key="sports" category="sports" pageSize='9' />} />
          <Route exact path="/tech" element={<News key="technology" category="technology" pageSize='9' />} />
        </Routes>
      </Router>
    );
  }
}
