import React, { useState } from "react";
import {
  Pencil,
  Trash2,
  Search,
  ChevronLeft,
  ChevronRight,
  Plus,
  Eye,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * Mobile-first responsive Property Listing with pagination and "List My Property" CTA.
 * - Small screens: stacked card rows (compact, readable)
 * - md+ screens: table-style grid with columns
 */

const allProperties = [
  {
    id: 1,
    title: "Home in Metric Way",
    address: "1421 San Pedro St, Los Angeles",
    price: "$2,500 /month",
    tag: "FOR RENT",
    status: "Published",
    date: "30 Dec, 2019",
    views: 2049,
    image: "https://via.placeholder.com/220x140",
  },
  {
    id: 2,
    title: "Garden Gingerbread House",
    address: "1421 San Pedro St, Los Angeles",
    price: "$1,250,000",
    tag: "FOR SALE",
    status: "Published",
    date: "30 Dec, 2019",
    views: 2049,
    image: "https://via.placeholder.com/220x140",
  },
  {
    id: 3,
    title: "Affordable Urban House",
    address: "1421 San Pedro St, Los Angeles",
    price: "$2,500 /month",
    tag: "FOR RENT",
    status: "Processing",
    date: "30 Dec, 2019",
    views: 2049,
    image: "https://via.placeholder.com/220x140",
  },
  {
    id: 4,
    title: "Downtown Condo Loft",
    address: "227 Hill St, Los Angeles",
    price: "$3,800 /month",
    tag: "FOR RENT",
    status: "Published",
    date: "02 Jan, 2020",
    views: 1803,
    image: "https://via.placeholder.com/220x140",
  },
  {
    id: 5,
    title: "Luxury Villa Estate",
    address: "Bay Area, San Francisco",
    price: "$3,500,000",
    tag: "FOR SALE",
    status: "Processing",
    date: "02 Jan, 2020",
    views: 1542,
    image: "https://via.placeholder.com/220x140",
  },
  {
    id: 6,
    title: "Suburban Cozy Cottage",
    address: "Sunset Blvd, California",
    price: "$2,800 /month",
    tag: "FOR RENT",
    status: "Published",
    date: "03 Jan, 2020",
    views: 1330,
    image: "https://via.placeholder.com/220x140",
  },
];

function ManageEstate() {
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 3;
  const totalPages = Math.ceil(allProperties.length / propertiesPerPage);
  const indexOfLast = currentPage * propertiesPerPage;
  const indexOfFirst = indexOfLast - propertiesPerPage;
  const currentProperties = allProperties.slice(indexOfFirst, indexOfLast);

  const navigate = useNavigate();

  const handlePageChange = (n) => {
    setCurrentPage(n);
    // scroll to top of list on page change for better mobile UX
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-green-950">
            My Properties{" "}
            <span className="text-gray-400 text-base">
              ({allProperties.length})
            </span>
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Manage your listings — tap a listing to view details.
          </p>
        </div>

        {/* Search + Sort (responsive) */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={16}
            />
            <input
              aria-label="Search listings"
              type="text"
              placeholder="Search listing"
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-600 focus:outline-none bg-white"
            />
          </div>

          <select
            aria-label="Sort listings"
            className="hidden sm:inline-block text-sm border border-gray-200 rounded-lg py-2 px-3 focus:ring-2 focus:ring-green-600 bg-white"
          >
            <option>Sort: Alphabet</option>
            <option>Date Published</option>
            <option>Status</option>
          </select>
        </div>
      </div>

      {/* Container */}
      <div className="bg-white shadow rounded-xl overflow-hidden border border-gray-100">
        {/* Table header for md+ */}
        <div className="hidden md:grid grid-cols-12 px-6 py-3 bg-gray-50 text-xs font-semibold text-gray-600 uppercase">
          <div className="col-span-5">Listing Title</div>
          <div className="col-span-2">Date Published</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1 text-center">Views</div>
          <div className="col-span-2 text-center">Action</div>
        </div>

        {/* Items: card style on mobile, table row on md+ */}
        {currentProperties.map((p) => (
          <article
            key={p.id}
            className="border-b border-gray-100 last:border-0"
            role="article"
          >
            {/* Mobile layout */}
            <div className="md:hidden flex gap-3 items-start p-4">
              <img
                src={p.image}
                alt={p.title}
                className="w-28 h-20 object-cover rounded-lg shrink-0 border border-gray-200"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                          p.tag === "FOR RENT"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-green-50 text-green-700"
                        }`}
                      >
                        {p.tag}
                      </span>
                      <h3 className="text-sm font-semibold text-gray-900 truncate">
                        {p.title}
                      </h3>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 truncate">
                      {p.address}
                    </p>
                    <p className="text-sm font-semibold text-green-900 mt-2">
                      {p.price}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3 gap-3">
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span>{p.date}</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="text-gray-600">{p.views} views</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      aria-label={`View ${p.title}`}
                      onClick={() => navigate(`/property-details/${p.id}`)}
                      className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-lg text-xs"
                    >
                      <Eye size={14} /> View
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        aria-label="Edit listing"
                        onClick={() => navigate(`/edit-property/${p.id}`)}
                        className="p-2 rounded-md bg-gray-50 hover:bg-green-50 text-green-700"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        aria-label="Delete listing"
                        onClick={() => console.log("delete", p.id)}
                        className="p-2 rounded-md bg-gray-50 hover:bg-red-50 text-red-700"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop/table row layout */}
            <div className="hidden md:grid grid-cols-12 items-center px-6 py-4 hover:bg-gray-50 transition">
              {/* Title (col-span-5) */}
              <div className="col-span-5 flex items-center gap-4">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-20 h-16 object-cover rounded-lg border border-gray-200"
                />
                <div>
                  <span
                    className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-md mb-1 ${
                      p.tag === "FOR RENT"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {p.tag}
                  </span>
                  <h3 className="font-semibold text-gray-800">{p.title}</h3>
                  <p className="text-xs text-gray-500">{p.address}</p>
                  <p className="text-sm font-semibold text-green-900">
                    {p.price}
                  </p>
                </div>
              </div>

              {/* Date */}
              <div className="col-span-2 text-sm text-gray-600">{p.date}</div>

              {/* Status */}
              <div className="col-span-2">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    p.status === "Published"
                      ? "bg-green-100 text-green-700"
                      : p.status === "Processing"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {p.status}
                </span>
              </div>

              {/* Views */}
              <div className="col-span-1 text-center text-sm text-gray-600">
                {p.views}
              </div>

              {/* Actions */}
              <div className="col-span-2 flex justify-center gap-3">
                <button
                  aria-label="Edit"
                  onClick={() => navigate(`/edit-property/${p.id}`)}
                  className="p-2 rounded-full bg-gray-50 hover:bg-green-50 text-green-700 transition"
                >
                  <Pencil size={16} />
                </button>
                <button
                  aria-label="Delete"
                  onClick={() => console.log("delete", p.id)}
                  className="p-2 rounded-full bg-gray-50 hover:bg-red-50 text-red-700 transition"
                >
                  <Trash2 size={16} />
                </button>
                <button
                  aria-label="View listing"
                  onClick={() => navigate(`/property-details/${p.id}`)}
                  className="p-2 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-700 transition"
                >
                  <Eye size={16} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination + summary */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-5">
        <p className="text-sm text-gray-600">
          Showing{" "}
          <span className="font-semibold text-gray-800">
            {indexOfFirst + 1}
          </span>{" "}
          -
          <span className="font-semibold text-gray-800">
            {" "}
            {Math.min(indexOfLast, allProperties.length)}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-800">
            {allProperties.length}
          </span>
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium ${
              currentPage === 1
                ? "text-gray-400 border-gray-200 cursor-not-allowed"
                : "text-green-700 border-green-600 hover:bg-green-50"
            }`}
          >
            <ChevronLeft size={16} /> Prev
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1.5 rounded-lg border text-sm font-medium ${
                  currentPage === i + 1
                    ? "bg-green-600 text-white border-green-600"
                    : "border-gray-300 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() =>
              handlePageChange(Math.min(currentPage + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium ${
              currentPage === totalPages
                ? "text-gray-400 border-gray-200 cursor-not-allowed"
                : "text-green-700 border-green-600 hover:bg-green-50"
            }`}
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* CTA */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => navigate("/list-property")}
          className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-5 py-3 rounded-2xl text-sm font-semibold shadow-md transition"
        >
          <Plus size={18} />
          List My Property
        </button>
      </div>
    </section>
  );
}

export default ManageEstate;
