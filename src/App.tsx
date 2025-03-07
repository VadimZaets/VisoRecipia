import React from 'react';
import { Route, Routes } from "react-router-dom";
import styles from "./App.module.scss";
import {Header} from "./components/Header/Header";
import {HomePage} from "./components/HomePage/HomePage";

function App() {
  return (
    <div className={styles.App}>
      <Header />
      <main>
        <Routes>
            <Route path={"/"} element={<HomePage />} />
        </Routes>
        </main>
    </div>
  );
}

export default App;
