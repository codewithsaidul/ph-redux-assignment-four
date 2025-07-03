import { z } from "zod";

const genreEnum = z.enum([
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY",
]);

export const addFormSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 6 characters.",
  }),
  author: z.string().min(3, {
    message: "Author name must be at least 3 characters.",
  }),
  description: z.string().min(50, {
    message: "Description must be at least 50 characters.",
  }),
  thumbnail: z
    .string({
      required_error: "Thumbnail URL is required",
    })
    .min(1, { message: "Thumbnail URL is required" })
    .url({ message: "Provide a valid url" }),

  genre: genreEnum.refine((val) => !!val, {
    message: "Genre is required",
  }),
  isbn: z
    .string({
      required_error: "ISBN number is required",
    })
    .min(10, { message: "ISBN must be at least 10 characters." })
    .max(13, { message: "ISBN cannot be more than 13 characters." }),
  copies: z
    .coerce.number({
      required_error: "Copies is required",
      invalid_type_error: "Copies must be a number",
    })
    .min(1, { message: "Copies must be at least 1" }),

  available: z.boolean().optional(),
});





export const editFormSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 6 characters.",
  }),
  author: z.string().min(3, {
    message: "Author name must be at least 3 characters.",
  }),
  description: z.string().min(50, {
    message: "Description must be at least 50 characters.",
  }),
  thumbnail: z
    .string({
      required_error: "Thumbnail URL is required",
    })
    .min(1, { message: "Thumbnail URL is required" })
    .url({ message: "Provide a valid url" }),

  genre: genreEnum.refine((val) => !!val, {
    message: "Genre is required",
  }),
  isbn: z
    .string({
      required_error: "ISBN number is required",
    })
    .min(10, { message: "ISBN must be at least 10 characters." })
    .max(13, { message: "ISBN cannot be more than 13 characters." }),
  copies: z
    .coerce.number({
      required_error: "Copies is required",
      invalid_type_error: "Copies must be a number",
    })
    .min(0, { message: "Copies must be at least 0" }),

  available: z.boolean().optional(),
});