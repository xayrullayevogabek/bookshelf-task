import { handleRegisterSign } from "@/lib/utils";
import { patchBook } from "@/redux/api/books";
import { AppDispatch, RootState } from "@/redux/store";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleReload: () => void;
  id: number;
}

const EditForm = ({ setOpen, handleReload, id }: Props) => {
  const [status, setStatus] = useState<number>(0);

  const { user } = useSelector((store: RootState) => store.auth);
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!user) {
      return;
    }
    const sign = handleRegisterSign({
      method: "PATCH",
      url: `/books/${id}`,
      data: { status: status },
      password: user.secret,
    });

    const data = await dispatch(
      patchBook({
        id: id,
        key: user.key,
        status: status,
        sign: sign,
      })
    );

    if (data.type.includes("rejected")) {
      toast.error("Your book's status is not changed");
    } else {
      toast.success("Your book's status successfully changed");
      handleReload();
      setOpen(false);
    }
  };

  return (
    <div className=" w-full">
      <form onSubmit={handleSubmit}>
        <div className=" flex flex-col gap-2 ">
          <label htmlFor="isbn">Select Status</label>
          <Select
            value={status.toString()}
            onValueChange={(e) => setStatus(+e)}
          >
            <SelectTrigger className=" w-full">
              <SelectValue placeholder="Select the status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value="0">New</SelectItem>
                <SelectItem value="1">Reading</SelectItem>
                <SelectItem value="2">Finished</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <button
          type="submit"
          className=" py-3 px-5 bg-green-600 rounded-md text-white mt-5"
        >
          Change Status
        </button>
      </form>
    </div>
  );
};

export default EditForm;
