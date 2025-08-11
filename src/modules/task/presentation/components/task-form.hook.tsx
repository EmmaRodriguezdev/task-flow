import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createTaskSchema, generateTaskSchema } from "./schemas";
import {
  TaskPriority,
  TaskStatus,
} from "../../infrastructure/interfaces/task.interface";

export type FormGenerateTaskType = z.infer<typeof generateTaskSchema>;
export type FormCreateTaskType = z.infer<typeof createTaskSchema>;

export function useGenerateTaskForm() {
  const [showCreateTaskDialog, setShowCreateTaskDialog] = useState(false);
  const [typedText, setTypedText] = useState("");
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [fullText, setFullText] = useState("");
  const [finishTyping, setFinishTyping] = useState(false);
  const [generatePending, setGeneratePending] = useState(false);

  const generateTaskForm = useForm<z.infer<typeof generateTaskSchema>>({
    resolver: zodResolver(generateTaskSchema),
    defaultValues: {
      context: "",
    },
  });

  useEffect(() => {
    if (!fullText) return;

    setGeneratePending(true);
    setFinishTyping(false);

    let index = 0;
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
    }

    typingIntervalRef.current = setInterval(() => {
      index += 10;
      setTypedText(fullText.slice(0, index));
      if (index >= fullText.length) {
        setFinishTyping(true);
        setGeneratePending(false);
        if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
      }
    }, 30);

    return () => {
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    };
  }, [fullText]);

  return {
    generateTaskForm,
    showCreateTaskDialog,
    setShowCreateTaskDialog,
    setFullText,
    setTypedText,
    typedText,
    reset: generateTaskForm.reset,
    typingIntervalRef,
    finishTyping,
    fullText,
    generatePending,
    setGeneratePending,
  };
}

export function useCreateTaskForm() {
  const [defaultTaskStatus, setDefaultTaskStatus] = useState<TaskStatus>();
  const createTaskForm = useForm<z.infer<typeof createTaskSchema>>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      status: TaskStatus.BACKLOG,
      workspaceId: 1,
      assignedTo: undefined,
      priority: TaskPriority.MEDIUM,
    },
  });

  useEffect(() => {
    createTaskForm.setValue("status", defaultTaskStatus || TaskStatus.BACKLOG);
  }, [defaultTaskStatus]);

  return { createTaskForm, setDefaultTaskStatus, defaultTaskStatus };
}

export default { useGenerateTaskForm, useCreateTaskForm };
