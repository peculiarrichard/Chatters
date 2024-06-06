import { TextEditor } from "./TextEditor";

export const WriteDisplay = () => {
  return (
    <div>
      <h1 className="font-bold text-xl md:text-2xl text-[#1E5ED4] my-6">
        Write
      </h1>
      <TextEditor />
    </div>
  );
};
