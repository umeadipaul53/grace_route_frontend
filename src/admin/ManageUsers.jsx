import { useState, useEffect } from "react";
import {
  Search,
  Edit,
  Trash2,
  Eye,
  UserPlus,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, deleteUser } from "../reducers/usersReducer";
import Swal from "sweetalert2";
import { useToast } from "../toastContext/useToast";

function ManageUsers() {
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const { users, pagination } = useSelector((state) => state.users);
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    dispatch(fetchAllUsers({ page }));
  }, [dispatch, page, reload]);

  const handleDeleteBTN = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    const confirmation = await Swal.fire({
      title: "Delete User",
      text: "Are you sure you want to delete this user?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Yes, Delete user",
      confirmButtonColor: "#228B22",
      cancelButtonColor: "#DC143C",
    });

    if (confirmation.isConfirmed) {
      try {
        const res = await dispatch(deleteUser(id)).unwrap();

        const message = res.message;

        showToast(message, "success");
        setReload((prev) => !prev); // 👈 trigger reload
      } catch (err) {
        showToast(err?.message || "Something went wrong", "error");
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col overflow-hidden">
      <div className="flex-1 px-4 sm:px-6 py-6 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold flex items-center gap-2 text-gray-800">
            <Users className="text-blue-600" /> Manage Members
          </h1>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full text-sm text-left border-collapse">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-3 whitespace-nowrap">S/N</th>
                <th className="px-6 py-3 whitespace-nowrap">Name</th>
                <th className="px-6 py-3 whitespace-nowrap">Email</th>
                <th className="px-6 py-3 whitespace-nowrap">Phone Number</th>
                <th className="px-6 py-3 whitespace-nowrap">Date registered</th>
                <th className="px-6 py-3 whitespace-nowrap">Status</th>
                <th className="px-6 py-3 text-center whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users?.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No Users found.
                  </td>
                </tr>
              ) : (
                users.map((member, i) => (
                  <tr
                    key={i}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-3">
                      {(pagination.currentPage - 1) * pagination.limit +
                        (i + 1)}
                    </td>
                    <td className="px-6 py-3">
                      {member.firstname} {member.lastname}
                    </td>
                    <td className="px-6 py-3">{member.email}</td>
                    <td className="px-6 py-3">{member.phone_number}</td>
                    <td className="px-6 py-3">
                      {member.createdAt.split("T")[0]}
                    </td>
                    <td className="px-6 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          member.verified
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {member.verified ? "Verified" : "Not verified"}
                      </span>
                    </td>
                    <td className="px-6 py-3 flex justify-center gap-2">
                      <button
                        className="p-1.5 hover:bg-red-100 text-red-600 rounded-md"
                        title="Delete"
                        onClick={(e) => handleDeleteBTN(e, member._id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center px-6 py-3 border-t text-sm text-gray-500">
            <p>
              Page {pagination?.currentPage} of {pagination?.totalPages}
            </p>
            <div className="flex items-center gap-2">
              <button
                className="p-1.5 border rounded-md hover:bg-gray-100"
                onClick={() => setPage((p) => p - 1)}
                disabled={!pagination?.hasPrevPage}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                className="p-1.5 border rounded-md hover:bg-gray-100"
                onClick={() => setPage((p) => p + 1)}
                disabled={!pagination?.hasNextPage}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* ✅ Mobile & Tablet Card Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:hidden">
          {users.length === 0 ? (
            <p className="text-center text-gray-500 py-6 col-span-full">
              No Users found.
            </p>
          ) : (
            users.map((member, i) => (
              <div
                key={i}
                className="bg-white p-3 rounded-lg shadow border flex flex-col justify-between h-auto"
              >
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <h2 className="font-semibold text-gray-800 text-sm">
                      {member.firstname} {member.lastname}
                    </h2>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        member.verified
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {member.verified ? "Verified" : "Not verified"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 truncate">
                    {member.email}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Phone Number: {member.phone_number}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Date of Registration: {member.createdAt.split("T")[0]}
                  </p>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    className="p-1 hover:bg-red-100 text-red-600 rounded-md"
                    title="Delete"
                    onClick={(e) => handleDeleteBTN(e, member._id)}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}

          {/* Pagination for Mobile */}
          <div className="flex justify-between items-center px-2 py-3 text-xs text-gray-500 col-span-full">
            <p>
              Page {pagination?.currentPage} of {pagination?.totalPages}
            </p>
            <div className="flex items-center gap-2">
              <button
                className="p-1 border rounded-md hover:bg-gray-100"
                onClick={() => setPage((p) => p - 1)}
                disabled={!pagination?.hasPrevPage}
              >
                <ChevronLeft size={14} />
              </button>
              <button
                className="p-1 border rounded-md hover:bg-gray-100"
                onClick={() => setPage((p) => p + 1)}
                disabled={!pagination?.hasNextPage}
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageUsers;
