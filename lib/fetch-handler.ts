const API_ENDPOINT = process.env.API_ENDPOINT;

export type Methods = "GET" | "POST" | "PUT" | "DELETE";

export type FetchHandlerProps<T> = {
  endpoint: string;
  method?: Methods;
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
  try {
    const url = `${API_ENDPOINT}${endpoint}`;

    const res = await fetch(url, {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {}),
      },
      ...(data !== undefined && method !== "GET"
        ? {
            body: JSON.stringify(data),
          }
        : {}),
      next: {
        revalidate,
      },
    });

    // Response ko pehle text ke form mein read karo
    const responseText = await res.text();

    let responseData: any;

    try {
      responseData = responseText
        ? JSON.parse(responseText)
        : null;
    } catch {
      responseData = {
        message: responseText || "Unknown server error",
      };
    }

    if (!res.ok) {
      return {
        status: false,
        message:
          responseData?.message ||
          responseData?.error ||
          `Request failed with status ${res.status}`,
        data: responseData,
      };
    }

    return responseData;
  } catch (error) {
    console.error("FETCH ERROR:", error);

    return {
      success: false,
      status: 0,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
      data: null,
    };
  }
};