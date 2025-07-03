import type { Book } from "@/types/index.types";
import { baseAPI } from "../baseAPI/baseAPI";
import { current } from "immer";

export const booksAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    // ========= get all books ==========================
    getBooks: builder.query({
      query: ({ page, limit }) => `/books?page=${page}&limit=${limit}`,
      keepUnusedDataFor: 30,
      providesTags: (result) =>
        result
          ? [
              // প্রতিটি বইয়ের জন্য আলাদা ট্যাগ
              ...result.data.map((book: Book) => ({
                type: "Books" as const,
                id: book._id,
              })),
              // এবং পুরো তালিকার জন্য একটি সাধারণ ট্যাগ
              { type: "Books", id: "LIST" },
            ]
          : [{ type: "Books", id: "LIST" }], // ডেটা না থাকলেও LIST ট্যাগ থাকবে
    }),

    // get single book by id======================
    getBook: builder.query({
      query: (bookId) => `/books/${bookId}`,
      providesTags: (_result, _error, bookId) => [{ type: 'Books', id: bookId }]
    }),

    // ================= add new book ========================
    addBook: builder.mutation({
      query: ({ bookData }) => ({
        url: "/books",
        method: "POST",
        body: bookData,
      }),

      // ================= optimistic update ====================
      async onQueryStarted({ bookData, page, limit }, { dispatch }) {
        // Generate temp ID for the optimistic item
        const tempId = `temp-${Math.random().toString(36).slice(2, 9)}`;

        const patchResult = dispatch(
          booksAPI.util.updateQueryData(
            "getBooks",
            { page, limit },
            (draft) => {
              console.log("draft", current(draft));
              draft.data.unshift({
                ...bookData,
                _id: tempId,
                createdAt: new Date(),
              });
            }
          )
        );

        console.log("patch", patchResult);

        // try {
        //   const { data: books } = await queryFulfilled;

        //   // Optional: Replace temp item with actual one (if _id was temporary)
        //   dispatch(
        //     booksAPI.util.updateQueryData("getBooks", undefined, (draft) => {
        //       const index = draft.data.findIndex(
        //         (book: Book) => book._id === tempId
        //       );
        //       if (index !== -1) {
        //         draft[index] = books; // Replace with actual data
        //       }
        //     })
        //   );
        // } catch {
        //   patchResult.undo(); // rollback if failed
        // }
      },
    }),


    // ===== update book by id ===================
    updateBook: builder.mutation({
      query: ({bookId, bookData}) => ({
        url: `/books/${bookId}`,
        method: "PUT",
        body: bookData
      }),
      invalidatesTags: (_result, _error, { bookId }) => [{ type: 'Books', id: bookId }],
    }),

    // =========== delete a book by id ===================
    deleteBooks: builder.mutation({
      query: ({ bookId }) => ({
        url: `/books/${bookId}`,
        method: "DELETE",
      }),

      // optimistic update or reflecting instantly on ui
      async onQueryStarted(
        { bookId, page, limit },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          booksAPI.util.updateQueryData(
            "getBooks",
            { page, limit },
            (draft) => {
              const index = draft.data.findIndex(
                (book: Book) => book._id === bookId
              );
              if (index !== -1) {
                draft.data.splice(index, 1);
              }
            }
          )
        );

        console.log("optimistically.", patchResult);

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },

      // invalid tags for all pages
      invalidatesTags: [{ type: "Books", id: "LIST" }],
    }),
  }),
});

export const { useGetBooksQuery, useGetBookQuery, useAddBookMutation, useUpdateBookMutation, useDeleteBooksMutation } =
  booksAPI;
