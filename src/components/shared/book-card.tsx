import { getBookStatus } from "@/lib/utils";
import { setBookToShelf } from "@/redux/slices/bookshelfSlice";
import { RootState } from "@/redux/store";
import { BookType } from "@/types";
import Image from "next/image";
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

const BookCard = ({
  item,
  status,
}: {
  item: BookType;
  status: number | null;
}) => {
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const dispatch = useDispatch();
  const books = useSelector((state: RootState) => state.bookshelf.books);

  const handleSaveBook = useCallback(() => {
    dispatch(setBookToShelf(item));
  }, [dispatch, item]);

  useEffect(() => {
    const isExistBook = books.some((book: BookType) => book.id === item.id);
    setIsSaved(isExistBook);
  }, [books, item.id]);

  return (
    <div className="hover:scale-105 relative transition duration-500 shadow-lg p-5 rounded-md cursor-pointer">
      {status !== null && (
        <div className="absolute top-2 z-40 py-1 px-3 text-sm text-white rounded-sm bg-green-600 right-2">
          {getBookStatus(status)}
        </div>
      )}

      <div className="relative w-full h-48 z-30">
        <Image
          className="object-cover object-top"
          src={item.cover}
          alt={item.title}
          layout="fill"
        />
      </div>
      <span className="line-clamp-1 text-md text-green-600 font-semibold mt-2">
        {item.title}
      </span>
      <span className="w-full line-clamp-1 flex items-center justify-between mt-3 text-sm font-semibold">
        Author: <span className="font-medium line-clamp-1">{item.author}</span>
      </span>
      <span className="w-full flex items-center justify-between mt-2 text-sm font-semibold">
        Published: <span className="font-medium">{item.published}</span>
      </span>

      <button
        onClick={handleSaveBook}
        className="flex items-center justify-center w-full mt-4 hover:bg-green-500 transition duration-500 bg-green-600 py-2 rounded-sm text-white text-sm"
      >
        {isSaved ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m3 3 1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 0 1 1.743-1.342 48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664 19.5 19.5"
            />
          </svg>
        ) : (
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
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
            />
          </svg>
        )}
        {isSaved ? "Remove from shelf" : "Save the book"}
      </button>
    </div>
  );
};

export default BookCard;
