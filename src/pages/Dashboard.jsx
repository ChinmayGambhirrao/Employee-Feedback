import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  fetchFeedback,
  markAsReviewed,
  deleteFeedback,
} from "../store/slices/feedbackSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const { items, currentPage, totalPages, loading } = useSelector(
    (state) => state.feedback
  );

  const [filters, setFilters] = useState({
    category: "",
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  useEffect(() => {
    loadFeedback();
  }, [currentPage, filters]);

  const loadFeedback = () => {
    dispatch(fetchFeedback({ page: currentPage, ...filters }));
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleMarkAsReviewed = async (id) => {
    try {
      await dispatch(markAsReviewed(id)).unwrap();
      toast.success("Feedback marked as reviewed");
    } catch (error) {
      toast.error("Failed to mark feedback as reviewed");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      try {
        await dispatch(deleteFeedback(id)).unwrap();
        toast.success("Feedback deleted successfully");
      } catch (error) {
        toast.error("Failed to delete feedback");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Feedback Dashboard
        </h2>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label htmlFor="category" className="label">
              Category
            </label>
            <select
              id="category"
              name="category"
              className="input"
              value={filters.category}
              onChange={handleFilterChange}
            >
              <option value="">All Categories</option>
              <option value="Work Environment">Work Environment</option>
              <option value="Leadership">Leadership</option>
              <option value="Growth">Growth</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div>
            <label htmlFor="sortBy" className="label">
              Sort By
            </label>
            <select
              id="sortBy"
              name="sortBy"
              className="input"
              value={filters.sortBy}
              onChange={handleFilterChange}
            >
              <option value="createdAt">Date</option>
              <option value="category">Category</option>
            </select>
          </div>
          <div>
            <label htmlFor="sortOrder" className="label">
              Sort Order
            </label>
            <select
              id="sortOrder"
              name="sortOrder"
              className="input"
              value={filters.sortOrder}
              onChange={handleFilterChange}
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>
        </div>

        {/* Feedback Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Feedback
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center">
                    Loading...
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center">
                    No feedback found
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item._id}>
                    <td className="px-6 py-4 whitespace-pre-wrap">
                      {item.text}
                    </td>
                    <td className="px-6 py-4">{item.category}</td>
                    <td className="px-6 py-4">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          item.isReviewed
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {item.isReviewed ? "Reviewed" : "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      {!item.isReviewed && (
                        <button
                          onClick={() => handleMarkAsReviewed(item._id)}
                          className="btn btn-secondary"
                        >
                          Mark Reviewed
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="btn btn-secondary"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setFilters({ ...filters, page })}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      currentPage === page
                        ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                        : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
