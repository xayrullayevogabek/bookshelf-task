import { getBookStatus, handleRegisterSign } from "@/lib/utils";
import { deleteBook } from "@/redux/api/books";
import { AppDispatch, RootState } from "@/redux/store";
import { BookType } from "@/types";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import Modal from "./modal";

const AdminBookCard = ({
  item,
  handleReload,
}: {
  item: { book: BookType; status: number };
  handleReload: () => void;
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const { user } = useSelector((store: RootState) => store.auth);
  const dispatch: AppDispatch = useDispatch();

  const handleClick = async (type: string) => {
    if (!user) {
      return;
    }
    switch (type) {
      case "delete":
        const sign = handleRegisterSign({
          method: "DELETE",
          url: `/books/${item.book.id}`,
          password: user.secret,
        });
        const data = await dispatch(
          deleteBook({ id: item.book.id, key: user.key, sign })
        );
        if (data.type.includes("rejected")) {
          toast.error("Book is not deleted");
        } else {
          toast.success("Book is successfully deleted");
        }
        if (handleReload) {
          handleReload();
          console.log("hello");
        }
        break;
      case "edit":
        setOpen(true);
        break;
    }
  };

  return (
    <div className=" hover:scale-105 relative transition duration-500 shadow-lg p-5 rounded-md cursor-pointer">
      <div className=" absolute top-2 z-50 py-1 px-3 text-sm text-white rounded-sm bg-green-600 right-2">
        {getBookStatus(item.status)}
      </div>
      <div className=" relative w-full h-48 ">
        <Image
          className="object-cover object-top"
          src={item.book.cover}
          alt={item.book.title}
          fill
        />
      </div>
      <span className=" line-clamp-2 text-md text-green-600 font-semibold mt-2">
        {item.book.title}
      </span>
      <span className=" w-full flex items-center justify-between mt-3 text-sm font-semibold">
        Author: <span className=" font-medium">{item.book.author}</span>
      </span>
      <span className=" w-full flex items-center justify-between mt-2 text-sm font-semibold">
        Published: <span className=" font-medium">{item.book.published}</span>
      </span>
      <button
        onClick={() => handleClick("delete")}
        className=" flex gap-2 items-center justify-center w-full mt-4 hover:bg-red-500 transition duration-500 bg-red-600 py-2 rounded-sm text-white text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
        Delete the book
      </button>
      <button
        onClick={() => handleClick("edit")}
        className=" flex gap-4 items-center justify-center w-full mt-4 hover:bg-orange-200 transition duration-500 bg-orange-300 py-2 rounded-sm text-white text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>
        Edit the book
      </button>
      <Modal
        open={open}
        setOpen={setOpen}
        edit
        id={item.book.id}
        handleReload={handleReload}
      />
    </div>
  );
};

export default AdminBookCard;
