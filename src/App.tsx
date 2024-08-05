import React from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import NewsScreen from "./components/NewsScreen/NewsScreen";
import Header from "./components/Header/Header";
import AboutScreen from "./components/AboutScreen/AboutScreen";
import {
  GlobalRootStore,
  GlobalRootStoreContext,
} from "./globalStores/GlobalStoreProvider";

function App() {
  return (
    <div className="App">
      <GlobalRootStoreContext.Provider value={new GlobalRootStore()}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/NewsScreen" Component={NewsScreen} />
            <Route path="/AboutScreen" Component={AboutScreen} />
            <Route path="*" element={<Navigate to="/NewsScreen" replace />} />
          </Routes>
        </BrowserRouter>
      </GlobalRootStoreContext.Provider>
    </div>
  );
}

export default App;
