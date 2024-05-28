"use client";
import BookCard from "@/components/shared/book-card";
import { RootState } from "@/redux/store";
import { BookType } from "@/types";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import {  useSelector } from "react-redux";

const Saved = () => {
  const { books } = useSelector((store: RootState) => store.bookshelf);
  const { user } = useSelector((store: RootState) => store.auth);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth/register");
    }
  }, [user]);

  return (
    <div className=" container">
      <div className=" w-full flex flex-col py-5">
        {books?.length > 0 ? (
          <>
            <div className=" flex items-center justify-between">
              <h1 className=" text-2xl font-semibold">Saved Books</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 py-10">
              {books.map((item: BookType, indx: number) => (
                <div key={indx} className=" w-full h-full">
                  <BookCard item={item} status={null} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className=" w-full h-screen flex items-center justify-center flex-col gap-3">
            <h1 className=" text-2xl font-semibold">There is no any books!</h1>
            <span className=" text-sm">Please first add the books</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Saved;
