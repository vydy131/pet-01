import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewsScreen from "./components/NewsScreen/NewsScreen";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="" Component={NewsScreen} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
