import type { Book } from "@/types/index.types";
import { baseAPI } from "../baseAPI/baseAPI";



export const booksAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    // ========= get all books ==========================
    getBooks: builder.query({
      query: () => "/books",
      transformResponse: (response) => response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }: never) => ({
                type: "Books" as const,
                id: _id,
              })),
            ]
          : [{ type: "Books", id: "LIST" }],
    }),

    addBook: builder.mutation({
      query: (bookData) => ({
        url: "/books",
        method: "POST",
        body: bookData,
      }),

      // ================= optimistic update ====================
      async onQueryStarted(bookData, { dispatch, queryFulfilled }) {
        // Generate temp ID for the optimistic item
        const tempId = `temp-${Math.random().toString(36).slice(2, 9)}`;

        const patchResult = dispatch(
          booksAPI.util.updateQueryData("getBooks", undefined, (draft: Book[]) => {
            draft.unshift({
              ...bookData,
              _id: tempId,
              createdAt: new Date(),
            });
          })
        );

        try {
          const { data: books } = await queryFulfilled;

          // Optional: Replace temp item with actual one (if _id was temporary)
          dispatch(
            booksAPI.util.updateQueryData("getBooks", undefined, (draft) => {
              const index = draft.findIndex(
                (book: Book) => book._id === tempId
              );
              if (index !== -1) {
                draft[index] = books; // Replace with actual data
              }
            })
          );
        } catch {
          patchResult.undo(); // rollback if failed
        }
      },
    }),
  }),
});

export const { useGetBooksQuery, useAddBookMutation } = booksAPI;
