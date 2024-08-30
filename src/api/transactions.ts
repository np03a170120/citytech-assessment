import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../providers/auth";
import { apiDetails } from "./api-details";
import axiosClient from "../utils/axios";

export const useTransctionList = () => {
  const auth = useAuth();
  return useMutation({
    mutationKey: [apiDetails.transactionList.key],
    mutationFn() {
      return axiosClient.post(
        apiDetails.transactionList.url,
        {},
        {
          headers: {
            Authorization: `Bearer ${auth?.user?.token}`,
          },
        }
      );
    },
    onSuccess: (data) => {},
    onError: (error) => {},
  });
};
