import { EditForm } from "@/components/EditForm/EditForm";
import { LoadingSkeleton } from "@/components/Loading/LoadingSkeleton";
import { useGetBookQuery } from "@/redux/feature/books/booksAPI";
import { useParams } from "react-router-dom";

const EditBook = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetBookQuery(id);

  if (isLoading) return <LoadingSkeleton />;

  const { data: book } = data 

  return <div>
    <EditForm book={book} />
  </div>;
};

export default EditBook;
