import { classesApi } from "@/api/classesApi";
import { useMutation } from "@tanstack/react-query";

export function useCreateClass() {
  return useMutation({
    mutationFn: classesApi.createClass,
  });
}
