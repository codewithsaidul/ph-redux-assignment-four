import { cn } from "@/lib/utils";
import { MenuIcon, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();


  return (
    <header className="bg-white shadow w-full px-4 sm:px-8 md:px-16 lg:px-20 fixed top-0 left-0 right-0">
      <nav className="flex justify-between items-center">
        <Link to="/">
          <img src="/LibraLite.png" alt="libralite logo" className="max-w-96 max-h-32" />
        </Link>

        {/* ============ nav link ================== */}
        <div
          className={cn(
            "rounded-xl flex items-center p-6 transition-transform duration-300 z-50",
            "max-md:fixed max-md:top-0 max-md:left-0 max-md:h-full max-md:w-[70%] max-md:flex-col max-md:gap-y-10",
            isOpen
              ? "max-md:translate-x-0 bg-white shadow-2xl "
              : "max-md:-translate-x-full",
            "md:static"
          )}
        >
          <ul className="flex flex-col md:flex-row md:items-center md:gap-x-10 gap-y-10 max-md:mt-20">
            <li className={cn("text-xl hover:text-book-primary duration-500 hover:duration-500", {
                "text-book-primary font-medium": pathname === "/books"
            })}>
              <Link to="/books">All Books</Link>
            </li>
            <li className={cn("text-xl hover:text-book-primary duration-500 hover:duration-500", {
                "text-book-primary font-medium": pathname === "/create-book"
            })}>
              <Link to="/create-book">Add Book</Link>
            </li>
            <li className={cn("text-xl hover:text-book-primary duration-500 hover:duration-500", {
                "text-book-primary font-medium": pathname === "/borrowSummary"
            })}>
              <Link to="/borrow-summary">Borrow Summary</Link>
            </li>
          </ul>
        </div>

        {/* ============= toggle btn ================= */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer transition-transform duration-700 ease-in-out min-md:hidden"
          style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
        >
          {isOpen ? <X size={32} /> : <MenuIcon size={32} />}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
