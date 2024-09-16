import { createSelector, createSlice } from '@reduxjs/toolkit';
import { getCampers } from './camperOps';
import { selectEquipment, selectLocation, selectType } from './filterSlice';
import { reverseLocation } from '../utils/stringUtils';

const campersSlice = createSlice({
    name: 'campers',
    initialState: {
        items: [],
        isLoading: false,
        error: null,
        currentPage: 1,
        itemsPerPage: 10,
    },
    reducers: {
        incrementCurrentPage: (state) => {
            state.currentPage = ++state.currentPage;
        },
        resetCurrentPage: (state) => {
            state.currentPage = 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCampers.pending, handlePending)
            .addCase(getCampers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.items = action.payload.items;
            })
            .addCase(getCampers.rejected, handleRejected);
    },
});

const handlePending = (state) => {
    state.isLoading = true;
};

const handleRejected = (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
};

export const selectCampers = state => state.campers.items;
export const selectIsLoading = state => state.campers.isLoading;
export const selectError = state => state.campers.error;
export const selectCurrentPage = state => state.campers.currentPage;
export const selectItemsPerPage = state => state.campers.itemsPerPage;
export const { incrementCurrentPage, resetCurrentPage } = campersSlice.actions;


export const selectFilteredCampers = createSelector([selectCampers, selectEquipment, selectLocation, selectType],
    (campers, equipment, location, type) => {
        return campers.filter(camper => {
            const hasEquipment = Object.entries(equipment).every(([key, value]) => {
                return camper[key] === value;
            });
            const matchesType = type ? camper.form === type : true;
            const matchesLocation = location ? camper.location === reverseLocation(location) : true;
            return hasEquipment && matchesType && matchesLocation;
        })
    });

export const campersReducer = campersSlice.reducer;