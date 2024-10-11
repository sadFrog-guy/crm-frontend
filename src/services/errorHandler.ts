import { BaseQueryApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

import { API_URL } from "./base";

// Универсальная функция для обработки ошибок
export const baseQueryWithErrorHandling = async (
  args: string | { url: string; method?: string; body?: any },
  api: BaseQueryApi,
  extraOptions: object,
) => {
  try {
    // Попытка выполнить запрос
    const result = await fetchBaseQuery({
      baseUrl: API_URL,
    })(args, api, extraOptions);

    // Проверка на успешный ответ
    if (result.error) {
      const { status, data } = result.error;

      // Специфическая обработка ошибок
      if (status === "FETCH_ERROR") {
        console.error("Network error:", data);

        return { error: { status, data: "Network error: Connection refused" } };
      }
      if (status === 500) {
        console.error("Server error:", data);

        return {
          error: { status, data: "Server error: Internal Server Error" },
        };
      }
    }

    return result;
  } catch (error) {
    console.error("Unexpected error:", error);

    return {
      error: { status: "FETCH_ERROR", data: "Unexpected network error" },
    };
  }
};
