import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getFeaturedListings } from '../../services/api';

export interface FeaturedProperty {
  id: number;
  type: string;
  image: string;
  price: string;
  description: string;
}

interface FeaturedPropertiesState {
  properties: FeaturedProperty[];
  loading: boolean;
  error: string | null;
}

const initialState: FeaturedPropertiesState = {
  properties: [],
  loading: false,
  error: null,
};

// Async thunk to fetch featured listings
export const fetchFeaturedProperties = createAsyncThunk(
  'featuredProperties/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getFeaturedListings();
      const data: FeaturedProperty[] = res.data.map((item: any) => ({
        id: item.id,
        type: item.type,
        image: item.image_urls?.[0] || 'https://via.placeholder.com/400',
        price: `OMR ${item.price}`,
        description: item.name || '',
      }));
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch featured properties');
    }
  }
);

const featuredPropertiesSlice = createSlice({
  name: 'featuredProperties',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeaturedProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedProperties.fulfilled, (state, action: PayloadAction<FeaturedProperty[]>) => {
        state.loading = false;
        state.properties = action.payload;
      })
      .addCase(fetchFeaturedProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default featuredPropertiesSlice.reducer;
