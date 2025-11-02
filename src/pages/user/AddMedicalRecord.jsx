import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { 
  Upload, 
  Activity, 
  Heart, 
  Thermometer, 
  Weight, 
  Ruler,
  Clock,
  Stethoscope,
  FileText,
  Plus,
  X
} from "lucide-react";
import { handleError, handleSuccess } from "../../component/common/tosters";
import { clearMessage } from "../../features/slices/userSlice";
import Loader from "../../component/common/loader";

// ✅ YEH IMPORT ADD KARO - API ACTIONS
import { 
  uploadMedicalReport, 
  addHealthVitals 
} from "../../features/action/medicalRecordActions";

export default function UploadReport() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message, messageType, loading } = useSelector((state) => state.user);

  const [activeTab, setActiveTab] = useState("fileUpload");
  
  // File Upload Report Data
  const [fileReportData, setFileReportData] = useState({
    reportName: "",
    reportType: "",
    reportDate: "",
    doctorName: "",
    hospitalName: "",
    notes: ""
  });

  // Manual Vitals Data
  const [vitalsData, setVitalsData] = useState({
    systolic: "",
    diastolic: "",
    sugarLevel: "",
    sugarType: "fasting",
    weight: "",
    height: "",
    temperature: "",
    heartRate: "",
    oxygenLevel: "",
    notes: "",
    recordDate: ""
  });

  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  // Handle File Upload Report Changes
  const handleFileReportChange = (e) => {
    setFileReportData({ ...fileReportData, [e.target.name]: e.target.value });
  };

  // Handle Manual Vitals Changes
  const handleVitalsChange = (e) => {
    setVitalsData({ ...vitalsData, [e.target.name]: e.target.value });
  };

  // Handle File Selection
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setFiles((prev) => [...prev, ...selectedFiles]);
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  // Remove Selected File
  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit File Upload Report - API call add karo
  const handleFileUploadSubmit = async (e) => {
    e.preventDefault();
    if (!fileReportData.reportName || !fileReportData.reportType || !fileReportData.reportDate || files.length === 0) {
        handleError("Please fill all required fields and upload at least one file.");
        return;
    }
    
    try {
        // ✅ API call karo
        const result = await dispatch(uploadMedicalReport({
            reportName: fileReportData.reportName,
            reportType: fileReportData.reportType,
            reportDate: fileReportData.reportDate,
            doctorName: fileReportData.doctorName,
            additionalNotes: fileReportData.notes,
            files: files
        })).unwrap();
        
        handleSuccess("Report uploaded successfully!");
        
        // Reset form
        setFileReportData({
            reportName: "",
            reportType: "",
            reportDate: "",
            doctorName: "",
            hospitalName: "",
            notes: ""
        });
        setFiles([]);
        setPreviews([]);
        
    } catch (error) {
        handleError(error.message || "Upload failed");
    }
  };

  // Submit Manual Vitals - API call add karo
  const handleManualVitalsSubmit = async (e) => {
    e.preventDefault();
    if (!vitalsData.recordDate) {
        handleError("Please select record date.");
        return;
    }
    
    try {
        // ✅ API call karo
        const result = await dispatch(addHealthVitals(vitalsData)).unwrap();
        
        handleSuccess("Vitals recorded successfully!");
        
        // Reset form
        setVitalsData({
            systolic: "",
            diastolic: "",
            sugarLevel: "",
            sugarType: "fasting",
            weight: "",
            height: "",
            temperature: "",
            heartRate: "",
            oxygenLevel: "",
            notes: "",
            recordDate: ""
        });
        
    } catch (error) {
        handleError(error.message || "Failed to save vitals");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4">
      {loading && <Loader />}

      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl shadow-lg mb-4">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Health Records
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track your medical reports and health vitals in one place
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-xl p-2 mb-8 border border-gray-200">
          <div className="flex">
            <button
              className={`flex-1 py-4 px-6 text-center font-semibold rounded-xl transition-all duration-300 flex items-center justify-center ${
                activeTab === "fileUpload"
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105"
                  : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              }`}
              onClick={() => setActiveTab("fileUpload")}
            >
              <Upload className="w-5 h-5 mr-3" />
              Upload Report
            </button>
            <button
              className={`flex-1 py-4 px-6 text-center font-semibold rounded-xl transition-all duration-300 flex items-center justify-center ${
                activeTab === "manualVitals"
                  ? "bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg transform scale-105"
                  : "text-gray-600 hover:text-green-600 hover:bg-green-50"
              }`}
              onClick={() => setActiveTab("manualVitals")}
            >
              <Activity className="w-5 h-5 mr-3" />
              Add Vitals
            </button>
          </div>
        </div>

        {/* File Upload Form */}
        {activeTab === "fileUpload" && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mr-4">
                <Upload className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Upload Medical Report</h2>
                <p className="text-gray-600">Add your medical documents and reports</p>
              </div>
            </div>

            <form onSubmit={handleFileUploadSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Report Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="reportName"
                    type="text"
                    value={fileReportData.reportName}
                    onChange={handleFileReportChange}
                    placeholder="e.g., Blood Test Report"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-gray-50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Report Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="reportType"
                    value={fileReportData.reportType}
                    onChange={handleFileReportChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-gray-50"
                  >
                    <option value="">Select report type</option>
                    <option value="blood-test">Blood Test</option>
                    <option value="mri-scan">MRI Scan</option>
                    <option value="ct-scan">CT Scan</option>
                    <option value="x-ray">X-Ray</option>
                    <option value="ultrasound">Ultrasound</option>
                    <option value="ecg">ECG</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Report Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="reportDate"
                    type="date"
                    value={fileReportData.reportDate}
                    onChange={handleFileReportChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-gray-50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Doctor Name
                  </label>
                  <input
                    name="doctorName"
                    type="text"
                    value={fileReportData.doctorName}
                    onChange={handleFileReportChange}
                    placeholder="Doctor's name"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-gray-50"
                  />
                </div>
              </div>

              {/* File Upload Section */}
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-700">
                  Upload Files <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-blue-300 rounded-2xl p-8 text-center bg-blue-50 hover:bg-blue-100 transition duration-300">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.jpg,.jpeg,.png,.dicom"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-4">
                        <Plus className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-lg font-semibold text-gray-700 mb-2">Click to upload files</p>
                      <p className="text-sm text-gray-500">PDF, JPG, PNG files up to 10MB each</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* File Previews */}
              {previews.length > 0 && (
                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-gray-700">
                    Selected Files ({previews.length})
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {previews.map((src, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square rounded-xl overflow-hidden border-2 border-gray-200 group-hover:border-blue-500 transition duration-300">
                          <img src={src} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs transition duration-300 transform group-hover:scale-110"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Additional Notes</label>
                <textarea
                  name="notes"
                  value={fileReportData.notes}
                  onChange={handleFileReportChange}
                  placeholder="Any additional notes about this report..."
                  rows="3"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-gray-50 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
              >
                Upload Report
              </button>
            </form>
          </div>
        )}

        {/* Manual Vitals Form */}
        {activeTab === "manualVitals" && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mr-4">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Record Health Vitals</h2>
                <p className="text-gray-600">Track your daily health measurements</p>
              </div>
            </div>

            <form onSubmit={handleManualVitalsSubmit} className="space-y-6">
              {/* Record Date */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Record Date & Time <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    name="recordDate"
                    type="datetime-local"
                    value={vitalsData.recordDate}
                    onChange={handleVitalsChange}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 bg-gray-50"
                  />
                </div>
              </div>

              {/* Health Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Blood Pressure Card */}
                <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4">
                  <div className="flex items-center mb-3">
                    <Heart className="w-5 h-5 text-red-500 mr-2" />
                    <label className="text-sm font-semibold text-gray-700">Blood Pressure</label>
                  </div>
                  <div className="flex space-x-2">
                    <input
                      name="systolic"
                      type="number"
                      value={vitalsData.systolic}
                      onChange={handleVitalsChange}
                      placeholder="120"
                      className="flex-1 px-3 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200 text-center"
                    />
                    <span className="self-center text-red-500 font-bold">/</span>
                    <input
                      name="diastolic"
                      type="number"
                      value={vitalsData.diastolic}
                      onChange={handleVitalsChange}
                      placeholder="80"
                      className="flex-1 px-3 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200 text-center"
                    />
                  </div>
                </div>

                {/* Blood Sugar Card */}
                <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4">
                  <div className="flex items-center mb-3">
                    <Activity className="w-5 h-5 text-blue-500 mr-2" />
                    <label className="text-sm font-semibold text-gray-700">Blood Sugar</label>
                  </div>
                  <div className="space-y-2">
                    <input
                      name="sugarLevel"
                      type="number"
                      value={vitalsData.sugarLevel}
                      onChange={handleVitalsChange}
                      placeholder="100"
                      className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-center"
                    />
                    <select
                      name="sugarType"
                      value={vitalsData.sugarType}
                      onChange={handleVitalsChange}
                      className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-sm"
                    >
                      <option value="fasting">Fasting</option>
                      <option value="postMeal">Post Meal</option>
                      <option value="random">Random</option>
                    </select>
                  </div>
                </div>

                {/* Weight & Height Card */}
                <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-4">
                  <div className="flex items-center mb-3">
                    <Weight className="w-5 h-5 text-green-500 mr-2" />
                    <label className="text-sm font-semibold text-gray-700">Weight & Height</label>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        name="weight"
                        type="number"
                        value={vitalsData.weight}
                        onChange={handleVitalsChange}
                        placeholder="70"
                        className="flex-1 px-3 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 text-center"
                      />
                      <span className="text-sm text-gray-500">kg</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        name="height"
                        type="number"
                        value={vitalsData.height}
                        onChange={handleVitalsChange}
                        placeholder="175"
                        className="flex-1 px-3 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 text-center"
                      />
                      <span className="text-sm text-gray-500">cm</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Other Vitals Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Temperature Card */}
                <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-4">
                  <div className="flex items-center mb-3">
                    <Thermometer className="w-5 h-5 text-orange-500 mr-2" />
                    <label className="text-sm font-semibold text-gray-700">Temperature</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      name="temperature"
                      type="number"
                      step="0.1"
                      value={vitalsData.temperature}
                      onChange={handleVitalsChange}
                      placeholder="36.5"
                      className="flex-1 px-3 py-2 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200 text-center"
                    />
                    <span className="text-sm text-gray-500">°C</span>
                  </div>
                </div>

                {/* Heart Rate Card */}
                <div className="bg-pink-50 border-2 border-pink-200 rounded-2xl p-4">
                  <div className="flex items-center mb-3">
                    <Heart className="w-5 h-5 text-pink-500 mr-2" />
                    <label className="text-sm font-semibold text-gray-700">Heart Rate</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      name="heartRate"
                      type="number"
                      value={vitalsData.heartRate}
                      onChange={handleVitalsChange}
                      placeholder="72"
                      className="flex-1 px-3 py-2 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition duration-200 text-center"
                    />
                    <span className="text-sm text-gray-500">BPM</span>
                  </div>
                </div>

                {/* Oxygen Level Card */}
                <div className="bg-cyan-50 border-2 border-cyan-200 rounded-2xl p-4">
                  <div className="flex items-center mb-3">
                    <Activity className="w-5 h-5 text-cyan-500 mr-2" />
                    <label className="text-sm font-semibold text-gray-700">Oxygen Level</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      name="oxygenLevel"
                      type="number"
                      value={vitalsData.oxygenLevel}
                      onChange={handleVitalsChange}
                      placeholder="98"
                      className="flex-1 px-3 py-2 border border-cyan-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200 text-center"
                    />
                    <span className="text-sm text-gray-500">%</span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Notes</label>
                <textarea
                  name="notes"
                  value={vitalsData.notes}
                  onChange={handleVitalsChange}
                  placeholder="Any symptoms, feelings, or additional notes..."
                  rows="3"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 bg-gray-50 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
              >
                Save Vitals
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}