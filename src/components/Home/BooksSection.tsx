import { useGetBooksQuery } from "@/redux/feature/books/booksAPI";
import Book from "./Book";
import type { Book as BookInterface } from "@/types/index.types";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { LoadingSkeleton } from "../Loading/LoadingSkeleton";
import { useState } from "react";
import BorrowModal from "../BorrowModal/BorrowModal";

const BooksSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [bookTitle, setBookTitle] = useState<string | null>(null);
  const { data, isLoading } = useGetBooksQuery({ page: 1, limit: 10 });

  let content = null;

  if (isLoading) {
    content = <LoadingSkeleton />;
  } else {
    const { data: books } = data;
    content = (
      <div>
        {" "}
        {/* books container */}
        <div className="mt-32">
          {books.length > 0 ? (
            <div>
              <div className="grid items-center grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-10">
                {books.slice(0, 4).map((book: BookInterface) => (
                  <Book
                    key={book._id}
                    book={book}
                    handleModalOpen={handleModalOpen}
                  />
                ))}
              </div>

              <div className="flex justify-center mt-16">
                <Button
                  size={"lg"}
                  className="bg-book-primary duration-700 hover:bg-book-danger hover:duration-700 text-center"
                >
                  <Link to="/books">See All</Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center mt-20">
              <p className="text-2xl font-medium text-book-accent">
                No Book found!
              </p>
            </div>
          )}
        </div>
        {/* =========== borrow modal ================= */}
        <div>
          <BorrowModal
            bookId={selectedBook}
            bookTitle={bookTitle}
            open={isOpen}
            onOpenChange={setIsOpen}
          />
        </div>
      </div>
    );
  }

  const handleModalOpen = (bookId: string, title: string) => {
    setIsOpen(!isOpen);
    setSelectedBook(bookId);
    setBookTitle(title);
  };

  return (
    <div className="my-32">
      <div className="flex justify-center mb-10">
        <h2 className="text-3xl font-semibold text-book-primary !text-center border-b border-book-primary inline-block pb-2">
          Latest Books
        </h2>
      </div>

      {content}
    </div>
  );
};

export default BooksSection;
