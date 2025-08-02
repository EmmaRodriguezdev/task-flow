import CustomSelect from "@/components/ui/custom-select";
import { Input } from "@/components/ui/input";
import {
  TaskPriority,
  TaskStatus,
} from "@/modules/task/infrastructure/interfaces/task.interface";
import { useState } from "react";

const Filters = () => {
  const [query, setQuery] = useState("");
  return (
    <section className="w-full flex items-center justify-between">
      <Input
        placeholder="Buscar por titulo"
        type="text"
        onChange={(e) => setQuery(e.target.value)}
        className="w-[40vw]"
      />
      <div className="flex items-center gap-[10px]">
        <CustomSelect
          options={Object.values(TaskStatus).map((status) => {
            return {
              value: status,
              label: status,
            };
          })}
          placeholder="Estatus"
        />
        <CustomSelect
          options={Object.values(TaskPriority).map((status) => {
            return {
              value: status,
              label: status,
            };
          })}
          placeholder="Prioridad"
        />
      </div>
    </section>
  );
};

export default Filters;
