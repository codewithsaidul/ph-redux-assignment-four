import { Button } from "@/components/ui/button";
import { useGetBorrowSummaryQuery } from "@/redux/feature/borrow/borrowAPI";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Borrow } from "@/types/index.types";
import { LoadingSkeleton } from "@/components/Loading/LoadingSkeleton";

const BorrowSummary = () => {
  const { data, isLoading } = useGetBorrowSummaryQuery(undefined);

  if (isLoading)
    return (
      <div className="grid grid-rows-1 md:grid-cols-3 gap-10 max-md:mt-32 mt-48">
        <LoadingSkeleton /> <LoadingSkeleton /> <LoadingSkeleton />
      </div>
    );

  const { data: borrowSummary } = data;

  return (
    <div className="mt-48 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
      <div className="flex max-[600px]:flex-col flex-row gap-2 justify-between items-center">
        <h2 className="text-book-primary text-5xl">
          Borrow Summary
        </h2>
        <Button
          size="lg"
          className="bg-book-primary duration-700 hover:bg-book-danger hover:duration-700 text-xl"
        >
          <Link to="/books">Borrow New Book</Link>
        </Button>
      </div>

      {/* summary data table */}
      <Table className="mt-20">
        <TableHeader>
          <TableRow>
            <TableHead className="text-2xl">Title</TableHead>
            <TableHead className="text-2xl text-center">ISBN</TableHead>
            <TableHead className="text-2xl text-center">
              Total Quantity
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {borrowSummary.map((borrow: Borrow) => (
            <TableRow key={borrow._id}>
              <TableCell className="font-medium text-xl">
                {borrow.book.title}
              </TableCell>
              <TableCell className="font-medium text-center">
                {borrow.book.isbn}
              </TableCell>
              <TableCell className="font-medium text-center">
                {borrow.totalQuantity}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {borrowSummary.length <= 0 && (
        <div className="mt-20">
          <p className="text-2xl font-bold text-center">
            No books have been borrowed yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default BorrowSummary;
