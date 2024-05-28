import { handleRegisterSign } from "@/lib/utils";
import { createBook } from "@/redux/api/books";
import { AppDispatch, RootState } from "@/redux/store";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleReload: () => void;
}

const CreateForm = ({ setOpen, handleReload }: Props) => {
  const [isbn, setIsbn] = useState<string>("");

  const { user } = useSelector((store: RootState) => store.auth);
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (user) {
      try {
        const sign = handleRegisterSign({
          method: "POST",
          url: "/books",
          data: { isbn },
          password: user.secret,
        });

        if (isbn.trim() !== "") {
          const data: any = await dispatch(
            createBook({
              key: user.key,
              sign: sign,
              isbn: isbn,
            })
          );

          if (data.payload.data) {
            toast.success("Your book is successfully added");
            setIsbn("");
            setOpen(false);
            handleReload();
          } else {
            toast.error("This book is already exist");
          }
        } else {
          toast.error("Fill the blank");
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className=" w-full">
      <form onSubmit={handleSubmit}>
        <div className=" flex flex-col gap-2 ">
          <label htmlFor="isbn">ISBN</label>
          <input
            className=" focus:outline-none border-2 border-green-600 px-4 py-3 rounded-md"
            type="text"
            id="isbn"
            placeholder="Enter your ISBN..."
            onChange={(e) => setIsbn(e.target.value)}
            value={isbn}
          />
        </div>
        <button
          type="submit"
          className=" py-3 px-5 bg-green-600 rounded-md text-white mt-5"
        >
          Create Book
        </button>
      </form>
    </div>
  );
};

export default CreateForm;
