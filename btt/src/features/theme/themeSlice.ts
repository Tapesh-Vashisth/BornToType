import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import themeType from "../../types/themetype";

const initialState: themeType = {
    theme: 0,
    fontSize: 20,
    fontfamily: "cursive"
};


const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<number>) => {
            state.theme = action.payload; 
        },
        setFontSize: (state, action: PayloadAction<number>) => {
            state.fontSize = action.payload; 
        },
        setFontFamily: (state, action: PayloadAction<string>) => {
            state.fontfamily = action.payload; 
        },
        setAllTheme: (state, action: PayloadAction<any>) => {
            state.theme = action.payload.theme;
            state.fontSize = action.payload.fontSize;
            state.fontfamily = action.payload.fontfamily;
        }
    }
});

export const {setTheme, setFontSize, setFontFamily, setAllTheme} = themeSlice.actions;
export default themeSlice.reducer;
