import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import themeType from "../../types/themetype";

const initialState: themeType = {
    background: "#1c1c1c",
    fontColor: "#F5F5F7",
    buttonbg: "blue",
    buttonfg: "green",
    playgroundcolor: "darkBlue",
    right: "pink",
    wrong: "red",
    normal: "black" 
};


const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<themeType>) => {
            state.background = action.payload.background;
            state.fontColor = action.payload.fontColor;
        }
    }
});

export default themeSlice.reducer;
export const {setTheme} = themeSlice.actions;