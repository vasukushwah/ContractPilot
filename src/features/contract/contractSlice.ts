import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ContractState {
  contractDraft: string;
}

const initialState: ContractState = {
  contractDraft: '',
};

const contractSlice = createSlice({
  name: 'contract',
  initialState,
  reducers: {
    updateContractDraft: (state, action: PayloadAction<string>) => {
      state.contractDraft = action.payload;
    },
  },
});

export const {
  updateContractDraft,
} = contractSlice.actions;

export default contractSlice.reducer;