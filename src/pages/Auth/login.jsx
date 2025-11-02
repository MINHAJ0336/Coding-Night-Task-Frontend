import {React, useEffect, useState} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../features/action/authAction';
import {handleError, handleSuccess} from '../../component/common/tosters'
import Loader from '../../component/common/loader';
import { clearMessage, setMessage } from '../../features/slices/authSlice';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {IsLogin, loading, currentUser, message, messageType }=useSelector((state)=>state.auth)
  const eType =useSelector((state)=>state.auth)
  
  const [loginData, setloginData] = useState({email:"", password:""});
  
  const handleChange = e => {
    setloginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailFormat = /^[a-zA-Z0-9_.+]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    
    const {email, password}=loginData
    if(!email || !password){
      handleError("Please fill all fields")
    }
    if (!emailFormat.test(email)) {
      handleError("Please enter a valid email address!");
      return;
    }
    
    dispatch(login(loginData))
  };
    
  useEffect(() => {
    if (messageType == 1 && currentUser?.role === "user") {
      handleSuccess(message);
      setTimeout(() => {
        navigate(`/public-profile/${currentUser.id}`);
      }, 1000 );
    } 
    else if (messageType == 1 && currentUser?.role === "admin") {
      handleSuccess(message);
      setTimeout(() => {
        navigate('/admin');
      }, 1000);
    }
    if(IsLogin){}
    if (messageType == 0) {
      handleError(message);
    }
    if (messageType !== null) {
      dispatch(clearMessage());
    }
  }, [message, messageType,loading, currentUser, navigate, IsLogin]);

  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center items-center p-4">
      {loading && <Loader/>}

      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {/* Decorative Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-center">
            <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
            <p className="text-blue-100 mt-2">Sign in to your account</p>
          </div>
          
          <form autoComplete="off" className="p-8 space-y-6">
            <div className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input 
                    type="email"
                    name="email"
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                    placeholder="your.email@example.com" 
                    required 
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input 
                    type="password"
                    name="password"
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                    placeholder="Enter your password" 
                    required 
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Sign In
            </button>

            {/* Forgot Password Link */}
            <div className="text-center pt-4">
              <Link 
                to="/forgotpassword" 
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 inline-flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Forgot your password?
              </Link>
            </div>
          </form>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 border-t border-gray-100">
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200">
                Sign up now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}