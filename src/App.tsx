import React from 'react';
import { Route, Routes } from "react-router-dom";
import styles from "./App.module.scss";
import {Header} from "./components/Header/Header";
import {HomePage} from "./components/HomePage/HomePage";
import {MealPage} from "./components/MealPage/MealPage";
import {SelectionsPage} from "./components/SelectionsPage/SelectionsPage";

function App() {
  return (
    <div className={styles.App}>
      <Header />
      <main>
        <Routes>
            <Route path={"/"} element={<HomePage />} />
            <Route path="/meal/:id" element={<MealPage />} />
            <Route path="/selections" element={<SelectionsPage/>} />
        </Routes>
        </main>
    </div>
  );
}

export default App;
