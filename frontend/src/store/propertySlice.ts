import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Property {
  _id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

interface PropertyState {
  filterCategory: string;
  loading: boolean;
  formModal: boolean;
  propertyId: string;
  properties: Property[] | [];
  formMode: "create" | "edit";
}

const initialState: PropertyState = {
  properties: [],
  loading: false,
  formMode: "create",
  formModal: false,
  propertyId: "",
  filterCategory: "",
};

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    setFormMode: (state, action: PayloadAction<"create" | "edit">) => {
      state.formMode = action.payload;
    },
    setFormModal: (state, action: PayloadAction<boolean>) => {
      state.formModal = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setProperties: (state, action: PayloadAction<Property[]>) => {
      state.properties = action.payload;
    },
    setPropertyId: (state, action: PayloadAction<string>) => {
      state.propertyId = action.payload;
    },
    setFilterCategory: (state, action: PayloadAction<string>) => {
      state.filterCategory = action.payload;
    },
  },
});

export const {
  setFormMode,
  setFormModal,
  setLoading,
  setProperties,
  setPropertyId,
  setFilterCategory,
} = propertySlice.actions;

export default propertySlice.reducer;
