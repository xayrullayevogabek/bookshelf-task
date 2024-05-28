import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

let CryptoJs = require("crypto-js");

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const setItem = (key: string, value: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const getItem = (key: string) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }
  return null;
};

export const removeItem = (key: string) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

export const handleRegisterSign = ({
  method,
  url,
  password,
  data,
}: {
  method: string;
  url: string;
  data?: any;
  password: string;
}) => {
  let signString;
  if (data) {
    signString = method + url + JSON.stringify(data) + password;
  } else {
    signString = method + url + password;
  }
  const sign = CryptoJs.MD5(signString).toString();
  return sign;
};

export const getBookStatus = (num: number) => {
  let status: string = "";
  switch (num) {
    case 0:
      status = "New";
      break;
    case 1:
      status = "Reading";
      break;
    case 2:
      status = "Finished";
      break;
  }

  return status;
};
