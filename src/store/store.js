import { configureStore } from "@reduxjs/toolkit";
import medicalRecordReducer from '../features/slices/medicalRecordSlice.js'
import authReducer from '../features/slices/authSlice'
import userReducer from '../features/slices/userSlice.js'
export const store = configureStore({
  reducer: {
    medicalRecord: medicalRecordReducer,
    auth: authReducer,
    // admin: adminReducer,
    user: userReducer
  },
});