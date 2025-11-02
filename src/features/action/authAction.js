import { createAsyncThunk } from "@reduxjs/toolkit";

export const login= createAsyncThunk('Login', async (data, {rejectWithValue})=>{

         try {
        // console.log(data)
        const response = await fetch('https://coding-night-task-backend.vercel.app/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials:"include",

            body:JSON.stringify(data),
        }
        )
         if (!response.ok) {
              const errorData = await response.json(); 
              return rejectWithValue(errorData);
            }
        const result = await response.json()
        // console.log(result)

        return result
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const RegisterUser= createAsyncThunk('Register', async (data, {rejectWithValue})=>{

         try {
        // console.log(data)
        const response = await fetch('https://coding-night-task-backend.vercel.app/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
                        credentials: "include",
            body:JSON.stringify(data),
        }
        )
                 if (!response.ok) {
              const errorData = await response.json(); 
              return rejectWithValue(errorData);
            }
        const result = await response.json()
        // console.log(result)
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const forgotPassword = createAsyncThunk(
  "forgotPassword",
  async (data, { rejectWithValue }) => {
    try {
      // console.log(data);

      const response = await fetch("https://coding-night-task-backend.vercel.app/forgotpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
                    credentials: "include",
        body: JSON.stringify({
          email: data, // or data.email if you're passing an object
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        return rejectWithValue(result);
      }

      // console.log(result);
      return result;
    } catch (error) {
      return rejectWithValue({ message: error.message });
    }
  }
);

export const verifyOtp= createAsyncThunk('verifyOtp', async(data, {rejectWithValue})=>{
         try {
        // console.log(data)
        const response = await fetch('https://coding-night-task-backend.vercel.app/verifyotp', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
             credentials: "include",
            body:JSON.stringify(data),
        }
        )
                 if (!response.ok) {
              const errorData = await response.json(); 
              return rejectWithValue(errorData);
            }
        const result = await response.json()
        // console.log(result)
        return result
    } catch (error) {
        return rejectWithValue({message:error.message})
    }
})
export const reSetPassword= createAsyncThunk('reSetPassword', async(data, {rejectWithValue})=>{
         try {
        // console.log(data)
        const response = await fetch('https://coding-night-task-backend.vercel.app/resetpassword', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
                        credentials: "include",
            body:JSON.stringify({
                email:data.email,
                otp:data.otp,
                password:data.password
            }),
        }
        )
                 if (!response.ok) {
              const errorData = await response.json(); 
              return rejectWithValue(errorData);
            }
        const result = await response.json()
        // console.log(result)
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const logout= createAsyncThunk('logout', async(data, {rejectWithValue})=>{
         try {
        // console.log(data)
        const response = await fetch('https://coding-night-task-backend.vercel.app/logout', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
                        credentials: "include",

        }
        )
                 if (!response.ok) {
              const errorData = await response.json(); 
              return rejectWithValue(errorData);
            }
        const result = await response.json()
        // console.log(result)
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const checkUser= createAsyncThunk('checkUser', async(data, {rejectWithValue})=>{
         try {

        const response = await fetch('https://coding-night-task-backend.vercel.app/authMe', {
            method: "GET",
                        credentials: "include",

        }
        )
                 if (!response.ok) {
              const errorData = await response.json(); 
              return rejectWithValue(errorData);
            }
        const result = await response.json()
        // console.log(result)
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})

