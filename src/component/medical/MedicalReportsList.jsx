import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FileText, Download, Eye, Calendar, User, Stethoscope } from 'lucide-react';
import { getMedicalReports } from '../../features/action/medicalRecordActions';
import Loader from '../common/loader';

export default function MedicalReportsList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { medicalReports, loading } = useSelector((state) => state.medicalRecord);
  const [filteredReports, setFilteredReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(getMedicalReports());
  }, [dispatch]);

  useEffect(() => {
    if (medicalReports) {
      const filtered = medicalReports.filter(report =>
        report.reportName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.reportType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.doctorName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredReports(filtered);
    }
  }, [medicalReports, searchTerm]);

  const handleViewReport = (reportId) => {
    navigate(`/medical-report/${reportId}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {loading && <Loader />}
      
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl shadow-lg mb-4">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Medical Reports
          </h1>
          <p className="text-lg text-gray-600">View and analyze your medical reports</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search reports by name, type, or doctor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            />
            <FileText className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report) => (
            <div key={report._id} className="bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition duration-300">
              <div className="p-6">
                {/* Report Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{report.reportName}</h3>
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
                        {report.reportType}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Report Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm">{formatDate(report.reportDate)}</span>
                  </div>
                  
                  {report.doctorName && (
                    <div className="flex items-center text-gray-600">
                      <User className="w-4 h-4 mr-2" />
                      <span className="text-sm">Dr. {report.doctorName}</span>
                    </div>
                  )}

                  {report.files && report.files.length > 0 && (
                    <div className="flex items-center text-gray-600">
                      <FileText className="w-4 h-4 mr-2" />
                      <span className="text-sm">{report.files.length} file(s)</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleViewReport(report._id)}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-300 flex items-center justify-center"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Report
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredReports.length === 0 && !loading && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No reports found</h3>
            <p className="text-gray-500">No medical reports match your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}