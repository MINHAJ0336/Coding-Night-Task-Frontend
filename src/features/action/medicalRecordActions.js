import { createAsyncThunk } from "@reduxjs/toolkit";

// ✅ CORRECTED URLs - /api/health prefix add karo
export const uploadMedicalReport = createAsyncThunk('medicalReports/upload', async (data, { rejectWithValue }) => {
    try {
        const formData = new FormData();
        
        formData.append('reportName', data.reportName);
        formData.append('reportType', data.reportType);
        formData.append('reportDate', data.reportDate);
        formData.append('doctorName', data.doctorName || '');
        formData.append('hospitalName', data.hospitalName || '');
        formData.append('additionalNotes', data.additionalNotes || '');

        if (data.files && data.files.length > 0) {
            data.files.forEach(file => {
                formData.append('files', file);
            });
        }

        // ✅ CORRECTED URL - /api/health add karo
        const response = await fetch('http://localhost:5000/medical-reports', {
            method: 'POST',
            credentials: 'include',
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }

        const result = await response.json();
        return result;

    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const getMedicalReports = createAsyncThunk('medicalReports/getAll', async (data, { rejectWithValue }) => {
    try {
        // ✅ CORRECTED URL
        const response = await fetch('http://localhost:5000/api/health/medical-reports', {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }

        const result = await response.json();
        return result;

    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const getMedicalReportById = createAsyncThunk('medicalReports/getById', async (id, { rejectWithValue }) => {
    try {
        // ✅ CORRECTED URL
        const response = await fetch(`http://localhost:5000/api/health/medical-reports/${id}`, {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }

        const result = await response.json();
        return result;

    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// ✅ NEW: Get Medical Report Analysis with AI
export const getMedicalReportAnalysis = createAsyncThunk('medicalReports/analysis', async (id, { rejectWithValue }) => {
    try {
        // ✅ CORRECTED URL
        const response = await fetch(`http://localhost:5000/api/health/medical-reports/${id}/analysis`, {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }

        const result = await response.json();
        return result;

    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Health Vitals APIs - CORRECTED
export const addHealthVitals = createAsyncThunk('healthVitals/add', async (data, { rejectWithValue }) => {
    try {
        // ✅ CORRECTED URL
        const response = await fetch('http://localhost:5000/api/health/health-vitals', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }

        const result = await response.json();
        return result;

    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const getHealthVitals = createAsyncThunk('healthVitals/getAll', async (filters = {}, { rejectWithValue }) => {
    try {
        const { startDate, endDate, limit = 50 } = filters;
        
        const queryParams = new URLSearchParams({
            ...(startDate && { startDate }),
            ...(endDate && { endDate }),
            ...(limit && { limit: limit.toString() }),
        });

        // ✅ CORRECTED URL
        const response = await fetch(`http://localhost:5000/api/health/health-vitals?${queryParams}`, {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }

        const result = await response.json();
        return result;

    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const getHealthVitalById = createAsyncThunk('healthVitals/getById', async (id, { rejectWithValue }) => {
    try {
        // ✅ CORRECTED URL
        const response = await fetch(`http://localhost:5000/api/health/health-vitals/${id}`, {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }

        const result = await response.json();
        return result;

    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Dashboard API - CORRECTED
export const getHealthDashboard = createAsyncThunk('health/dashboard', async (data, { rejectWithValue }) => {
    try {
        // ✅ CORRECTED URL
        const response = await fetch('http://localhost:5000/api/health/dashboard', {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }

        const result = await response.json();
        return result;

    } catch (error) {
        return rejectWithValue(error.message);
    }
});

