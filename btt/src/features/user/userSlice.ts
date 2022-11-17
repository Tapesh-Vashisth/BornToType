import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import BASEURL from "../../middleware/baseurl";
import axios from "axios";

interface state{
    username: string
    email: string
    islogin: boolean
    status: "idle" | "succeeded" | "failed"
    loading: boolean
    error: any
}

const initialState: state = {
    username: "",
    email: "",
    islogin: false,
    status: "idle",
    loading: false,
    error: ""
}

const apiIn = BASEURL + "login";

interface credentialsin{
    email: string
    password: string
}

const fetchuser = createAsyncThunk("fetch/fetchuser", async (credentials: credentialsin, {rejectWithValue}) => {
    try {
        const response = await axios.post(apiIn);
        return response.data;
    } catch (err: any) {
        return rejectWithValue(err);
    }
})


interface credentialsup{
    username: string
    email: string
    password: string
}

const apiUp = BASEURL + "signup";

const fetchupuser = createAsyncThunk("fetch/fetchupuser", async (credentials: credentialsup, {rejectWithValue}) => {
    try {
        const response = await axios.post(apiUp);
        return response.data;
        
    } catch (err: any) {
        return rejectWithValue(err);
    }
})

const apiOut = BASEURL + "logout";

const fetchoutuser = createAsyncThunk("fetch/fetchoutuser", async (credentials: credentialsup, {rejectWithValue}) => {
    try {
        const response = await axios.get(apiOut);
        return response.data;
    } catch (err: any) {
        return rejectWithValue(err);
    }
})



const userSlice = createSlice({
    name: "user",
    initialState, 
    reducers: {
        setName: (state, action: PayloadAction <string>) => {
            state.username = action.payload;
        },
        setEmail: (state, action: PayloadAction <string>) => {
            state.email = action.payload;
        }
    }
});


export default userSlice.reducer;
export const {} = userSlice.actions;