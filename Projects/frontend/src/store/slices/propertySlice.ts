import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getProjectById, getPropertyById, getLandById } from '../../services/api';

export type PropertyType = 'property' | 'project' | 'land';

export interface PropertyDetailsData {
  id: number;
  name: string;
  image_urls: string[];
  price: string;
  city: string;
  neighborhood: string;
  details: string;
  sq_ft_or_area: string;
  view_count: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
}

interface PropertyState {
  property: PropertyDetailsData | null;
  loading: boolean;
  error: string | null;
}

const initialState: PropertyState = {
  property: null,
  loading: false,
  error: null,
};

// Async thunk to fetch property by type & id
export const fetchPropertyById = createAsyncThunk<
  PropertyDetailsData,
  { id: number; type: PropertyType }
>('property/fetchById', async ({ id, type }, thunkAPI) => {
  try {
    let res;
    switch (type) {
      case 'project':
        res = await getProjectById(id);
        break;
      case 'property':
        res = await getPropertyById(id);
        break;
      case 'land':
        res = await getLandById(id);
        break;
      default:
        throw new Error('Unknown type');
    }
    return res.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {
    clearProperty: (state) => {
      state.property = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPropertyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPropertyById.fulfilled, (state, action: PayloadAction<PropertyDetailsData>) => {
        state.loading = false;
        state.property = action.payload;
      })
      .addCase(fetchPropertyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearProperty } = propertySlice.actions;
export default propertySlice.reducer;
