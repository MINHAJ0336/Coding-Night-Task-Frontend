import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import UserLayout from './Layouts/userLayout'
import Home from './pages/user/Home'
import Login from './pages/Auth/login'
import Register from './pages/Auth/register'
import Profile from './pages/user/Profile'
import ForgotPassword from './pages/Auth/forgotPassword'
import OtpVerification from './pages/Auth/OtpVerification'
import SellProduct from './pages/user/AddMedicalRecord'
import DoctorDashboard from './pages/user/doctorsteam'
import ResetPassword from './pages/Auth/resetPassword'
import ProtectedRoute from './component/common/ProtectedRoute'
import { ToastContainer } from 'react-toastify'
import Loader from './component/common/loader'
import Nav from './component/user/Nav'
import MedicalReportsList from './component/medical/MedicalReportsList';
import MedicalReportAnalysis from './component/medical/MedicalReportAnalysis';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/nav' element={<Nav />} />
        <Route path='/' element={<UserLayout />}>

          <Route path='login' element={<Login />} />
          <Route index element={<Home />} />
          <Route path='forgotpassword' element={<ForgotPassword />} />
          <Route path='Otp/:email' element={<OtpVerification />} />
          <Route path='register' element={<Register />} />
          <Route path='resetpassword/:email/:otp' element={<ResetPassword />} />
          <Route path="doctors-team" element={<DoctorDashboard />} />
          <Route path="/medical-reports" element={<MedicalReportsList />} />
          <Route path="/medical-report/:reportId" element={<MedicalReportAnalysis />} />
          <Route path='sellproduct' element={
            <ProtectedRoute requiredRole={["user"]}>

              <SellProduct />
            </ProtectedRoute>
          } />

          <Route path='public-profile/:id' element={

            <Profile />

          } />




          <Route path='chats' element={
            <ProtectedRoute requiredRole={["user"]}>

            </ProtectedRoute>
          } />
        </Route>

        <Route path='/loader' element={<Loader />} >


        </Route>



        <Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
