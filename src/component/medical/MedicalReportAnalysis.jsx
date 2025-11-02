import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Download, 
  Calendar, 
  User, 
  Stethoscope, 
  ArrowLeft,
  Printer,
  Activity,
  Heart,
  Thermometer
} from 'lucide-react';
import { getMedicalReportById } from '../../features/action/medicalRecordActions';
import Loader from '../common/loader';

export default function MedicalReportAnalysis() {
  const { reportId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentMedicalReport, loading } = useSelector((state) => state.medicalRecord);
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    if (reportId) {
      dispatch(getMedicalReportById(reportId));
    }
  }, [dispatch, reportId]);

  useEffect(() => {
    if (currentMedicalReport) {
      generateAnalysis(currentMedicalReport);
    }
  }, [currentMedicalReport]);

  const generateAnalysis = (report) => {
    // Simulated AI Analysis based on report type
    const analyses = {
      'blood-test': {
        status: 'Normal',
        color: 'green',
        summary: 'Your blood test results show normal ranges across most parameters. Continue maintaining your healthy lifestyle.',
        recommendations: [
          'Continue regular exercise',
          'Maintain balanced diet',
          'Stay hydrated',
          'Schedule next checkup in 6 months'
        ],
        critical: false
      },
      'mri-scan': {
        status: 'Requires Review',
        color: 'yellow',
        summary: 'MRI scan shows some areas that require specialist review. No immediate concerns detected.',
        recommendations: [
          'Consult with neurologist',
          'Follow up in 3 months',
          'Monitor symptoms',
          'Avoid strenuous activities'
        ],
        critical: false
      },
      'x-ray': {
        status: 'Normal',
        color: 'green',
        summary: 'X-ray results appear normal with no significant abnormalities detected.',
        recommendations: [
          'Continue current treatment',
          'Maintain bone health',
          'Regular exercise',
          'Adequate calcium intake'
        ],
        critical: false
      },
      'ecg': {
        status: 'Normal Rhythm',
        color: 'green',
        summary: 'ECG shows normal sinus rhythm with regular heart rate and no significant abnormalities.',
        recommendations: [
          'Continue cardiovascular exercise',
          'Monitor blood pressure',
          'Reduce stress',
          'Regular heart checkups'
        ],
        critical: false
      }
    };

    const defaultAnalysis = {
      status: 'Under Review',
      color: 'blue',
      summary: 'Report is currently under medical review. Please consult with your healthcare provider.',
      recommendations: ['Consult with doctor', 'Follow medical advice', 'Schedule follow-up'],
      critical: false
    };

    setAnalysis(analyses[report.reportType] || defaultAnalysis);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Implement PDF download functionality
    alert('PDF download feature will be implemented here');
  };

  if (loading) return <Loader />;
  if (!currentMedicalReport) return <div>Report not found</div>;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (color) => {
    const colors = {
      green: 'bg-green-100 text-green-800 border-green-200',
      yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      red: 'bg-red-100 text-red-800 border-red-200',
      blue: 'bg-blue-100 text-blue-800 border-blue-200'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 print:bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header with Navigation */}
        <div className="flex items-center justify-between mb-8 print:hidden">
          <button
            onClick={() => navigate('/medical-reports')}
            className="flex items-center text-gray-600 hover:text-gray-800 transition duration-300"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Reports
          </button>
          <div className="flex space-x-3">
            <button
              onClick={handlePrint}
              className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition duration-300"
            >
              <Printer className="w-4 h-4 mr-2" />
              Print
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-300"
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </button>
          </div>
        </div>

        {/* Medical Report Certificate */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden print:shadow-none print:border-none">
          {/* Certificate Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
                <FileText className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">MEDICAL REPORT ANALYSIS</h1>
            <p className="text-blue-100">Comprehensive Health Assessment</p>
          </div>

          {/* Patient and Report Details */}
          <div className="p-8 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Report Name:</span>
                    <span className="font-semibold">{currentMedicalReport.reportName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Report Type:</span>
                    <span className="font-semibold capitalize">{currentMedicalReport.reportType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Report Date:</span>
                    <span className="font-semibold">{formatDate(currentMedicalReport.reportDate)}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical Professional</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Doctor:</span>
                    <span className="font-semibold">
                      {currentMedicalReport.doctorName || 'Not Specified'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hospital:</span>
                    <span className="font-semibold">
                      {currentMedicalReport.hospitalName || 'Not Specified'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Analysis Date:</span>
                    <span className="font-semibold">{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Analysis Summary */}
          {analysis && (
            <div className="p-8 border-b border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Analysis Summary</h3>
                <span className={`px-4 py-2 rounded-full border-2 font-semibold ${getStatusColor(analysis.color)}`}>
                  {analysis.status}
                </span>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <p className="text-lg text-gray-700 leading-relaxed">{analysis.summary}</p>
              </div>

              {/* Recommendations */}
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Medical Recommendations</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {analysis.recommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-center bg-green-50 rounded-xl p-4">
                      <Activity className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-gray-700">{recommendation}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Attached Files */}
          {currentMedicalReport.files && currentMedicalReport.files.length > 0 && (
            <div className="p-8 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Attached Documents</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {currentMedicalReport.files.map((file, index) => (
                  <div key={index} className="border-2 border-gray-200 rounded-xl p-4 text-center hover:border-blue-500 transition duration-300">
                    <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 truncate">Document {index + 1}</p>
                    <button className="text-blue-600 text-sm hover:text-blue-700 mt-2">
                      View
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional Notes */}
          {currentMedicalReport.additionalNotes && (
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Additional Notes</h3>
              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
                <p className="text-gray-700 leading-relaxed">{currentMedicalReport.additionalNotes}</p>
              </div>
            </div>
          )}

          {/* Certificate Footer */}
          <div className="bg-gray-50 p-8 text-center">
            <div className="flex justify-center space-x-8 mb-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-2">
                  <Stethoscope className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-sm text-gray-600">Medical Professional</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-2">
                  <Heart className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-sm text-gray-600">Health Assessment</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-2">
                  <Activity className="w-8 h-8 text-purple-600" />
                </div>
                <p className="text-sm text-gray-600">Analysis Complete</p>
              </div>
            </div>
            <p className="text-gray-500 text-sm">
              This is a computer-generated analysis. Please consult with your healthcare provider for professional medical advice.
            </p>
            <p className="text-gray-400 text-xs mt-2">
              Generated on {new Date().toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}