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
        favorites: {},
        currentPage: 1,
        itemsPerPage: 10,
    },
    reducers: {
        toggleFavorite: (state, action) => {
            const camperId = action.payload;
            if (state.favorites[camperId]) {
                delete state.favorites[camperId];
            } else {
                state.favorites[camperId] = true;
            }
        },
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
export const selectFavorites = state => state.campers.favorites;
export const selectCurrentPage = state => state.campers.currentPage;
export const selectItemsPerPage = state => state.campers.itemsPerPage;
export const { toggleFavorite, incrementCurrentPage, resetCurrentPage } = campersSlice.actions;


export const selectFilteredCampers = createSelector([selectCampers, selectEquipment, selectLocation, selectType],
    (campers, equipment, location, types) => {
        return campers.filter(camper => {
            const hasEquipment = Object.entries(equipment).every(([key, value]) => {
                return camper[key] === value;
            });
            const matchesType = types.length > 0 ? types.includes(camper.form) : true;
            const matchesLocation = location ? camper.location === reverseLocation(location) : true;
            return hasEquipment && matchesType && matchesLocation;
        })
    });

export const campersReducer = campersSlice.reducer;