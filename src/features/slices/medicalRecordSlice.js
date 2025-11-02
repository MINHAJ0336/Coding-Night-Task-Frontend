import { createSlice } from "@reduxjs/toolkit";
import {
  uploadMedicalReport,
  getMedicalReports,
  getMedicalReportById,
  getMedicalReportAnalysis,
  addHealthVitals,
  getHealthVitals,
  getHealthVitalById,
  getHealthDashboard // ✅ ADD THIS IMPORT
} from "../action/medicalRecordActions";

export const medicalRecordSlice = createSlice({
  name: "medicalRecord",
  initialState: {
    // Medical Reports
    medicalReports: [],
    currentMedicalReport: {},
    currentReportAnalysis: {},
    
    // Health Vitals
    healthVitals: [],
    currentHealthVital: {},
    
    // Dashboard Data
    dashboardData: {},
    
    // Common States
    message: null,
    messageType: null,
    loading: false,
    uploadProgress: 0
  },
  reducers: {
    clearMessage: (state) => {
      state.message = "";
      state.messageType = null;
    },
    setUploadProgress: (state, action) => {
      state.uploadProgress = action.payload;
    },
    clearCurrentReport: (state) => {
      state.currentMedicalReport = {};
      state.currentReportAnalysis = {};
    },
    clearCurrentVital: (state) => {
      state.currentHealthVital = {};
    },
    clearAnalysis: (state) => {
      state.currentReportAnalysis = {};
    },
    clearDashboard: (state) => { // ✅ Optional: Add clear dashboard reducer
      state.dashboardData = {};
    }
  },
  extraReducers: (builder) => {
    builder
      // Medical Reports - Upload
      .addCase(uploadMedicalReport.pending, (state) => {
        state.loading = true;
        state.uploadProgress = 0;
      })
      .addCase(uploadMedicalReport.fulfilled, (state, action) => {
        state.loading = false;
        state.uploadProgress = 100;
        state.medicalReports.unshift(action.payload.data);
        state.message = action.payload.message;
        state.messageType = action.payload.status;
      })
      .addCase(uploadMedicalReport.rejected, (state, action) => {
        state.loading = false;
        state.uploadProgress = 0;
        state.message = action.payload?.message || "Upload failed";
        state.messageType = action.payload?.status || 0;
      })

      // Medical Reports - Get All
      .addCase(getMedicalReports.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMedicalReports.fulfilled, (state, action) => {
        state.loading = false;
        state.medicalReports = action.payload.data;
        state.message = action.payload.message;
        state.messageType = action.payload.status;
      })
      .addCase(getMedicalReports.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message || "Failed to fetch reports";
        state.messageType = action.payload?.status || 0;
      })

      // Medical Reports - Get By ID
      .addCase(getMedicalReportById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMedicalReportById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentMedicalReport = action.payload.data;
        state.message = action.payload.message;
        state.messageType = action.payload.status;
      })
      .addCase(getMedicalReportById.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message || "Failed to fetch report";
        state.messageType = action.payload?.status || 0;
      })

      // Medical Reports - Get Analysis
      .addCase(getMedicalReportAnalysis.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMedicalReportAnalysis.fulfilled, (state, action) => {
        state.loading = false;
        state.currentReportAnalysis = action.payload.data;
        state.message = action.payload.message;
        state.messageType = action.payload.status;
      })
      .addCase(getMedicalReportAnalysis.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message || "Failed to generate analysis";
        state.messageType = action.payload?.status || 0;
      })

      // Health Vitals - Add
      .addCase(addHealthVitals.pending, (state) => {
        state.loading = true;
      })
      .addCase(addHealthVitals.fulfilled, (state, action) => {
        state.loading = false;
        state.healthVitals.unshift(action.payload.data);
        state.message = action.payload.message;
        state.messageType = action.payload.status;
      })
      .addCase(addHealthVitals.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message || "Failed to add vitals";
        state.messageType = action.payload?.status || 0;
      })

      // Health Vitals - Get All
      .addCase(getHealthVitals.pending, (state) => {
        state.loading = true;
      })
      .addCase(getHealthVitals.fulfilled, (state, action) => {
        state.loading = false;
        state.healthVitals = action.payload.data;
        state.message = action.payload.message;
        state.messageType = action.payload.status;
      })
      .addCase(getHealthVitals.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message || "Failed to fetch vitals";
        state.messageType = action.payload?.status || 0;
      })

      // ✅ FIXED: Dashboard - Now properly imported
      .addCase(getHealthDashboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(getHealthDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboardData = action.payload.data;
        state.message = action.payload.message;
        state.messageType = action.payload.status;
      })
      .addCase(getHealthDashboard.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message || "Failed to load dashboard";
        state.messageType = action.payload?.status || 0;
      });
  }
});

export const { 
  clearMessage, 
  setUploadProgress, 
  clearCurrentReport, 
  clearCurrentVital,
  clearAnalysis,
  clearDashboard // ✅ Export new reducer
} = medicalRecordSlice.actions;

export default medicalRecordSlice.reducer;