import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetBooksQuery } from "@/redux/feature/books/booksAPI";
import type { Book } from "@/types/index.types";
import { Button } from "../ui/button";
import { SquarePen, Trash2Icon } from "lucide-react";

const BookData = () => {
  const { data, isLoading } = useGetBooksQuery({ page: 1, limit: 10 });

  if (isLoading) return <div>Loading...</div>;

  const { data: books } = data;

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
              <TableCell className="font-medium text-xl">{book.title}</TableCell>
              <TableCell className="font-medium text-center">{book.author}</TableCell>
              <TableCell className="font-medium text-center">{book.genre}</TableCell>
              <TableCell className="font-medium text-center">{book.isbn}</TableCell>
              <TableCell className="font-medium text-center">{book.copies}</TableCell>
              <TableCell className="font-medium text-center">{!book.available ? "Unavailable" : "Available"}</TableCell>
              <TableCell className="font-medium text-right flex gap-2 items-end justify-end">
                <Button className="cursor-pointer">View Details</Button>
                <Button className="cursor-pointer bg-book-accent duration-700 hover:bg-book-danger hover:duration-700 text-xl">Borrow</Button>
                <Button className="cursor-pointer bg-blue-700 duration-700 hover:bg-blue-600 hover:duration-700 text-xl">
                    <SquarePen />
                </Button>
                <Button className="cursor-pointer bg-red-500 duration-700 hover:bg-book-danger hover:duration-700 text-xl">
                    <Trash2Icon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookData;
