import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../Components/Common/Loader";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useChefid from "../../hooks/useChefid";

const OrderRequests = () => {
  const [chefId, isChefLoading] = useChefid();
  const axiosSecure = useAxiosSecure();

  const { mutateAsync } = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/update-order-status/${id}`, {
        status,
      });
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
  });

  const { data: OrderRequests = [], refetch } = useQuery({
    queryKey: ["my-meal-order", chefId],
    queryFn: async () => {
      const res = await axiosSecure(`/my-meal-order/${chefId}`);
      return res.data;
    },
  });

  const handleAccept = async (id) => {
    await mutateAsync({ id, status: "accepted" });
    refetch();
  };

  const handleCanceled = async (id) => {
    await mutateAsync({ id, status: "cancelled" });
    refetch();
  };

  const handleDeliver = async (id) => {
    await mutateAsync({ id, status: "delivered" });
    refetch();
  };

  if (isChefLoading) return <Loader />;

  return (
    <div className="p-4 md:p-6">
      <div className="bg-base-100 rounded-2xl shadow-lg border border-base-300 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b">
          <h2 className="text-2xl font-bold text-primary">Order Requests</h2>
          <p className="text-sm text-gray-500">
            Manage incoming orders from customers
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200 sticky top-0 z-10 text-gray-700">
              <tr>
                <th>#</th>
                <th>Food</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Status</th>
                <th>User Email</th>
                <th>Order Time</th>
                <th>Address</th>
                <th>Payment</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {OrderRequests.map((order, index) => (
                <tr key={order._id} className="hover:bg-base-200">
                  <td>{index + 1}</td>

                  <td className="font-semibold text-primary">
                    {order.mealName}
                  </td>

                  <td>৳ {order.price}</td>
                  <td>{order.quantity}</td>

                  {/* Order Status */}
                  <td>
                    <span
                      className={`badge badge-outline px-3 py-2 font-semibold
                        ${order.orderStatus === "Pending" && "badge-warning"}
                        ${order.orderStatus === "accepted" && "badge-success"}
                        ${order.orderStatus === "delivered" && "badge-info"}
                        ${order.orderStatus === "cancelled" && "badge-error"}
                      `}
                    >
                      {order.orderStatus}
                    </span>
                  </td>

                  <td className="text-sm">{order.userEmail}</td>
                  <td className="text-sm">{order.orderTime}</td>

                  <td className="text-sm">
                    {order.UserAddress.district || "N/A"},{" "}
                    {order.UserAddress.region || "N/A"}
                  </td>

                  {/* Payment Status */}
                  <td>
                    <span
                      className={`badge px-3 py-1 font-semibold
                        ${
                          order.paymentStatus === "paid"
                            ? "badge-success"
                            : "badge-outline badge-info"
                        }
                      `}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>

                  {/* Actions */}
                  <td>
                    <div className="flex flex-wrap gap-2">
                      <button
                        disabled={order.orderStatus !== "Pending"}
                        onClick={() => handleAccept(order._id)}
                        className="btn btn-xs btn-outline btn-success"
                      >
                        Accept
                      </button>

                      <button
                        disabled={order.orderStatus !== "Pending"}
                        onClick={() => handleCanceled(order._id)}
                        className="btn btn-xs btn-outline btn-error"
                      >
                        Cancel
                      </button>

                      <button
                        disabled={order.orderStatus !== "accepted"}
                        onClick={() => handleDeliver(order._id)}
                        className="btn btn-xs btn-outline btn-info"
                      >
                        Deliver
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {OrderRequests.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              No order requests found 📦
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderRequests;
