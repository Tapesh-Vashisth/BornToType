import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";
import themeType from "../../types/themetype";
import themeApi from "../../middleware/apis/themeApi";

const initialState: themeType = {
    theme: 0,
    fontSize: 20,
    fontfamily: "cursive",
    error:null
};


const fetchTheme = createAsyncThunk("fetch/fetchTheme", async (user: {username: string},thunkApi) => {
    try {
        const response = await themeApi.fetchThemeApi(user);
        const data = await response.data;
        return thunkApi.fulfillWithValue(data)
    } catch (err: any) {
        return thunkApi.rejectWithValue(err);
    }
})

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
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTheme.fulfilled,(state,action)=>{
                const data = JSON.parse(JSON.stringify(action.payload));
                return {...state,fontfamily:data.fontfamily,theme:data.theme,fontSize:data.fontSize}
            })
            .addCase(fetchTheme.rejected,(state,action)=>{
                const error = action.payload as string
                return {...state, error:error}
            })
    }
});

export const themeThunks = {
    fetchThemeThunk:fetchTheme
}

export const {setTheme, setFontSize, setFontFamily, setAllTheme} = themeSlice.actions;
export default themeSlice.reducer;
