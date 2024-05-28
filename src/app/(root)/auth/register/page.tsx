"use client";
import { registerUser } from "@/redux/api/register";
import { setCredentials } from "@/redux/slices/authSlice";
import { AppDispatch, RootState } from "@/redux/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const Register = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((store: RootState) => store.auth);
  const register = useSelector((store: RootState) => store.register);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (
        name.trim() !== "" &&
        email.trim() !== "" &&
        password.trim() &&
        username.trim() !== ""
      ) {
        const data = await dispatch(
          registerUser({ name, email, password, username })
        );

        if (data.payload !== undefined) {
          dispatch(setCredentials(data.payload.data));
        } else {
          toast.error("This user is exist");
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
        <h1 className=" w-full text-center text-2xl font-semibold">Sign Up</h1>
        <form onSubmit={handleSubmit} className=" flex flex-col">
          <div className=" flex flex-col gap-2">
            <label htmlFor="name">Name</label>
            <input
              className="px-5 py-2 border-2 focus:outline-none rounded-md border-green-600"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
          <div className=" flex flex-col gap-2 mt-3">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="px-5 py-2 border-2 focus:outline-none rounded-md border-green-600"
              type="text"
              name="email"
              placeholder="Enter your email"
            />
          </div>
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
            Do you have an account{" "}
            <Link href={"/auth/login"} className=" text-green-600">
              Sign In
            </Link>
            ?
          </span>
          <button
            type="submit"
            className=" w-full bg-green-600 p-2 rounded-md text-white"
          >
            {register.loading ? "Loading..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
