import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { BorrowModalProps } from "@/types/index.types";
import BorrowForm from "../BorrowForm/BorrowForm";

const BorrowModal = ({ open, onOpenChange, bookId, bookTitle }: BorrowModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Borrow Book</DialogTitle>
          <DialogDescription>
            You are about to borrow the book with ID: <strong>{bookTitle}</strong>.
            <br></br>
            Please fill out the form below to complete the process.
          </DialogDescription>
        </DialogHeader>

        <BorrowForm bookId={bookId} onSuccess={() => { onOpenChange(false)}} />
      </DialogContent>
    </Dialog>
  );
};

export default BorrowModal;
