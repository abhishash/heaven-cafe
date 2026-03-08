const API_ENDPOINT = process.env.API_ENDPOINT;
export type methods = "GET" | "POST" | "PUT" | "DELETE";

export type FetchHandlerProps<T> = {
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  data?: T;
  token?: string;
};
export const fetchHandler = async <T>({
  endpoint,
  method = "GET",
  data,
  token,
  revalidate = 60,
}: FetchHandlerProps<T> & { revalidate?: number }) => {

  const res = await fetch(`${API_ENDPOINT}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: data ? JSON.stringify(data) : undefined,
     // Next.js caching
     next: { revalidate }, // 🔥 cache for X seconds
    
  });

  if (!res.ok) {
    const error = await res.json();
    return error;
  }

  return res.json();
};
