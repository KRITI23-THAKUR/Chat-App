import { useCallback, useState } from "react";
import axiosInstance from "../lib/api/axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function useApi() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const request = useCallback(
    async ({ endPoint, method = "GET", body = null, redirectUrl = null }) => {
      setLoading(true);
      try {
        const response = await axiosInstance({
          url: endPoint,
          method: method,
          data: body,
        });
        // console.log(response)
        if (response.data.success) {
          if (redirectUrl) {
            navigate(redirectUrl, { replace: true });
          }

          return response.data;
        }
      } catch (error) {
        console.log(error);
        const message =
          error?.response?.data?.message ||
          error?.response?.data?.errors?.[0]?.message ||
          "Something went wrong";
        toast.error(message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { request, loading };
}
