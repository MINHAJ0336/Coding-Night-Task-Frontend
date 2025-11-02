import { createAsyncThunk } from "@reduxjs/toolkit";


export const getprofile = createAsyncThunk('getProfile', async (data, { rejectWithValue }) => {
    // const dispatch = useDispatch()
    try {
        const response = await fetch('http://localhost:5000/user/profile', {
          method:"Get",
            credentials: "include"
        });
        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }

        const result = await response.json()
        
        // console.log(result);
        return result

    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const createProduct = createAsyncThunk('createProduct', async (data, { rejectWithValue }) => {
    try {
        // console.log(data)
        const response = await fetch('http://localhost:5000/user/product', {
            method: "POST",

            body: data,
            credentials:"include"
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

export const updateProfile = createAsyncThunk('updateProfile', async (data, { rejectWithValue }) => {

    try {
        // console.log(data)
        const response = await fetch('http://localhost:5000/user/profile', {
            method: "POST",
            body: data,
            credentials:"include"
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

export const getMyProducts = createAsyncThunk('getMyProducts', async (data, { rejectWithValue }) => {
    // const dispatch = useDispatch()
    try {
        const response = await fetch('http://localhost:5000/user/myproducts', {
          method:"Get",
            credentials: "include"
        });
        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }

        const result = await response.json()
        
        // console.log(result);
        return result

    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const updateMyProduct = createAsyncThunk('updateMyProduct', async (data, { rejectWithValue }) => {

    try {
        // console.log(data)
        const response = await fetch(`http://localhost:5000/user/product/${data.id}`, {
            method: "Put",
            body: data.formData,
            credentials:"include"
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

export const getMyFavourite = createAsyncThunk('getMyFavourite', async (data, { rejectWithValue }) => {
    // const dispatch = useDispatch()
    try {
        const response = await fetch('http://localhost:5000/user/favourite', {
          method:"Get",
            credentials: "include"
        });
        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }

        const result = await response.json()
        
        // console.log(result);
        return result

    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const IsFavProduct = createAsyncThunk('favProduct', async (data, { rejectWithValue }) => {
    try {
        // console.log(data)
        const response = await fetch(`http://localhost:5000/user/favourite/${data}`, {
            method: "POST",
            credentials:"include"
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