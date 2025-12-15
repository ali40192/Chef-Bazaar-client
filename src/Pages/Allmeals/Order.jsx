import React, { useState, useEffect } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router";
import useAuth from "../../hooks/useAuth";
import { useForm, useWatch } from "react-hook-form";
import Loader from "../../Components/Common/Loader";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const Order = () => {
  const navigate = useNavigate();
  const { mutateAsync } = useMutation({
    mutationFn: async (orderdata) =>
      await axios.post("http://localhost:3000/orders", orderdata),
    onSuccess: (data) => {
      toast.success("seccusfully added", data);
      navigate("/dashboard/my-orders");
    },
  });

  const { id } = useParams();
  const [calculatedPrice, setCalculatedPrice] = useState(0);

  const { data: orderFood = {}, isLoading } = useQuery({
    queryKey: ["food", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/meals/${id}`);
      return res.data;
    },
  });

  const addresses = useLoaderData();

  const { user } = useAuth();

  const { register, handleSubmit, control, watch } = useForm();

  const quantity = useWatch({
    control,
    name: "quantity",
  });

  ///price calculation
  useEffect(() => {
    if (orderFood.price) {
      const newPrice = parseFloat(orderFood.price);
      const qty = parseInt(quantity) || 1;
      setCalculatedPrice((newPrice * qty).toFixed(2));
    }
  }, [quantity, orderFood.price]);

  const Allregions = addresses?.map((address) => address.region);
  const regions = [...new Set(Allregions)];
  const districsByRegion = (region) => {
    const districs = addresses.filter((address) => address.region === region);
    const singledistrics = districs.map((address) => address.district);
    return singledistrics;
  };

  const dynamicDistrict = useWatch({
    control,
    name: "region",
  });

  const onformSubmit = async (data) => {
    console.log(data);
  };

  const confirmOrder = () => {
    Swal.fire({
      title: `Your Total Price is ${calculatedPrice}`,
      text: "Are you sure you want to confirm this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm!",
    }).then((result) => {
      if (result.isConfirmed) {
        const foodId = id;
        const mealName = watch("mealName");
        const price = watch("price");
        const quantity = watch("quantity");
        const chefId = watch("chefId");
        const userEmail = watch("userEmail");
        const paymentStatus = "Pending";
        const orderStatus = "Pending";
        const region = watch("region");
        const district = watch("district");
        const UserAddress = { region, district };
        const orderTime = new Date().toLocaleString();

        const order = {
          foodId,
          mealName: mealName,
          price: Number(price),
          quantity: Number(quantity),
          chefId,
          chefName: orderFood.chefName,
          deliveryTime: Number(orderFood.estimatedDeliveryTime),
          paymentStatus,
          userEmail,
          UserAddress,
          orderStatus,

          orderTime,
        };
        Swal.fire({
          title: "Confirmed!",
          text: "Order Placed Successfully.",
          icon: "success",
        });
        mutateAsync(order);
      }
    });
  };

  if (isLoading) {
    return <Loader></Loader>;
  }
  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg p-8 rounded-xl mt-10">
      {/* Header */}
      <h1 className="text-3xl font-semibold text-center mb-6">
        Meal Order Form
      </h1>

      <form onSubmit={handleSubmit(onformSubmit)} className="space-y-6">
        {/* Meal Info */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Meal Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label className="block font-medium">Meal Name</label>
              <input
                {...register("mealName")}
                type="text"
                placeholder="Meal Name"
                className="input input-bordered w-full"
                defaultValue={orderFood.foodName}
              />
            </div>

            <div>
              <label className="block font-medium">Price</label>
              <input
                {...register("price")}
                type="number"
                placeholder="Price"
                className="input input-bordered w-full"
                defaultValue={orderFood.price}
                value={calculatedPrice || orderFood.price}
                readOnly
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label className="block font-medium">Quantity</label>
              <input
                {...register("quantity")}
                type="number"
                placeholder="Quantity"
                className="input input-bordered w-full"
                defaultValue={1}
              />
            </div>

            <div>
              <label className="block font-medium">Chef ID</label>
              <input
                {...register("chefId")}
                type="text"
                placeholder="Chef ID"
                className="input input-bordered w-full"
                defaultValue={orderFood.chefId}
              />
            </div>
          </div>
        </div>

        {/* User Info */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Customer Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label className="block font-medium">User Email</label>
              <input
                {...register("userEmail")}
                type="email"
                placeholder="Email Address"
                className="input input-bordered w-full"
                defaultValue={user?.email}
              />
            </div>
          </div>
          {/* user address */}
          <div class="flex items-center justify-between  mt-3">
            <label class="text-base font-medium text-gray-900">Address</label>
          </div>
          <div class="mt-2 mb-8">
            <select
              {...register("region")}
              defaultValue="Pick Your Region"
              className="select"
            >
              <option disabled={true}>Pick Your Region</option>
              {regions.map((region, index) => (
                <option key={index} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>

          <div class="mt-2 mb-8">
            <select
              {...register("district")}
              defaultValue="Pick Your District"
              className="select"
            >
              <option disabled={true}>Pick Your District</option>
              {districsByRegion(dynamicDistrict).map((district, index) => (
                <option key={index} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={confirmOrder}
            type="submit"
            className="btn btn-error text-white"
          >
            Confirm Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default Order;
