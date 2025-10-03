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

        if (response.data.success) {
          if (redirectUrl) {
            navigate(redirectUrl, { replace: true });
          }
          toast.success(response.data.message);
          return response.data;
        }
      } catch (error) {
        console.log(error);
        toast.error(
          error?.response?.data?.message ||
            error?.response?.data?.errors[0]?.message
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { request, loading };
}
