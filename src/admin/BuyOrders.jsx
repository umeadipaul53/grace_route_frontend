import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBuyOrders, settleBuyOrders } from "../reducers/ordersReducer";
import { Edit } from "lucide-react";
import { useToast } from "../toastContext/useToast";
import Swal from "sweetalert2";

function BuyOrders() {
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const {
    loading,
    pagination = {},
    orders = [],
  } = useSelector((state) => state.orders);
  const startIndex = (pagination?.currentPage - 1) * pagination?.limit + 1;
  const endIndex = Math.min(
    pagination?.currentPage * pagination?.limit,
    pagination?.totalResults
  );

  const [reload, setReload] = useState(false);
  const [status, setStatus] = useState("pending");
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchAllBuyOrders({ status, page }));
  }, [dispatch, page, status, reload]);

  const handleChange = (e) => setStatus(e.target.value);

  const handleSettleBuyOrder = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    const confirmation = await Swal.fire({
      title: "Approve Buy Order",
      text: "Note: All other buy orders for this property will be rejected. Are you sure you want to approve this order?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Yes, Process",
      confirmButtonColor: "#228B22",
      cancelButtonColor: "#DC143C",
    });

    if (confirmation.isConfirmed) {
      try {
        const res = await dispatch(settleBuyOrders(id)).unwrap();

        const message = res.message;

        showToast(message, "success");
        setReload((prev) => !prev); // 👈 trigger reload
      } catch (err) {
        showToast(err?.message || "Something went wrong", "error");
      }
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-green-950">
            Buy Orders{" "}
            <span className="text-gray-400 text-base">({orders?.length})</span>
          </h2>
          <p className="text-gray-500 text-sm mt-1">View all buy orders</p>
        </div>

        {/* Search + Sort (responsive) */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            aria-label="Sort listings"
            className=" text-sm border border-gray-200 rounded-lg py-2 px-3 focus:ring-2 focus:ring-green-600 bg-white"
            onChange={handleChange}
          >
            <option value="" disabled>
              Status
            </option>
            <option value="pending">Pending</option>
            <option value="settled">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Container */}
      <div className="bg-white shadow rounded-xl overflow-hidden border border-gray-100">
        {/* Table header for md+ */}
        <div className="hidden md:grid grid-cols-12 px-6 py-3 bg-gray-50 text-xs font-semibold text-gray-600 uppercase">
          <div className="col-span-4">Property Details</div>
          <div className="col-span-2">Price</div>
          <div className="col-span-2">Buyer's Name</div>
          <div className="col-span-2 text-center">Buyer's Phone</div>
          {status === "pending" ? (
            <div className="col-span-1 text-center">Action</div>
          ) : null}
        </div>
        {loading ? (
          <p className="text-center py-10">Loading orders...</p>
        ) : orders?.length === 0 ? (
          <p className="text-center py-10">No orders available</p>
        ) : (
          orders?.map((p, i) => (
            <article
              key={i}
              className="border-b border-gray-100 last:border-0"
              role="article"
            >
              {/* Mobile layout */}
              <div className="md:hidden flex gap-3 items-start p-4">
                <img
                  src={p?.property?.images?.[0]?.url}
                  alt={p?.property?.images?.[0]?.public_id}
                  className="w-28 h-20 object-cover rounded-lg shrink-0 border border-gray-200"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                            p?.status === "pending"
                              ? "bg-blue-50 text-green-700"
                              : "bg-green-50 text-blue-700"
                          }`}
                        >
                          {p?.status === "pending"
                            ? "in progress..."
                            : p?.status === "rejected"
                            ? "Rejected"
                            : "Approved"}
                        </span>
                        <h3 className="text-xs  text-gray-900 truncate">
                          {p?.property?.property_type}
                        </h3>
                      </div>
                      <p className="text-sm font-semibold text-gray-500 mt-1 truncate">
                        {p?.property?.property_name}
                      </p>
                      <p className="text-sm font-semibold text-green-900 mt-2">
                        ₦{p?.property?.price?.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 gap-3">
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>
                        {p?.buyer?.firstname} {p?.buyer?.lastname}
                      </span>
                      <span className="hidden sm:inline">•</span>
                      <span className="text-gray-600">
                        {p?.buyer?.phone_number}
                      </span>
                      {status === "pending" ? (
                        <button
                          className="p-1.5 hover:bg-yellow-100 text-yellow-600 rounded-md"
                          title="Approve Buy Order"
                          onClick={(e) => handleSettleBuyOrder(e, p?._id)}
                        >
                          <Edit size={16} />
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop/table row layout */}
              <div className="hidden md:grid grid-cols-12 items-center px-6 py-4 hover:bg-gray-50 transition">
                {/* Title (col-span-5) */}
                <div className="col-span-4 flex items-center gap-4">
                  <img
                    src={p?.property?.images?.[0]?.url}
                    alt={p?.property?.images?.[0]?.public_id}
                    className="w-20 h-16 object-cover rounded-lg border border-gray-200"
                  />
                  <div>
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                        p?.status === "pending"
                          ? "bg-blue-50 text-green-700"
                          : "bg-green-50 text-blue-700"
                      }`}
                    >
                      {p?.status === "pending"
                        ? "in progress..."
                        : p?.status === "rejected"
                        ? "Rejected"
                        : "Approved"}
                    </span>
                    <h3 className="font-semibold text-gray-800">
                      {p?.property?.property_name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {p?.property?.homeType}
                    </p>
                    <p className="text-sm font-semibold text-green-900">
                      {p?.property?.bedrooms}
                    </p>
                  </div>
                </div>

                {/* Date */}
                <div className="col-span-2 text-sm text-gray-600">
                  ₦{p?.property?.price?.toLocaleString()}
                </div>

                {/* Status */}
                <div className="col-span-2 text-sm text-gray-600">
                  {p?.buyer?.firstname} {p?.buyer?.lastname}
                </div>

                {/* Views */}
                <div className="col-span-2 text-center text-sm text-gray-600">
                  {p?.buyer?.phone_number}
                </div>

                {/* Actions */}

                <div className="col-span-1 flex justify-center gap-3">
                  {status === "pending" ? (
                    <button
                      className="p-1.5 hover:bg-yellow-100 text-yellow-600 rounded-md"
                      title="Approve Buy Order"
                      onClick={(e) => handleSettleBuyOrder(e, p?._id)}
                    >
                      <Edit size={16} />
                    </button>
                  ) : null}
                </div>
              </div>
            </article>
          ))
        )}

        {/* Items: card style on mobile, table row on md+ */}
      </div>

      {/* Pagination + summary */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-5">
        <p className="text-sm text-gray-600">
          Showing{" "}
          <span className="font-semibold text-gray-800">{startIndex}</span> -
          <span className="font-semibold text-gray-800"> {endIndex}</span> of{" "}
          <span className="font-semibold text-gray-800">
            {pagination?.totalResults}
          </span>
        </p>

        {pagination?.totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-6">
            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              onClick={() => setPage((p) => p - 1)}
              disabled={!pagination.hasPrevPage}
            >
              Prev
            </button>
            <span className="text-sm font-medium">
              Page {pagination?.currentPage} of {pagination?.totalPages}
            </span>
            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              onClick={() => setPage((p) => p + 1)}
              disabled={!pagination.hasNextPage}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* CTA */}
    </section>
  );
}

export default BuyOrders;
