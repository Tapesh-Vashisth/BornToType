import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import userAuthApi from "../../middleware/apis/userAuthApi";
import { LoginCredentials, SignupCredentials } from "../../types/auth/authtypes";

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


const loginThunk = createAsyncThunk("fetch/loginThunk", async (credentials: LoginCredentials, thunkApi) => {
    try {
        const response = await userAuthApi.userSignInApi(credentials);
        const data = response.data;
        return thunkApi.fulfillWithValue(data)
    } catch (err: any) {
        return thunkApi.rejectWithValue(err);
    }
})


const signUpThunk = createAsyncThunk("fetch/signUpThunk", async (credentials: SignupCredentials,thunkApi) => {
    try {
        const response = await userAuthApi.userSignUpApi(credentials);
        const data = await response.data;
        return thunkApi.fulfillWithValue(data)
        
    } catch (err: any) {
        return thunkApi.rejectWithValue(err);
    }
})


const logoutThunk = createAsyncThunk("fetch/logoutThunk", async (_,thunkApi) => {
    try {
        const response = await userAuthApi.userSignOutApi()
        const data = await response.data;
        return thunkApi.fulfillWithValue(data)
    } catch (err: any) {
        return thunkApi.rejectWithValue(err);
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
        },
        checkIfLoggedIn:(state) => {
            const checkUsername = localStorage.getItem("username")
            const checkEmail = localStorage.getItem("email")
            if (!checkEmail || !checkUsername){
                return;
            }
            if (checkEmail && checkUsername){
                state.email = checkEmail;
                state.username = checkUsername;
                state.islogin = true;
            }
        }
    },
    extraReducers(builder) {
        builder.addCase(loginThunk.pending,(state)=>{
            state.loading = true;
        })
        builder.addCase(loginThunk.fulfilled,(state,action)=>{
            const incomingData = JSON.parse(JSON.stringify(action.payload))
            localStorage.setItem("username",incomingData.username)
            localStorage.setItem("email",incomingData.email)
            return {...state,username:incomingData.username,email:incomingData.email,islogin:true,loading:false}
        })
        builder.addCase(loginThunk.rejected,(state,action)=>{
            return {...state,error:action.error,loading:false}
        })
        builder.addCase(signUpThunk.pending,(state,action)=>{
            state.loading = true;
        })
        builder.addCase(signUpThunk.fulfilled,(state,action)=>{
            const incomingData = JSON.parse(JSON.stringify(action.payload))
            return {...state,loading:false}
        })
        builder.addCase(signUpThunk.rejected,(state,action)=>{
            return {...state,error:action.error,loading:false}
        })
    },
});


export default userSlice.reducer;
export const userActions = {
    actions:userSlice.actions,
    loginThunk:loginThunk,
    logoutThunk:logoutThunk,
    signUpThunk:signUpThunk
}