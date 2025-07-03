import MainLayout from "@/Layout/MainLayout";
import { AddBook } from "@/pages/AddBook/AddBook";
import Bookdetails from "@/pages/BookDetails/Bookdetails";
import AllBooks from "@/pages/Books/AllBooks";
import BorrowSummary from "@/pages/BorrowSummary/BorrowSummary";
import EditBook from "@/pages/EditBook/EditBook";
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
        Component: AddBook,
      },
      {
        path: "/books/:id",
        Component: Bookdetails,
      },
      {
        path: "/edit-book/:id",
        Component: EditBook,
      },
      {
        path: "/borrow-summary",
        Component: BorrowSummary,
      },
    ],
  },
]);
