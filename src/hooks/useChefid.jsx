import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useChefid = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: chefId, isLoading: isChefLoading } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["chefId", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users/chefId`);

      return data.chefId;
    },
  });
  return [chefId, isChefLoading];
};

export default useChefid;
