"use client";
import BookCard from "@/components/shared/book-card";
import { handleRegisterSign } from "@/lib/utils";
import { getSearchedBooks } from "@/redux/api/books";
import { AppDispatch, RootState } from "@/redux/store";
import { BookType } from "@/types";
import { useParams, useRouter } from "next/navigation";
import { ColorRing } from "react-loader-spinner";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const SearchPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [books, setBooks] = useState<BookType[]>([]);

  const params = useParams();
  const { user } = useSelector((store: RootState) => store.auth);
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const getBooks = async () => {
      if (user) {
        try {
          const sign = handleRegisterSign({
            method: "GET",
            url: `/books/` + decodeURI(params.query.toString()),
            password: user.secret,
          });

          const { payload }: any = await dispatch(
            getSearchedBooks({
              search: params.query.toString(),
              key: user.key,
              sign,
            })
          );
          setBooks(payload.data.data);
          setLoading(false);
        } catch (error) {
          toast.error("Something went wrong");
        }
      }
    };
    getBooks();
  }, [params.query]);

  return (
    <div className=" container">
      {loading ? (
        <div className=" w-full h-screen flex items-center justify-center">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperClass="color-ring-wrapper"
            colors={["#16A34A", "#16A34A", "#16A34A", "#16A34A", "#16A34A"]}
          />
        </div>
      ) : (
        <div>
          {books?.length > 0 ? (
            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 py-10">
              {books.map((item, indx) => (
                <div key={indx} className=" w-full h-full">
                  <BookCard item={item} status={0} />
                </div>
              ))}
            </div>
          ) : (
            <div className=" w-full h-screen flex items-center justify-center flex-col gap-3">
              <h1 className=" text-2xl font-semibold">
                There is no any books!
              </h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
