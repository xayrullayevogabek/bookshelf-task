import React, { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CreateForm from "./create-form";
import EditForm from "./edit-form";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleReload: () => void;
  edit?: boolean;
  id?: number;
}

const Modal = ({ open, setOpen, handleReload, id, edit = false }: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{edit ? "Edit Books" : "Create Book"}</DialogTitle>
          <DialogDescription>
            {edit
              ? "Make changes to your book here. Click save when you're done."
              : "Create your book from here. Click save when you're done."}
          </DialogDescription>
        </DialogHeader>
        <div className="w-full py-4">
          {!edit ? (
            <CreateForm setOpen={setOpen} handleReload={handleReload} />
          ) : (
            <EditForm
              setOpen={setOpen}
              handleReload={handleReload}
              id={id as number}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
