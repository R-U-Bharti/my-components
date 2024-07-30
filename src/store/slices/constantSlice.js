import { getStore, setStore } from "@/Utils/winStore";
import { createSlice } from "@reduxjs/toolkit";

export const dark = createSlice({
    name: 'dark',
    initialState: getStore("1", false) ?? true,
    reducers: {
        changeTheme(state, action) {
            setStore('1', action.payload)
            return action.payload;
        }
    }
})

export const token = createSlice({
    name: 'token',
    initialState: getStore('2', false) || '',
    reducers: {
        storeToken(state, action) {
            setStore('2', action.payload)
            return action.payload;
        }
    }
})

export const userDetails = createSlice({
    name: 'userData',
    initialState: getStore("3") || null,
    reducers: {
        userData(state, action) {
            setStore("3", action.payload)
            return action.payload;
        }
    }
})

export const { changeTheme } = dark.actions;
export const { storeToken } = token.actions;
export const { userData } = userDetails.actions;