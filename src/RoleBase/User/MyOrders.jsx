import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import Loader from "../../Components/Common/Loader";

const MyOrders = () => {
  const { user } = useAuth();
  const { mutateAsync } = useMutation({
    mutationFn: async (orderdata) =>
      await axios.post(
        "http://localhost:3000/create-checkout-session",
        orderdata
      ),
    onSuccess: (data) => {
      toast.success("seccusfully added", data);
      window.location.href = data.data.url;
    },
  });

  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/orders/${user?.email}`
      );

      return res.data;
    },
  });

  const handlePayment = (order) => {
    toast.info("Payment gateway coming soon");
    const orderData = {
      orderId: order._id,
      foodId: order.foodId,
      mealName: order.mealName,
      price: order.price,
      quantity: order.quantity,
      chefId: order.chefId,
      chefName: order.chefName,
      deliveryTime: order.deliveryTime,
      paymentStatus: order.paymentStatus,
      userEmail: order.userEmail,
      UserAddress: order.UserAddress,
      orderStatus: order.orderStatus,
      orderTime: new Date().toISOString(),
    };

    mutateAsync(orderData);
  };

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Food Name</th>
            <th>Order Status</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Delivary Time</th>
            <th>Chef Name</th>
            <th>Chef ID</th>
            <th>Payment</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {orders?.map((order) => (
            <tr key={order._id}>
              <th>{order.mealName}</th>
              <td>
                {order.orderStatus === "pending" ? (
                  <h1 className="text-yellow-500 font-bold">
                    {order.orderStatus}
                  </h1>
                ) : (
                  <h1 className="text-green-600 font-bold">
                    {order.orderStatus}
                  </h1>
                )}
              </td>
              <td>{order.price}</td>
              <th>{order.quantity}</th>
              <th>{order.deliveryTime}</th>
              <th>{order.chefName}</th>
              <th>{order.chefId}</th>
              <th>
                {order.paymentStatus === "Pending" ? (
                  <button
                    onClick={() => {
                      handlePayment(order);
                    }}
                    className="btn btn-secondary btn-sm"
                  >
                    Pay
                  </button>
                ) : (
                  <h1 className="text-green-600 font-bold">
                    {order.paymentStatus}
                  </h1>
                )}
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;
