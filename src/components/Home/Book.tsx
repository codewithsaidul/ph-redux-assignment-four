import type { BookProps } from "@/types/index.types";
import { Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useDeleteBooksMutation } from "@/redux/feature/books/booksAPI";
import Swal from "sweetalert2";

const Book = ({ book }: BookProps) => {
  const [deleteBook] = useDeleteBooksMutation();

  const handleDeleteBook = async (bookId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    try {
      if (result.isConfirmed) {
        const res = await deleteBook({
          bookId: bookId,
          page: 1,
          limit: 4,
        }).unwrap();
        if (res.success && res.message === "Book deleted successfully") {
          Swal.fire({
            title: "Successfully!",
            text: res.message,
            icon: "success",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative p-4 h-full min-sm:h-[700px] space-y-12 bg-[#f2f2f2] shadow-[0_0_2px_rgba(0,0,0,0.25)] rounded-md">
      <div>
        <figure className="w-full mx-auto">
          <img
            src={book.thumbnail}
            alt={book.title}
            className="object-center w-full min-sm:max-h-[400px] mx-auto"
          />
        </figure>
      </div>

      <div className="space-y-1">
        <h2 className="text-2xl  font-bold text-book-primary duration-700 hover:text-book-danger hover:duration-700 hover:underline line-clamp-1">
          {book.title}
        </h2>
        <p className="text-base">Author: {book.author}</p>
        <p className="text-lg">Stock: {book.copies}</p>
      </div>

      <div className="w-full grid grid-cols-2 gap-2">
        <Link to={`/edit-book/${book._id}`} className="col-span-1">
          <Button className="col-span-1 cursor-pointer text-lg w-full bg-blue-600 duration-700 hover:bg-book-danger hover:duration-700">
            Edit
          </Button>
        </Link>
        <Button
          disabled={!book.available}
          className="col-span-1 cursor-pointer text-lg w-full bg-book-primary duration-700 hover:bg-book-danger hover:duration-700"
        >
          {!book.available ? "Unavailable" : "Borrow"}
        </Button>
        <Link to={`/books/${book._id}`} className="col-span-2">
          <Button className="col-span-2 cursor-pointer text-lg w-full bg-book-accent duration-700 hover:bg-book-accent/60 hover:duration-700">
            View Deails
          </Button>
        </Link>
      </div>

      <div
        onClick={() => handleDeleteBook(book._id)}
        className="absolute top-2 right-2 cursor-pointer text-red-500 font-bold"
      >
        <Trash2Icon size={40} />
      </div>
    </div>
  );
};

export default Book;
