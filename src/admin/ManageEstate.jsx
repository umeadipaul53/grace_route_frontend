import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Plus, Eye, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEstatesAdmin, deleteEstate } from "../reducers/estateReducer";
import { motion, AnimatePresence } from "framer-motion";
import DOMPurify from "dompurify";
import Swal from "sweetalert2";
import { useToast } from "../toastContext/useToast";

function ManageEstate() {
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const { pagination, items, loading } = useSelector((state) => state.estate);
  const [page, setPage] = useState(1);
  const [showImage, setShowImage] = useState(false);
  const [reload, setReload] = useState(false);

  const startIndex = (pagination?.currentPage - 1) * pagination?.limit + 1;
  const endIndex = Math.min(
    pagination?.currentPage * pagination?.limit,
    pagination?.totalResults
  );

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getEstatesAdmin({ page }));
  }, [dispatch, page, reload]);

  function truncateHTML(html, limit = 300) {
    const clean = DOMPurify.sanitize(html || "");
    if (!clean) return "";

    // parse sanitized HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(clean, "text/html");

    let cur = 0;
    const outParts = [];

    // walk node tree and append until limit reached
    function walk(node) {
      if (cur >= limit) return;

      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent || "";
        const remaining = limit - cur;
        if (text.length <= remaining) {
          outParts.push(text);
          cur += text.length;
        } else {
          outParts.push(text.slice(0, remaining));
          cur = limit;
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const tagName = node.tagName.toLowerCase();

        // Build start tag with attributes (keep safe: attributes come from sanitized HTML)
        const attrs = Array.from(node.attributes || [])
          .map((a) => ` ${a.name}="${a.value}"`)
          .join("");
        outParts.push(`<${tagName}${attrs}>`);

        // Recurse children
        for (let i = 0; i < node.childNodes.length && cur < limit; i++) {
          walk(node.childNodes[i]);
        }

        outParts.push(`</${tagName}>`);
      }
      // ignore comments, document nodes etc.
    }

    for (let i = 0; i < doc.body.childNodes.length && cur < limit; i++) {
      walk(doc.body.childNodes[i]);
    }

    let result = outParts.join("");
    if (cur >= limit) result = result + "...";

    // final sanitize to ensure nothing dangerous slipped through
    return DOMPurify.sanitize(result);
  }

  const handleDeleteEstate = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    const confirmation = await Swal.fire({
      title: "Delete Estate",
      text: "Are you sure you want to delete this estate?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Yes, Proceed",
      confirmButtonColor: "#228B22",
      cancelButtonColor: "#DC143C",
    });

    if (confirmation.isConfirmed) {
      try {
        const res = await dispatch(deleteEstate(id)).unwrap();

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
            Estates{" "}
            <span className="text-gray-400 text-base">({items?.length})</span>
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            View all available estates.
          </p>
        </div>
      </div>

      {/* Container */}
      <div className="bg-white shadow rounded-xl overflow-hidden border border-gray-100">
        {/* Table header for md+ */}
        <div className="hidden md:grid grid-cols-12 px-6 py-3 bg-gray-50 text-xs font-semibold text-gray-600 uppercase">
          <div className="col-span-3">Estate Name</div>
          <div className="col-span-3">Description</div>
          <div className="col-span-1">Price Per Plot</div>
          <div className="col-span-3 text-center">Documents</div>
          <div className="col-span-2 text-center">Action</div>
        </div>

        {/* Items: card style on mobile, table row on md+ */}
        {items?.map((p) => (
          <article
            key={p?._id}
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
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-md bg-green-50 text-green-700`}
                      >
                        {p?.plotSize}
                      </span>
                      <h3 className="text-sm font-semibold text-gray-900 truncate">
                        {p?.location.city} {p?.location.state}
                      </h3>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 truncate">
                      {p?.name}
                    </p>
                    <p className="text-sm font-semibold text-green-900 mt-2">
                      ₦{p?.pricePerPlot.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3 gap-3">
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span>{p?.createdAt}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      aria-label={`View ${p?.name}`}
                      onClick={() => setShowImage(true)}
                      className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-lg text-xs mt-2"
                    >
                      <Eye size={14} />
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        aria-label="Delete Estate"
                        onClick={(e) => handleDeleteEstate(e, p?._id)}
                        className="p-2 rounded-md bg-gray-50 hover:bg-red-50 text-red-700"
                      >
                        <Trash2 size={14} />
                      </button>
                      {/* Image Modal */}
                      <AnimatePresence>
                        {showImage && (
                          <motion.div
                            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <motion.div
                              className="relative max-w-3xl w-full mx-4"
                              initial={{ scale: 0.9 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0.9 }}
                            >
                              <img
                                src={p?.images?.[0]?.url}
                                alt={p?.images?.[0]?.public_id}
                                className="rounded-xl shadow-2xl w-full object-cover"
                              />
                              <button
                                onClick={() => setShowImage(false)}
                                className="absolute top-3 right-3 bg-white/90 hover:bg-white rounded-full p-1"
                              >
                                <X size={18} />
                              </button>
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop/table row layout */}
            <div className="hidden md:grid grid-cols-12 items-center px-6 py-4 hover:bg-gray-50 transition">
              {/* Title (col-span-5) */}
              <div className="col-span-3 flex items-center gap-4">
                <img
                  src={p?.images?.[0]?.url}
                  alt={p?.images?.[0]?.public_id}
                  className="w-20 h-16 object-cover rounded-lg border border-gray-200"
                />
                <div>
                  <span
                    className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-md mb-1 bg-green-100 text-green-700`}
                  >
                    {p?.plotSize}
                  </span>
                  <h3 className="font-semibold text-gray-800">{p?.name}</h3>
                  <p className="text-xs text-gray-500">
                    {p?.location?.city} {p?.location?.state}
                  </p>
                  <p className="text-sm font-semibold text-green-900">
                    {p?.createdAt}
                  </p>
                </div>
              </div>

              {/* Date */}
              <div
                className="col-span-3 text-sm text-gray-600"
                dangerouslySetInnerHTML={{
                  __html: truncateHTML(p?.description || "", 100),
                }}
              ></div>

              {/* Status */}
              <div className="col-span-1">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700`}
                >
                  ₦{p?.pricePerPlot.toLocaleString()}
                </span>
              </div>

              {/* Views */}
              <div className="col-span-3 text-center text-sm text-gray-600">
                {Array.isArray(p?.documents) && p?.documents.length > 0
                  ? p?.documents.join(", ")
                  : "No documents"}
              </div>

              {/* Actions */}
              <div className="col-span-2 flex justify-center gap-3">
                <button
                  aria-label={`View ${p?.name}`}
                  onClick={() => setShowImage(true)}
                  className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-lg text-xs mt-2"
                >
                  <Eye size={14} />
                </button>
                <button
                  aria-label="Delete"
                  onClick={(e) => handleDeleteEstate(e, p?._id)}
                  className="p-2 rounded-full bg-gray-50 hover:bg-red-50 text-red-700 transition"
                >
                  <Trash2 size={16} />
                </button>

                <AnimatePresence>
                  {showImage && (
                    <motion.div
                      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.div
                        className="relative max-w-4xl w-full mx-4 sm:mx-8 md:mx-16"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.9 }}
                      >
                        {/* Image */}
                        <img
                          src={p?.images?.[0]?.url}
                          alt={p?.images?.[0]?.public_id}
                          className="rounded-xl shadow-2xl w-full h-auto object-contain max-h-[85vh]"
                        />

                        {/* Close Button (visible on all devices) */}
                        <button
                          onClick={() => setShowImage(false)}
                          className="
            absolute -top-4 -right-4 md:top-4 md:right-4 
            bg-white text-gray-800 hover:bg-gray-100 
            rounded-full p-2 shadow-lg 
            transition-all duration-200 
            flex items-center justify-center
          "
                        >
                          <X size={22} />
                        </button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </article>
        ))}
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
      <div className="flex justify-center mt-6">
        <button
          onClick={() => navigate("/admin/create-estate")}
          className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-5 py-3 rounded-2xl text-sm font-semibold shadow-md transition"
        >
          <Plus size={18} />
          Create Estate
        </button>
      </div>
    </section>
  );
}

export default ManageEstate;
