import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "/api/feedback";

// Async thunks
export const submitFeedback = createAsyncThunk(
  "feedback/submit",
  async (feedbackData) => {
    const response = await axios.post(API_URL, feedbackData);
    return response.data;
  }
);

export const fetchFeedback = createAsyncThunk(
  "feedback/fetch",
  async ({ page = 1, limit = 10, category, sortBy, sortOrder }) => {
    const params = new URLSearchParams({
      page,
      limit,
      ...(category && { category }),
      ...(sortBy && { sortBy }),
      ...(sortOrder && { sortOrder }),
    });
    const response = await axios.get(`${API_URL}?${params}`);
    return response.data;
  }
);

export const markAsReviewed = createAsyncThunk(
  "feedback/markReviewed",
  async (id) => {
    const response = await axios.patch(`${API_URL}/${id}/reviewed`);
    return response.data;
  }
);

export const deleteFeedback = createAsyncThunk(
  "feedback/delete",
  async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

const initialState = {
  items: [],
  currentPage: 1,
  totalPages: 1,
  total: 0,
  loading: false,
  error: null,
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Submit feedback
      .addCase(submitFeedback.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitFeedback.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(submitFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch feedback
      .addCase(fetchFeedback.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.feedback;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.total = action.payload.total;
      })
      .addCase(fetchFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Mark as reviewed
      .addCase(markAsReviewed.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // Delete feedback
      .addCase(deleteFeedback.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      });
  },
});

export const { clearError } = feedbackSlice.actions;
export default feedbackSlice.reducer;
