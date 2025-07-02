import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"


const AllBooks = () => {
  return (
    <div className="mt-48 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
      <div className="flex justify-between items-center">
        <h2 className="text-book-primary text-5xl">All Books</h2>
        <Button size="lg" className="bg-book-primary duration-700 hover:bg-book-danger hover:duration-700 text-xl">
          <Link to="/create-book">Add Book</Link>
        </Button>
      </div>
    </div>
  )
}

export default AllBooks