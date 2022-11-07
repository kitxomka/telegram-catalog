import { createSlice } from "@reduxjs/toolkit";


//todo: rename items
const initialState = {
    channelsList: [],
    categoryName: '',
    filterBy: '',
    status: 'pending',
    error: null,
};

export const channelSlice = createSlice({
    name: "channels",
    initialState,
    reducers: {
        getChannels: (state, action) => {
            state.channelsList = action.payload;
            console.log('state.channelsList', state.channelsList);
        },
        updateFilterBy: (state, action) => {
            state.filterBy = action.payload;
        },
        channalCategoryName: (state, action) => {
            state.categoryName = action.payload;
        }
    }
});


export const { getChannels, updateFilterBy, channalCategoryName } = channelSlice.actions;
export default channelSlice.reducer;