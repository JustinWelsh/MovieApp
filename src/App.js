import React from "react";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Watchlist from "./pages/Watchlist";
import About from "./pages/About";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MovieSearchProvider } from "./context/MovieSearchContext";
import { WatchlistProvider } from "./context/WatchlistContext";
import MainLayout from "./layout/MainLayout";

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "search",
          element: <Search />,
        },
        {
          path: "watchlist",
          element: <Watchlist />,
        },
        {
          path: "about",
          element: <About />,
        },
      ],
    },
  ]);

const App = () => {
  return (
    <WatchlistProvider>
      <MovieSearchProvider>
        <RouterProvider router={router} />
      </MovieSearchProvider>
    </WatchlistProvider>
  );
};

export default App;
