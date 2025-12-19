import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useStatus = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: status, isLoading: isStatusLoading } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["status", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users/status`);

      return data.status;
    },
  });
  return [status, isStatusLoading];
};

export default useStatus;
