import { LoadingSkeleton } from "@/components/Loading/LoadingSkeleton";
import { Button } from "@/components/ui/button";
import { useGetBookQuery } from "@/redux/feature/books/booksAPI";
import { Link, useParams } from "react-router-dom";

const Bookdetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetBookQuery(id);

  if (isLoading) return <LoadingSkeleton />;

  const { data: book } = data;

  return (
    <div className="mt-44 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
      <div className="flex flex-col items-center mt-10">
        <h1 className="text-5xl font-bold text-book-primary mb-3">
          Book Details
        </h1>
        <p className="text-black font-medium space-x-2">
          <Link to="/" className="hover:text-book-danger">
            Home
          </Link>
          <span> | </span>
          <span className="text-book-primary">{book.title}</span>
        </p>
      </div>

      {/* book container */}
      <div className="mt-24 flex flex-col min-md:flex-row justify-between md:items-center">
        <div className="max-md:w-full max-[810px]:w-[35%] max-[900px]:w-[30%] min-[900px]:w-[25%] flex justify-center items-center mx-auto max-md:mb-20">
          <figure className="bg-[#f2f2f2] w-full max-w-[600px] shadow-[0_0_2px_rgba(0,0,0,0.25)] p-2 rounded-xl">
            <img
              src={book.thumbnail}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          </figure>
        </div>

        <div className="max-md:w-full max-[810px]:w-[62%] max-[900px]:w-[67%] min-[900px]:w-[72%] lg:mt-0">
          <div className="mb-5">
            <h2 className="text-2xl font-bold">{book.title}</h2>
            <p className="text-lg font-medium text-gray-400">
              Author:{" "}
              <span className="font-semibold text-book-primary ml-3">
                {book.author}
              </span>
            </p>
          </div>

          {/* book description and other info */}
          <div className="space-y-1">
            <p className="text-gray-500 mb-5 w-full max-w-[700px]">
              {book.description}
            </p>
            <p className="text-lg font-medium text-gray-500">
              Genre:{" "}
              <span className="ml-6 text-primary font-semibold">
                {book.genre}
              </span>
            </p>
            <p className="text-lg font-medium text-gray-500">
              Stock:{" "}
              <span className="ml-6 text-primary font-semibold">
                {book.copies}
              </span>
            </p>
            <p className="text-lg font-medium text-gray-500">
              ISBN:{" "}
              <span className="ml-6 text-primary font-semibold">
                {book.isbn}
              </span>
            </p>
            <p className="text-lg font-medium text-gray-500">
              Availity:{" "}
              <span className="ml-6 text-primary font-semibold">
                {book.available ? "Available" : "Unavailable"}
              </span>
            </p>
          </div>

          {/* book borrow btn */}
          <div className="mt-7 max-w-60">
            <Button
              disabled={!book.available}
              className="text-xl bg-book-primary duration-700 hover:bg-book-danger hover:duration-700 w-full"
            >
              {book.available ? "Borrow" : "Unavailable"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookdetails;
