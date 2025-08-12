"use client";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

type TextEditorProps = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  generatePending: boolean;
  finishTyping: boolean;
};

const TextEditor = ({
  value,
  setValue,
  generatePending,
  finishTyping,
}: TextEditorProps) => {
  console.log(value);
  return (
    <div
      className={cn(
        "w-full min-h-[50vh] h-full rounded-[12px] shadow-xl",
        generatePending && !finishTyping && "rainbow-wrapper"
      )}
    >
      <ReactQuill
        defaultValue={value}
        value={value}
        theme="snow"
        onChange={setValue}
        className={cn(
          "rounded-[12px] h-full text-black",
          "whitespace-pre-wrap bg-background"
        )}
      />
    </div>
  );
};

export default TextEditor;
