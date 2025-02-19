import React, { useState } from "react";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  NavLink,
  Outlet,
} from "react-router-dom";

import { QuizProvider } from "./Context/Context";
import Quiz from "./Components/QuizApp";
import styles from "./Styles/Navbar.module.css";
import logo from "./assets/logo.png";
import QuizCard from "./Components/QuizStart";
import Result from "./Components/Result";
import QuizHistory from "./Components/QuizHistory";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <img style={{ width: "100px", marginLeft: "20px" }} src={logo} />
      <div className={styles.logo}>Quiz</div>
    </nav>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Outlet />
      </>
    ),
    children: [
      {
        path: "/",
        element: (
          <>
            <QuizCard />
          </>
        ),
      },
      { path: "quiz", element: <Quiz /> },
      { path: "/result", element: <Result /> },
      { path: "/history", element: <QuizHistory /> },
    ],
  },
]);

const App = () => {
  return (
    <QuizProvider>
      <RouterProvider router={router}>
        <Outlet />
      </RouterProvider>
    </QuizProvider>
  );
};

export default App;
