import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const genreEnum = z.enum([
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY",
]);

const formSchema = z.object({
  title: z.string().min(6, {
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
    .number({
      required_error: "Copies is required",
      invalid_type_error: "Copies must be a integer number",
    })
    .min(1, {
      message: "Minimum 1 copy is required",
    }),
  available: z.boolean().optional(),
});

export const AddNews = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      description: "",
      thumbnail: "",
      genre: "FICTION",
      isbn: "",
      copies: 1,
      available: true,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="w-full mt-60 mb-20 px-4">
      <div className="w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full md:w-[70%] lg:w-[50%] mx-auto bg-white shadow-[0_0_2px_rgba(0,0,0,0.25)] px-6 py-10 rounded-xl"
          >
            <h2 className="text-3xl text-book-primary font-bold text-center mb-10">
              Add New Book
            </h2>
            {/* book title */}
            <div>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl">Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Book Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* book author name */}
            <div>
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl">Author Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Author Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* book image */}
            <div>
              <FormField
                control={form.control}
                name="thumbnail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl">Thumbnail URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Thumbnail URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* book image */}
            <div>
              <FormField
                control={form.control}
                name="genre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl">Genre</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a Genre" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="FICTION">FICTION</SelectItem>
                        <SelectItem value="NON_FICTION">NON_FICTION</SelectItem>
                        <SelectItem value="SCIENCE">SCIENCE</SelectItem>
                        <SelectItem value="HISTORY">HISTORY</SelectItem>
                        <SelectItem value="BIOGRAPHY">BIOGRAPHY</SelectItem>
                        <SelectItem value="FANTASY">FANTASY</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* book isbn number */}
            <div>
              <FormField
                control={form.control}
                name="isbn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl">ISBN</FormLabel>
                    <FormControl>
                      <Input placeholder="ISBN" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* book copies */}
            <div>
              <FormField
                control={form.control}
                name="copies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl">Copies</FormLabel>
                    <FormControl>
                      <Input placeholder="Book Copies" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* book description */}
            <div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl">Book Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-60 resize-none"
                        placeholder="Book Description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="w-full py-6 cursor-pointer bg-book-primary text-xl duration-500 hover:bg-book-danger"
            >
              Add Book
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
