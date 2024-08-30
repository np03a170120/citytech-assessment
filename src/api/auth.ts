import { useMutation } from "@tanstack/react-query";

import { IP_ADDRESS } from "../constants";

import axiosClient from "../utils/axios";

import { apiDetails } from "./api-details";
import { setStoredUser } from "../utils/localstorage";

export const useUserLogin = () => {
  return useMutation({
    mutationKey: [apiDetails.loginUser.key],
    mutationFn(values: Object) {
      return axiosClient.post(apiDetails.loginUser.url, {
        ...values,
        ip_address: IP_ADDRESS,
      });
    },
    onSuccess: (data) => {
      setStoredUser(
        data?.data?.data[0]?.jwt_token,
        data?.data?.data[0]?.full_name
      );
    },
  });
};
