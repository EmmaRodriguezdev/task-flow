import { FaPlus } from "react-icons/fa";

const CreatetaskSection = (props: { onClick: () => void }) => {
  const { onClick } = props;
  return (
    <section
      className="w-full px-[4px] py-[2px] cursor-pointer"
      onClick={onClick}
    >
      <span className="text-md flex items-center gap-2 justify-center text-gray-400">
        Create Task <FaPlus />
      </span>
    </section>
  );
};

export default CreatetaskSection;
