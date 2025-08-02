import { toast } from "sonner";
import { SonnerType } from "@/core/types/enums";
const sonner = (message: string, type: SonnerType) => {
  return toast(
    <div className="items-top flex gap-4">
      <div className="flex flex-col text-[14px]/[20px]">
        <p>{message}</p>
      </div>
    </div>,
    {
      style: {
        borderColor:
          type === SonnerType.ERROR
            ? "#F8A9A9"
            : type === SonnerType.SUCCESS
            ? "#09DE79"
            : "",
        borderRadius: "8px",
        color:
          type === SonnerType.ERROR
            ? "#D32F2F"
            : type === SonnerType.SUCCESS
            ? "#0A7142"
            : "",
        height: "64px",
      },
      duration: 4000,
      position: "top-center",
      closeButton: true,
      className: `text-red-100 ${
        type === SonnerType.ERROR
          ? "toaster-error"
          : type === SonnerType.SUCCESS
          ? "toaster-success"
          : ""
      }`,
    }
  );
};

export default sonner;
