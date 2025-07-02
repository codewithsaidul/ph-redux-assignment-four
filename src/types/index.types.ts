export interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  thumbnail: string;
  copies: number;
  description: string;
  available: boolean;
  createdAt: Date;
}


export interface BookProps {
  book: Book
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
