"use client";
import { handleRegisterSign } from "@/lib/utils";
import { loginUser } from "@/redux/api/login";
import { setCredentials } from "@/redux/slices/authSlice";
import { AppDispatch, RootState } from "@/redux/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((store: RootState) => store.auth);
  const login = useSelector((store: RootState) => store.login);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (password.trim() !== "" && username.trim() !== "") {
        const sign = handleRegisterSign({
          method: "GET",
          url: "/myself",
          password,
        });

        const data = await dispatch(
          loginUser({
            password,
            username,
            Sign: sign,
          })
        );

        if (data.payload !== undefined) {
          dispatch(setCredentials(data.payload.data));
        } else {
          toast.error("Please check your username and password");
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  return (
    <div className=" absolute w-full h-screen bg-white top-0 left-0 flex items-center justify-center">
      <div className=" shadow-xl p-10 rounded-lg w-[40%] ">
        <h1 className=" w-full text-center text-2xl font-semibold">Sign In</h1>
        <form onSubmit={handleSubmit} className=" flex flex-col">
          <div className=" flex flex-col gap-2 mt-3">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              placeholder="Enter your username"
              className="px-5 py-2 border-2 focus:outline-none rounded-md border-green-600"
            />
          </div>
          <div className=" flex flex-col gap-2 mt-3">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Enter your password"
              className="px-5 py-2 border-2 focus:outline-none rounded-md border-green-600"
            />
          </div>
          <span className=" block w-full text-center mt-2 mb-2">
            You don't have an account{" "}
            <Link href={"/auth/register"} className=" text-green-600">
              Sign Up
            </Link>
            ?
          </span>
          <button
            type="submit"
            className=" w-full bg-green-600 p-2 rounded-md text-white"
          >
            {login.loading ? "Loading..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
