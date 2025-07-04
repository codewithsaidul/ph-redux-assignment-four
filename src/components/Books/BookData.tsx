import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeleteBooksMutation,
  useGetBooksQuery,
} from "@/redux/feature/books/booksAPI";
import type { Book } from "@/types/index.types";
import { Button } from "../ui/button";
import { SquarePen, Trash2Icon } from "lucide-react";
import { useState } from "react";
import PaginationPage from "../Pagination/Pagination";
import { Link } from "react-router-dom";
import BorrowModal from "../BorrowModal/BorrowModal";
import { LoadingSkeleton } from "../Loading/LoadingSkeleton";
import Swal from "sweetalert2";

const BookData = () => {
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [bookTitle, setBookTitle] = useState<string | null>(null);
  const { data, isLoading } = useGetBooksQuery({ page: page, limit: 10 });
  const [deleteBook] = useDeleteBooksMutation();

  if (isLoading) return <div className="mt-20"><LoadingSkeleton /></div>;

  const { data: books, pagination } = data;

  // handle modal
  const handleModalOpen = (bookId: string, title: string) => {
    setIsOpen(!isOpen);
    setSelectedBook(bookId);
    setBookTitle(title);
  };

  // handle book delete
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
          page: page,
          limit: 10,
        }).unwrap();
        if (res.success && res.message === "Book deleted successfully") {
          Swal.fire({
            title: "Successfully!",
            text: res.message,
            icon: "success",
          });
        }
      }
    } catch {
      Swal.fire({
        title: "Failed!",
        text: "Failed to Delete a Book",
        icon: "error",
      });
    }
  };

  return (
    <div>
      <Table className="mt-20">
        <TableHeader>
          <TableRow>
            <TableHead className="text-2xl">Title</TableHead>
            <TableHead className="text-2xl text-center">Author</TableHead>
            <TableHead className="text-2xl text-center">Genre</TableHead>
            <TableHead className="text-2xl text-center">ISBN</TableHead>
            <TableHead className="text-2xl text-center">Copies</TableHead>
            <TableHead className="text-2xl text-center">Availability</TableHead>
            <TableHead className="text-center text-2xl">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book: Book) => (
            <TableRow key={book._id}>
              <TableCell className="font-medium text-xl">
                {book.title}
              </TableCell>
              <TableCell className="font-medium text-center">
                {book.author}
              </TableCell>
              <TableCell className="font-medium text-center">
                {book.genre}
              </TableCell>
              <TableCell className="font-medium text-center">
                {book.isbn}
              </TableCell>
              <TableCell className="font-medium text-center">
                {book.copies}
              </TableCell>
              <TableCell className="font-medium text-center">
                {!book.available ? "Unavailable" : "Available"}
              </TableCell>
              <TableCell className="font-medium text-right flex gap-2 items-end justify-end">
                <Link to={`/books/${book._id}`}>
                  <Button className="cursor-pointer">View Details</Button>
                </Link>
                <Button
                  disabled={!book.available}
                  onClick={() => handleModalOpen(book._id, book.title)}
                  className="cursor-pointer bg-book-accent duration-700 hover:bg-book-danger hover:duration-700 text-xl"
                >
                  {book.available ? "Borrow" : "Unavailable"}
                </Button>
                <Link to={`/edit-book/${book._id}`}>
                  <Button className="cursor-pointer bg-blue-700 duration-700 hover:bg-blue-600 hover:duration-700 text-xl">
                    <SquarePen />
                  </Button>
                </Link>
                <Button
                  onClick={() => handleDeleteBook(book._id)}
                  className="cursor-pointer bg-red-500 duration-700 hover:bg-book-danger hover:duration-700 text-xl"
                >
                  <Trash2Icon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* =================== modal =================== */}
      <div>
        <BorrowModal
          bookId={selectedBook}
          bookTitle={bookTitle}
          open={isOpen}
          onOpenChange={setIsOpen}
        />
      </div>

      {/* ================= no book found message =========== */}
      {books.length <= 0 && (
        <div className="mt-20">
          <p className="text-2xl font-bold text-center">books not available</p>
        </div>
      )}

      {/* ====================== pagination ======================= */}
      {books.length > 9 && (
        <div className="mt-40">
          {" "}
          <PaginationPage
            page={page}
            setPage={setPage}
            totalPages={pagination.totalPages}
          />{" "}
        </div>
      )}
    </div>
  );
};

export default BookData;
