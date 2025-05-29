import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { submitFeedback } from "../store/slices/feedbackSlice";
import { z, ZodError } from "zod";

// Client-side validation schema (matches backend)
const feedbackSchema = z.object({
  text: z.string().min(10, "Feedback must be at least 10 characters long"),
  category: z.enum(["Work Environment", "Leadership", "Growth", "Others"]),
  browserInfo: z.string(),
});

function FeedbackForm() {
  const [formData, setFormData] = useState({
    text: "",
    category: "Work Environment",
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Client-side validation
      const validatedData = feedbackSchema.parse({
        ...formData,
        browserInfo: navigator.userAgent, // Include browser info for validation
      });

      // Dispatch action if validation passes
      await dispatch(submitFeedback(validatedData)).unwrap();

      setFormData({ text: "", category: "Work Environment" });
      toast.success("Feedback submitted successfully!");
    } catch (error) {
      if (error instanceof ZodError) {
        // Display Zod validation errors
        toast.error(error.errors[0].message);
      } else {
        // Display other errors (e.g., network errors)
        toast.error(error.message || "Failed to submit feedback");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Submit Feedback
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="category" className="label">
              Category
            </label>
            <select
              id="category"
              name="category"
              required
              className="input"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Work Environment">Work Environment</option>
              <option value="Leadership">Leadership</option>
              <option value="Growth">Growth</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div>
            <label htmlFor="text" className="label">
              Feedback
            </label>
            <textarea
              id="text"
              name="text"
              required
              rows="6"
              className="input"
              value={formData.text}
              onChange={handleChange}
              placeholder="Enter your feedback here..."
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default FeedbackForm;
