// redux/reducers/portfolioSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PortfolioSelection {
  sourcePortfolioImageId: string;
  assetUrl: string;
  title?: string;
  category?: string;
  isUploaded: boolean;
}

export interface PortfolioState {
  selections: PortfolioSelection[];
}

const initialState: PortfolioState = {
  selections: [],
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    setSelections: (state, action: PayloadAction<PortfolioSelection[]>) => {
      state.selections = action.payload;
    },

    addSelection: (state, action: PayloadAction<PortfolioSelection>) => {
      state.selections.push(action.payload);
    },

    removeSelection: (state, action: PayloadAction<string>) => {
      state.selections = state.selections.filter(
        item => item.sourcePortfolioImageId !== action.payload
      );
    },

    updateSelection: (
      state,
      action: PayloadAction<{
        sourcePortfolioImageId: string;
        data: Partial<PortfolioSelection>;
      }>
    ) => {
      const item = state.selections.find(
        s => s.sourcePortfolioImageId === action.payload.sourcePortfolioImageId
      );

      if (item) {
        Object.assign(item, action.payload.data);
      }
    },

    resetPortfolio: () => initialState,
  },
});

export const {
  setSelections,
  addSelection,
  removeSelection,
  updateSelection,
  resetPortfolio,
} = portfolioSlice.actions;

export default portfolioSlice.reducer;