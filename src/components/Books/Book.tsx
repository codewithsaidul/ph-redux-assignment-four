import type { BookProps } from "@/types/index.types";
import { Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const Book = ({ book }: BookProps) => {
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
        <Link
          to="/"
          className="text-2xl  font-bold text-book-primary duration-700 hover:text-book-danger hover:duration-700 hover:underline line-clamp-1"
        >
          {book.title}
        </Link>
        <p className="text-base">Author: {book.author}</p>
        <p className="text-lg">Stock: {book.copies}</p>
      </div>

      <div className="w-full grid grid-cols-2 gap-2">
        <Button className="col-span-1 cursor-pointer text-lg w-full bg-blue-600 duration-700 hover:bg-book-danger hover:duration-700">
          Edit
        </Button>
        <Button
          disabled={!book.available}
          className="col-span-1 cursor-pointer text-lg w-full bg-book-primary duration-700 hover:bg-book-danger hover:duration-700"
        >
          {!book.available ? "Unavailable" : "Borrow"}
        </Button>
      </div>

      <div className="absolute top-2 right-2 cursor-pointer text-red-500 font-bold">
        <Trash size={40} />
      </div>
    </div>
  );
};

export default Book;
