"use client";
import BookCard from "@/components/shared/book-card";
import { handleRegisterSign } from "@/lib/utils";
import { getAllBooks } from "@/redux/api/books";
import { AppDispatch, RootState } from "@/redux/store";
import { BookType } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((store: RootState) => store.auth);
  const { books } = useSelector((store: RootState) => store.books);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth/register");
    }
  }, [user]);

  useEffect(() => {
    const getBooks = async () => {
      if (user) {
        try {
          const sign = handleRegisterSign({
            method: "GET",
            url: "/books",
            password: user.secret,
          });
          await dispatch(getAllBooks({ key: user.key, sign: sign }));
        } catch (error) {
          toast.error("Something went wrong");
        }
      }
    };
    getBooks();
  }, [router, dispatch]);

  return (
    <div className=" container">
      <Suspense fallback={"Loading..."}>
        {books?.length > 0 ? (
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 py-10">
            {books.map(
              (item: { book: BookType; status: number }, indx: number) => (
                <div key={indx} className=" w-full h-full">
                  <BookCard item={item.book} status={item.status} />
                </div>
              )
            )}
          </div>
        ) : (
          <div className=" w-full h-screen flex items-center justify-center flex-col gap-3">
            <h1 className=" text-2xl font-semibold">There is no any books!</h1>
            <span className=" text-sm">
              Please add the books from{" "}
              <Link className=" text-green-600" href={"/dashboard"}>
                Dashboard
              </Link>
            </span>
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default Home;
