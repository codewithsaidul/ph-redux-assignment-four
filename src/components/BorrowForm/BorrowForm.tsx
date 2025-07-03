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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useAddBorrowBookMutation } from "@/redux/feature/borrow/borrowAPI";
import { isAPIValidationError } from "@/utils/isAPIError";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { z } from "zod";
import { Calendar } from "../ui/calendar";

const borrowFormSchema = z.object({
  quantity: z.coerce
    .number({
      invalid_type_error: "Expected a number, but you have entered text",
    })
    .min(1, {
      message: "Quantity must be at least 1.",
    }),
  dueDate: z.date({
    required_error: "A due date is required.",
  }),
});

interface BorrowFormProps {
  bookId: string | null;
  onSuccess: () => void;
}

const BorrowForm = ({ bookId, onSuccess }: BorrowFormProps) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const navigate = useNavigate();
  const [addBorrowBook] = useAddBorrowBookMutation();

  const form = useForm<z.infer<typeof borrowFormSchema>>({
    resolver: zodResolver(borrowFormSchema),
    defaultValues: {
      quantity: 1,
    },
  });


  // handle submit form
  const onSubmit = async (values: z.infer<typeof borrowFormSchema>) => {
    const borrowData = {
      ...values,
      book: bookId,
    };

    try {
      const res = await addBorrowBook(borrowData).unwrap();

      if (res.success && res.message === "Book borrowed successfully") {
        Swal.fire({
          title: "Successfully",
          text: res.message,
          icon: "success",
          timer: 3000,
        });

        // closing the modal
        onSuccess();
        // reseting the form
        form.reset();
        navigate("/borrow-summary");
      }
    } catch (error) {
      if (isAPIValidationError(error)) {
        if (error.data && error.data.error?.errors) {
          // closing the modal
          onSuccess();
          const message = error.data.error?.errors.copies.message;
          Swal.fire({
            title: "Failded to Borrow",
            text: message,
            icon: "warning",
            timer: 5000,
          });
        }
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input placeholder="Enter quantity" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Due Date</FormLabel>
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a due date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => {
                      field.onChange(date); // ফর্মের ডেট আপডেট করুন
                      setIsCalendarOpen(false); // পপওভারটি বন্ধ করুন
                    }}
                    disabled={(date: Date) =>
                      date < new Date() || date < new Date("1900-01-01")
                    }
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="text-xl bg-book-primary duration-700 hover:bg-book-danger hover:duration-700 cursor-pointer"
        >
          Confirm Borrow
        </Button>
      </form>
    </Form>
  );
};

export default BorrowForm;
