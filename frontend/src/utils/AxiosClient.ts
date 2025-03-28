import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

const queryClient = new QueryClient();

const restClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export { queryClient, restClient };
