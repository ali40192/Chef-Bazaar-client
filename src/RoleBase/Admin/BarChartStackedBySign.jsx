import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
  Cell,
} from "recharts";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../Components/Common/Loader";

const DashboardBarChart = () => {
  const axiosSecure = useAxiosSecure();

  const { data: statistics = {}, isLoading } = useQuery({
    queryKey: ["dashboard-statistics"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/dashboard-statistics");
      return data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  const data = [
    { name: "Revenue", value: statistics.totalAmount },
    { name: "Users", value: statistics.totalUsers },
    { name: "Pending", value: statistics.pendingOrders },
    { name: "Delivered", value: statistics.deliveredOrders },
    { name: "Cancelled", value: statistics.cancelledOrders },
  ];

  const colors = ["#6366f1", "#22c55e", "#f59e0b", "#3b82f6", "#ef4444"];

  return (
    <div className="bg-base-100 rounded-2xl shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4 text-center">
        Dashboard Statistics
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={data}
          barCategoryGap="35%"
          margin={{ top: 30, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} />

          <YAxis tick={{ fontSize: 12 }} axisLine={false} />

          <Tooltip
            cursor={{ fill: "rgba(0,0,0,0.04)" }}
            contentStyle={{
              borderRadius: "10px",
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          />

          <Legend />

          <Bar dataKey="value" barSize={45} radius={[10, 10, 0, 0]}>
            <LabelList
              dataKey="value"
              position="top"
              style={{ fontSize: 12, fontWeight: 600 }}
            />
            {data.map((_, index) => (
              <Cell key={index} fill={colors[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardBarChart;
