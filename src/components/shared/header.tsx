"use client";
import { logOut } from "@/redux/slices/authSlice";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { MdSpaceDashboard } from "react-icons/md";
import { GiBookshelf } from "react-icons/gi";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const [value, setValue] = useState<string>("");

  const { user } = useSelector((store: RootState) => store.auth);
  const { books } = useSelector((store: RootState) => store.bookshelf);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (value.trim() !== "") {
      router.push(`/search/${value}`);
    }
  };

  return (
    <div className=" w-full py-5 bg-green-600">
      <div className=" container flex items-center justify-between">
        <Link className=" flex-1 hidden sm:flex" href={"/"}>
          <h1 className=" text-xl font-semibold text-white">BookShelf</h1>
        </Link>

        <form
          onSubmit={handleSubmit}
          className=" flex items-center flex-1 justify-between px-5 rounded-md py-2 bg-white"
        >
          <input
            className=" w-full focus:outline-none"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search books..."
          />
          <button type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </form>
        <div className=" fixed z-50 sm:z-0 bottom-0 left-0 w-full p-2 justify-evenly bg-[#16A34A] md:relative md:p-0 flex md:flex-1 md:items-center md:justify-end gap-5">
          {user && (
            <Link
              className=" text-white flex flex-col text-sm items-center gap-1"
              href={"/dashboard"}
            >
              <MdSpaceDashboard size={20} />
              Dashboard
            </Link>
          )}
          <Link className=" relative" href={"/saved-books"}>
            {books.length > 0 && (
              <div className=" absolute w-5 h-5 rounded-full top-0 right-0 bg-red-600 text-white flex items-center justify-center text-xs">
                {books.length}
              </div>
            )}

            <button className=" flex items-center text-sm flex-col gap-1 text-white">
              <GiBookshelf size={20} />
              Bookshelf
            </button>
          </Link>
          {user ? (
            <button
              onClick={() => dispatch(logOut())}
              className="text-white hover:text-red-400 flex flex-col text-sm items-center gap-1"
            >
              <RiLogoutBoxLine size={20} />
              Logout
            </button>
          ) : (
            <Link href={"/auth/register"}>
              <button className=" text-white">Register</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
