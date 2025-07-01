import { Link } from "react-router-dom"


const Footer = () => {
  return (
    <footer className="text-center flex justify-center items-center px-4 py-20">
        <div className="flex flex-col gap-y-7 border-t w-full pt-10">
            <div>
                <Link to="/">
                    <img src="/LibraLite.png" alt="libralight logo" className="w-32 h-32 mx-auto" />
                </Link>
            </div>

            <div>
                <ul className="flex justify-center items-center flex-wrap gap-x-12">
                    <li className="text-xl font-medium">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="text-xl font-medium">
                        <Link to="/books">Boos</Link>
                    </li>
                    <li className="text-xl font-medium">
                        <Link to="/addBook">Add Book</Link>
                    </li>
                    <li className="text-xl font-medium">
                        <Link to="/borrowSummary">Borrow Summary</Link>
                    </li>
                </ul>
            </div>

            <p className="text-sm mt-10">&copy; 2025 <span className="text-book-primary font-bold">LibraLite</span>. All rights reserved. Developed by <Link to="https://codewithsaidul.com" target="_blank" className="text-book-danger hover:text-book-primary">CodeWithSaidul</Link></p>
        </div>
    </footer>
  )
}

export default Footer