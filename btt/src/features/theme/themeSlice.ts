import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { ScriptTarget } from "typescript";
import themeType from "../../types/themetype";

const initialState: themeType = {
    background: "#1c1c1c",
    fontColor: "#F5F5F7",
    buttonbg: "blue",
    buttonfg: "green",
    playgroundcolor: "green",
    right: "pink",
    wrong: "red",
    normal: "black" 
};


const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<themeType>) => {
            state = action.payload; 
        }
    }
});

export const {setTheme} = themeSlice.actions;

export default themeSlice.reducer;
