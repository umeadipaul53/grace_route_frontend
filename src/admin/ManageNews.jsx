import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNewsAdmin, deleteNews } from "../reducers/newsReducer";
import { Trash2, Plus } from "lucide-react";
import { useToast } from "../toastContext/useToast";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function ManageNews() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const {
    loading,
    pagination = {},
    items = [],
  } = useSelector((state) => state.news);
  const startIndex = (pagination?.currentPage - 1) * pagination?.limit + 1;
  const endIndex = Math.min(
    pagination?.currentPage * pagination?.limit,
    pagination?.totalResults
  );

  const [reload, setReload] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getNewsAdmin({ page }));
  }, [dispatch, reload, page]);

  const handleDeleteNews = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    const confirmation = await Swal.fire({
      title: "Delete News",
      text: "Are you sure you want to delete this news?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Yes, Proceed",
      confirmButtonColor: "#228B22",
      cancelButtonColor: "#DC143C",
    });

    if (confirmation.isConfirmed) {
      try {
        const res = await dispatch(deleteNews(id)).unwrap();

        const message = res.message;

        showToast(message, "success");
        setReload((prev) => !prev); // 👈 trigger reload
      } catch (err) {
        showToast(err?.message || "Something went wrong", "error");
      }
    }
  };

  const stripHtml = (html) => {
    const temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || "";
  };

  const getExcerpt = (html, length = 20) => {
    const text = stripHtml(html);
    if (text.length <= length) return text;
    const trimmed = text.slice(0, length);
    return trimmed.slice(0, trimmed.lastIndexOf(" ")) + "...";
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-green-950">
            News{" "}
            <span className="text-gray-400 text-base">({items?.length})</span>
          </h2>
          <p className="text-gray-500 text-sm mt-1">View all news</p>
        </div>
      </div>

      {/* Container */}
      <div className="bg-white shadow rounded-xl overflow-hidden border border-gray-100">
        {/* Table header for md+ */}
        <div className="hidden md:grid grid-cols-12 px-6 py-3 bg-gray-50 text-xs font-semibold text-gray-600 uppercase">
          <div className="col-span-2">News Image</div>
          <div className="col-span-3">title</div>
          <div className="col-span-6">Content</div>
          <div className="col-span-1 text-center">Action</div>
        </div>
        {loading ? (
          <p className="text-center py-10">Loading news...</p>
        ) : items?.length === 0 ? (
          <p className="text-center py-10">No news available</p>
        ) : (
          items?.map((p, i) => (
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
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded-md bg-green-50 text-blue-700
                          `}
                        >
                          {p.source}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between mt-3 gap-3">
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{p?.title}</span>
                      <span className="hidden sm:inline">•</span>
                      <span className="text-gray-600">
                        {getExcerpt(p?.content, 100)}
                      </span>
                    </div>
                  </div>
                  <div className=" flex justify-between mt-3 gap-3">
                    <button
                      className="p-1.5 hover:bg-yellow-100 text-yellow-600 rounded-md"
                      title="Delete News"
                      onClick={(e) => handleDeleteNews(e, p?._id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Desktop/table row layout */}
              <div className="hidden md:grid grid-cols-12 items-center px-6 py-4 hover:bg-gray-50 transition">
                {/* Title (col-span-5) */}
                <div className="col-span-2 flex items-center gap-4">
                  <img
                    src={p?.images?.[0]?.url}
                    alt={p?.images?.[0]?.public_id}
                    className="w-20 h-16 object-cover rounded-lg border border-gray-200"
                  />
                  <div>
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-md  bg-green-50 text-blue-700`}
                    >
                      {p.source}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <div className="col-span-3 text-sm text-gray-600">
                  {p?.title}
                </div>

                {/* Views */}
                <div className="col-span-6 text-sm text-gray-600">
                  {getExcerpt(p?.content, 200)}
                </div>

                {/* Actions */}

                <div className="col-span-1 flex justify-center gap-3">
                  <button
                    className="p-1.5 hover:bg-yellow-100 text-yellow-600 rounded-md"
                    title="Delete News"
                    onClick={(e) => handleDeleteNews(e, p?._id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
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
          onClick={() => navigate("/admin/create-news")}
          className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-5 py-3 rounded-2xl text-sm font-semibold shadow-md transition"
        >
          <Plus size={18} />
          Create a news
        </button>
      </div>
    </section>
  );
}

export default ManageNews;
