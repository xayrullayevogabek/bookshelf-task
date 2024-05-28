"use client";
import AdminBookCard from "@/components/shared/admin-book-card";
import Modal from "@/components/shared/modal";
import { handleRegisterSign } from "@/lib/utils";
import { getAllBooks } from "@/redux/api/books";
import { AppDispatch, RootState } from "@/redux/store";
import { BookType } from "@/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const Dashboard = () => {
  const [reload, setReload] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const dispatch: AppDispatch = useDispatch();
  const { books } = useSelector((store: RootState) => store.books);
  const { user } = useSelector((store: RootState) => store.auth);
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
  }, [reload, dispatch]);

  const handleReload = () => {
    setReload(!reload);
  };

  return (
    <div className=" container">
      <div className=" w-full flex flex-col py-5">
        <div className=" flex items-center justify-between">
          <h1 className=" text-xl sm:text-2xl font-semibold">Dashboard</h1>
          <button
            onClick={() => setOpen(true)}
            className=" bg-green-600 p-2 sm:px-5 sm:py-3 text-white rounded-md"
          >
            Create new Book
          </button>
          <Modal handleReload={handleReload} open={open} setOpen={setOpen} />
        </div>
        {books?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 py-10">
            {books.map((item: any, indx: number) => (
              <div key={indx} className=" w-full h-full">
                <AdminBookCard handleReload={handleReload} item={item} />
              </div>
            ))}
          </div>
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

export default Dashboard;
