import type { Borrow } from "@/types/index.types";
import { baseAPI } from "../baseAPI/baseAPI";

export const borrowAPi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getBorrowSummary: builder.query({
      query: () => "/borrow",
      keepUnusedDataFor: 30,
      providesTags: (result) =>
        result
          ? [
              // প্রতিটি বইয়ের জন্য আলাদা ট্যাগ
              ...result.data.map((borrow: Borrow) => ({
                type: "Borrow" as const,
                id: borrow._id,
              })),
              // এবং পুরো তালিকার জন্য একটি সাধারণ ট্যাগ
              { type: "Borrow", id: "LIST" },
            ]
          : [{ type: "Borrow", id: "LIST" }], // ডেটা না থাকলেও LIST ট্যাগ থাকবে
    }),

    addBorrowBook: builder.mutation({
        query: (borrowData) => ({
            url: `/borrow`,
            method: "POST",
            body: borrowData
        }),
        invalidatesTags: [{ type: "Borrow", id: "LIST"}]
    })
  }),
});


export const { useGetBorrowSummaryQuery, useAddBorrowBookMutation } = borrowAPi