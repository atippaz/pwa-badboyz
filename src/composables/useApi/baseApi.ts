interface ApiGet {
  url: string;
  id?: string;
  query?: any;
}
interface ApiPost extends ApiGet {
  payload?: any;
}
export default function useApi() {
  const baseUrl = "https://bad-boy-service.vercel.app";
  const jwt = "";
  return {
    async get<T>({ url, id, query }: ApiGet) {
      try {
        const queryString = query != null ? new URLSearchParams(query) : null;
        const result = await fetch(
          `${baseUrl}/${url}${id == null ? "" : "/" + id}${
            queryString == null ? "" : "?" + queryString
          }`
        );
        return result.json() as T;
      } catch (ex) {
        throw ex;
      }
    },
    async post<T>({ url, payload, id, query }: ApiPost) {
      try {
        const queryString = query != null ? new URLSearchParams(query) : null;
        const result = await fetch(
          `${baseUrl}/${url}${id == null ? "" : "/" + id}${
            queryString == null ? "" : "?" + queryString
          }`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            ...(payload != null && { body: JSON.stringify(payload) }),
          }
        );
        return result.json() as T;
      } catch (ex) {
        throw ex;
      }
    },
  };
}
