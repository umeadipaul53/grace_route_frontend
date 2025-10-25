import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Edit, Plus, CheckCircle } from "lucide-react";
import { useToast } from "../toastContext/useToast";
import Swal from "sweetalert2";
import {
  getAllProperties,
  approvePropertyListing,
} from "../reducers/propertyReducer";
import { useNavigate } from "react-router-dom";

function ListingOrders() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const [status, setStatus] = useState("pending");

  const { available, sold, pending } = useSelector((state) => state.property);

  const [reload, setReload] = useState(false);
  const [pageState, setPageState] = useState({
    available: 1,
    sold: 1,
    pending: 1,
  });

  // 👇 Choose the data list based on selected status
  const currentList =
    status === "available" ? available : status === "sold" ? sold : pending;

  useEffect(() => {
    dispatch(getAllProperties({ status, page: pageState[status] }));
  }, [dispatch, status, pageState]);

  const handleChange = (e) => setStatus(e.target.value);

  const handleApproveListing = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    const newStatus = "available";

    const confirmation = await Swal.fire({
      title: "Approve Property Listing",
      text: "Are you sure you want to approve this listing?",
      icon: "question", // 💡 adds a nice confirmation icon
      showCancelButton: true,
      confirmButtonText: "Yes, Proceed",
      confirmButtonColor: "#228B22",
      cancelButtonColor: "#DC143C",
    });

    if (!confirmation.isConfirmed) return; // 🚫 stop early if cancelled

    try {
      const res = await dispatch(
        approvePropertyListing({ status: newStatus, id })
      ).unwrap();

      showToast(res?.message || "Property approved successfully!", "success");

      // 💡 Optionally: Refresh data
      setReload((prev) => !prev);
    } catch (err) {
      console.error("❌ Approval failed:", err);
      showToast(
        err?.message || "Something went wrong during approval",
        "error"
      );
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-green-950">
            Listed Properties{" "}
            <span className="text-gray-400 text-base">
              ({currentList.items?.length || 0})
            </span>
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            View all listed properties
          </p>
        </div>

        {/* Search + Sort (responsive) */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            aria-label="Sort listings"
            className="text-sm border border-gray-200 rounded-lg py-2 px-3 focus:ring-2 focus:ring-green-600 bg-white"
            onChange={handleChange}
          >
            <option value="" disabled>
              Status
            </option>
            <option value="pending">Properties Pending Approval</option>
            <option value="available">Properties Listed</option>
            <option value="sold">Properties Sold</option>
          </select>
        </div>
      </div>

      {/* Container */}
      <div className="bg-white shadow rounded-xl overflow-hidden border border-gray-100">
        {/* Table header for md+ */}
        <div className="hidden md:grid grid-cols-12 px-6 py-3 bg-gray-50 text-xs font-semibold text-gray-600 uppercase">
          <div className="col-span-4">Property Details</div>
          <div className="col-span-2">Price</div>
          <div className="col-span-2">Listed By</div>
          <div className="col-span-2 text-center"> Phone</div>
          {status === "pending" ? (
            <div className="col-span-1 text-center">Action</div>
          ) : null}
        </div>
        {currentList.loading ? (
          <p className="text-center py-10">Loading Properties...</p>
        ) : currentList.items?.length === 0 ? (
          <p className="text-center py-10">No properties available</p>
        ) : (
          currentList.items?.map((p, i) => (
            <article
              key={i}
              className="border-b border-gray-100 last:border-0"
              role="article"
            >
              {/* Mobile layout */}
              <div className="md:hidden flex gap-3 items-start p-4">
                <img
                  src={p?.images?.[0]?.url}
                  alt={p?.images?.[0]?.public_id}
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
                          {p?.property_type}
                        </h3>
                      </div>
                      <p className="text-sm font-semibold text-gray-500 mt-1 truncate">
                        {p?.property_name}
                      </p>
                      <p className="text-sm font-semibold text-green-900 mt-2">
                        ₦{p?.price?.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 gap-3">
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>
                        {p?.userId?.firstname} {p?.userId?.lastname}
                      </span>
                      <span className="hidden sm:inline">•</span>
                      <span className="text-gray-600">
                        {p?.userId?.phone_number}
                      </span>
                      {status === "pending" ? (
                        <button
                          className="flex items-center gap-1.5 p-1.5 hover:bg-yellow-100 text-yellow-600 rounded-md transition-colors"
                          title="Approve Property Listing"
                          onClick={(e) => handleApproveListing(e, p?._id)}
                        >
                          <CheckCircle size={14} />
                          <span>Approve</span>
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
                    src={p?.images?.[0]?.url}
                    alt={p?.images?.[0]?.public_id}
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
                      {p?.property_name}
                    </h3>
                    <p className="text-xs text-gray-500">{p?.homeType}</p>
                    <p className="text-sm font-semibold text-green-900">
                      {p?.bedrooms}
                    </p>
                  </div>
                </div>

                {/* Date */}
                <div className="col-span-2 text-sm text-gray-600">
                  ₦{p?.price?.toLocaleString()}
                </div>

                {/* Status */}
                <div className="col-span-2 text-sm text-gray-600">
                  {p?.userId?.firstname} {p?.userId?.lastname}
                </div>

                {/* Views */}
                <div className="col-span-2 text-center text-sm text-gray-600">
                  {p?.userId?.phone_number}
                </div>

                {/* Actions */}

                <div className="col-span-1 flex justify-center gap-3">
                  {status === "pending" ? (
                    <button
                      className="flex items-center gap-1.5 p-1.5 hover:bg-yellow-100 text-yellow-600 rounded-md transition-colors"
                      title="Approve Property Listing"
                      onClick={(e) => handleApproveListing(e, p?._id)}
                    >
                      <CheckCircle size={14} />
                      <span>Approve</span>
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
        {currentList.pagination?.totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-6">
            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              onClick={() =>
                setPageState((prev) => ({
                  ...prev,
                  [status]: Math.max(prev[status] - 1, 1),
                }))
              }
              disabled={!currentList.pagination?.hasPrevPage}
            >
              Prev
            </button>

            <span className="text-sm font-medium">
              Page {currentList.pagination?.currentPage} of{" "}
              {currentList.pagination?.totalPages}
            </span>

            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              onClick={() =>
                setPageState((prev) => ({
                  ...prev,
                  [status]: prev[status] + 1,
                }))
              }
              disabled={!currentList.pagination?.hasNextPage}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => navigate("/admin/list-property")}
          className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-5 py-3 rounded-2xl text-sm font-semibold shadow-md transition"
        >
          <Plus size={18} />
          List a Property
        </button>
      </div>
    </section>
  );
}

export default ListingOrders;
