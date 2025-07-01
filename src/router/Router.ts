import MainLayout from "@/Layout/MainLayout";
import { AddNews } from "@/pages/AddNews/AddNews";
import AllBooks from "@/pages/Books/AllBooks";
import Home from "@/pages/Home/Home";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/books",
        Component: AllBooks,
      },
      {
        path: "/create-book",
        Component: AddNews,
      },
    ],
  },
]);
