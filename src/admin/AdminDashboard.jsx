import {
  Users,
  Building2,
  ClipboardList,
  ShoppingCart,
  BarChart3,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import StatCard from "./StatCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../reducers/usersReducer";
import { getAllProperties } from "../reducers/propertyReducer";
import { getAllTourRequests } from "../reducers/messageReducer";
import { fetchAllBuyOrders } from "../reducers/ordersReducer";
import { getEstates } from "../reducers/estateReducer";

function AdminDashboard() {
  const dispatch = useDispatch();
  const { count } = useSelector((state) => state.users);
  const { available, sold, pending } = useSelector((state) => state.property);
  const {
    count: toursCount,
    items,
    pagination,
  } = useSelector((state) => state.message);
  const { items: estateCount } = useSelector((state) => state.estate);
  const { count: ordersCount } = useSelector((state) => state.orders);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchAllUsers({ page }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getEstates());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllProperties({ status: "available", page }));
    dispatch(getAllProperties({ status: "sold", page }));
    dispatch(getAllProperties({ status: "pending", page }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllTourRequests({ status: "pending", page }));
  }, [dispatch, page]);

  useEffect(() => {
    dispatch(fetchAllBuyOrders({ status: "pending", page }));
  }, [dispatch, page]);

  const totalProperties = available.count + sold.count + pending.count;

  const chartData = [
    { name: "Jan", sales: 80 },
    { name: "Feb", sales: 35 },
    { name: "Mar", sales: 50 },
    { name: "Apr", sales: 70 },
    { name: "May", sales: 45 },
    { name: "Jun", sales: 60 },
  ];

  return (
    <div className="p-4 md:p-6 space-y-8 bg-gray-50 min-h-screen overflow-x-hidden">
      {/* ======== Stats Overview ======== */}
      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Users}
          title="Total Users"
          value={count}
          color="border-green-500"
        />
        <StatCard
          icon={Building2}
          title="Approved Listed Properties"
          value={available.count}
          color="border-blue-500"
        />
        <StatCard
          icon={ClipboardList}
          title="Pending Tour Requests"
          value={toursCount}
          color="border-yellow-500"
        />
        <StatCard
          icon={ShoppingCart}
          title="Pending Buy Orders"
          value={ordersCount}
          color="border-purple-500"
        />
      </section>

      {/* ======== Chart & Summary ======== */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-md p-6 xl:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="text-green-700" size={20} />
            <h3 className="text-lg font-semibold text-green-900">
              Monthly Property Sales
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#166534" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between">
          <h3 className="text-lg font-semibold text-green-900 mb-4">
            Properties Summary
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Total Properties Listed</span>
              <span className="font-semibold text-green-700">
                {totalProperties?.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Total Properties Sold</span>
              <span className="font-semibold text-yellow-600">
                {sold?.count?.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Total Properties on Sale</span>
              <span className="font-semibold text-red-600">
                {available?.count?.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-gray-500">Total Estate Created</p>
            <span className="text-xl font-bold text-green-700">
              {estateCount.length}
            </span>
          </div>
        </div>
      </section>

      {/* ======== Orders Table / Cards ======== */}
      <section className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-green-900 mb-4">
          Pending Tour Request
        </h3>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100 text-gray-700 text-sm">
              <tr>
                <th className="p-3 text-left">S/N</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone Number</th>
                <th className="p-3 text-left">Property Name</th>
                <th className="p-3 text-left">Property Price </th>
                <th className="p-3 text-left">Time & Date (Scheduled)</th>
              </tr>
            </thead>
            <tbody>
              {items?.map((order, i) => (
                <tr
                  key={i}
                  className="border-b hover:bg-green-50 transition-colors"
                >
                  <td className="p-3 text-sm text-gray-700">
                    {(pagination.currentPage - 1) * pagination.limit + (i + 1)}
                  </td>
                  <td className="p-3 text-sm text-gray-700">{order.name}</td>
                  <td className="p-3 text-sm text-gray-700">{order.email}</td>
                  <td className="p-3 text-sm text-gray-700">{order.phone}</td>

                  <td className="p-3 text-sm text-gray-700">
                    {order.property_name}
                  </td>
                  <td className="p-3 text-sm text-gray-700">
                    ₦{order.price.toLocaleString()}
                  </td>
                  <td className="p-3 text-sm">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100">
                      <span className="text-red-600">{order.time}</span>{" "}
                      <span className="text-green-700">
                        {order.date.split("T")[0]}
                      </span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card Layout */}
        <div className="md:hidden space-y-4">
          {items?.map((order, i) => (
            <div key={i} className="border rounded-xl p-4 bg-gray-50 shadow-sm">
              <div className="flex justify-between mb-2">
                <span className="font-medium text-gray-700">{order.name}</span>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100">
                  <span className="text-red-600">{order.time}</span>{" "}
                  <span className="text-green-700">
                    {order.date.split("T")[0]}
                  </span>
                </span>
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Email:</span> {order.email}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Phone Number:</span>{" "}
                {order.phone}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Property:</span>{" "}
                {order.property_name}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Amount: ₦</span>{" "}
                {order.price.toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-6">
          <p className="text-sm text-gray-500">
            Page {pagination?.currentPage} of {pagination?.totalPages}
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => p - 1)}
              disabled={!pagination?.hasPrevPage}
              className={`px-3 py-1 rounded-md border text-sm font-medium transition ${
                pagination.currentPage === 1
                  ? "text-gray-400 border-gray-200 cursor-not-allowed bg-gray-50"
                  : "text-green-700 border-green-600 hover:bg-green-50"
              }`}
            >
              Previous
            </button>

            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={!pagination.hasNextPage}
              className={`px-3 py-1 rounded-md border text-sm font-medium transition ${
                pagination.currentPage === pagination.totalPages
                  ? "text-gray-400 border-gray-200 cursor-not-allowed bg-gray-50"
                  : "text-green-700 border-green-600 hover:bg-green-50"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdminDashboard;
