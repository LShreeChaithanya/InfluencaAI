import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPartnershipData = createAsyncThunk(
  'partnerships/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/partnerships');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const partnershipSlice = createSlice({
  name: 'partnerships',
  initialState: {
    loading: false,
    error: null,
    data: {
      potentialPartnerships: [],
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPartnershipData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPartnershipData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPartnershipData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default partnershipSlice.reducer;