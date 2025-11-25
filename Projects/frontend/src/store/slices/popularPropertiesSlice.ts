import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getPopularListings } from '../../services/api';

export interface Property {
  id: number;
  type: string;
  priceLabel: string;
  description: string;
  imageUrl: string;
}

interface PopularPropertiesState {
  properties: Property[];
  loading: boolean;
  error: string | null;
}

const initialState: PopularPropertiesState = {
  properties: [],
  loading: false,
  error: null,
};

// Async thunk to fetch popular listings
export const fetchPopularProperties = createAsyncThunk(
  'popularProperties/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getPopularListings();
      const data: Property[] = res.data.map((item: any) => ({
        id: item.id,
        type: item.type,
        priceLabel: `OMR ${item.price}`,
        description: item.name,
        imageUrl: item.image_urls[0] || 'https://via.placeholder.com/400',
      }));
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch');
    }
  }
);

const popularPropertiesSlice = createSlice({
  name: 'popularProperties',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularProperties.fulfilled, (state, action: PayloadAction<Property[]>) => {
        state.loading = false;
        state.properties = action.payload;
      })
      .addCase(fetchPopularProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default popularPropertiesSlice.reducer;
