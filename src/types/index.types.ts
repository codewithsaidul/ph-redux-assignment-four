import type { Dispatch, SetStateAction } from "react";

export interface Book {
  _id: string;
  title: string;
  author: string;
  genre: "FICTION" | "NON_FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY" | "FANTASY";
  isbn: string;
  thumbnail: string;
  copies: number;
  description: string;
  available: boolean;
  createdAt: Date;
}

export interface BookProps {
  book: Book;
   handleModalOpen?: (bookId: string, title: string) => void;
}

export interface Borrow {
  _id: string;
  book: {
    title: string;
    isbn: string;
  };
  totalQuantity: number;
}

export interface BorrowModalProps {
  bookId: string | null;
  bookTitle: string | null;
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export interface PaginationPageProps {
  page: number;
  totalPages: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export interface APIErrorResponse {
  status: number;
  data: {
    message: string;
    success?: boolean;
    error?: {
      name?: string;
      errors?: {
        [key: string]: {
          message: string;
          [key: string]: unknown;
        };
      };
    };
  };
}
