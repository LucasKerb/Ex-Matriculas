import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

const queryClient = new QueryClient();

const restClient = axios.create({
  baseURL: "http://localhost:5000/",
});

export { queryClient, restClient };
