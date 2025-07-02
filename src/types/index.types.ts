export interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  thumbnail: string;
  copies: number;
  description: string;
  createdAt: Date;
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
