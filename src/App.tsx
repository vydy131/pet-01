import React from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import NewsScreen from "./components/NewsScreen/NewsScreen";
import Header from "./components/Header/Header";
import AboutScreen from "./components/AboutScreen/AboutScreen";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/NewsScreen" Component={NewsScreen} />
          <Route path="/AboutScreen" Component={AboutScreen} />
          <Route path="*" element={<Navigate to="/NewsScreen" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
