import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserDropdown from './userDropDown';
import { handleSuccess } from '../common/tosters';
import { useDispatch, useSelector } from 'react-redux';
import { checkUser, logout } from '../../features/action/authAction';

export default function Nav() {
    const [showBar, SetBar] = useState(false);
    const [showDown, SetshowDown] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { currentUser, loading, message, messageType } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(checkUser())
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        setTimeout(() => {
            handleSuccess("Logout Successfully");
            navigate("/login");
        }, 3000);
    }

    const handleDropDown = () => {
        SetBar(!showBar);
    }

    return (
        <div className='w-full bg-white border-b border-gray-200 shadow-sm'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between items-center h-16'>
                    
                    {/* Left Side - Logo */}
                    <div className='flex items-center'>
                        <Link className='flex items-center' to={'/'}>
                            <div className='flex items-center space-x-2'>
                                {/* Logo Image - آپ اپنی logo image کا path دیں */}
                                <img 
                                    src="/logo.png" 
                                    alt="Logo" 
                                    className="h-8 w-8"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'block';
                                    }}
                                />
                                
                                <span className='text-xl font-bold text-gray-900'>Project Managment System</span>
                            </div>
                        </Link>
                    </div>

                    {/* Center - Navigation Links */}
                    <div className='hidden md:flex items-center space-x-8'>
                        <Link 
                            to={'/motors'} 
                            className='flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition duration-200'
                        >
                            
                            <span className='font-medium'>Home</span>
                        </Link>
                        
                        <Link 
                            to={'/doctors-team'} 
                            className='flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition duration-200'
                        >
                            
                            <span className='font-medium'>Doctor Team</span>
                        </Link>

                        {/* Additional links as per image */}
                        <Link 
                            to={'/mobile-phones'} 
                            className='text-gray-700 hover:text-blue-600 font-medium transition duration-200'
                        >
                            Services
                        </Link>
                        
                        <Link 
                            to={'/electronics'} 
                            className='text-gray-700 hover:text-blue-600 font-medium transition duration-200'
                        >
                            Facilities
                        </Link>
                    </div>

                    {/* Right Side - User Actions */}
                    <div className='flex items-center space-x-4'>
                        
                        {/* Sell Button */}
                        <Link 
                            to={'/sellproduct'} 
                            className='bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center space-x-1 transition duration-200'
                        >
                            <i className='fa-solid fa-plus text-xs'></i>
                            <span>Reports Upload</span>
                        </Link>

                        {/* User Authentication */}
                        {currentUser?.role == "user" ? (
                            <div className='flex items-center space-x-4'>
                                {/* Chat Icon */}
                                <Link
                                    to={'/chats'}
                                    className='text-gray-600 hover:text-blue-600 transition duration-200 p-2'
                                >
                                    <i className='fa-regular fa-comment text-xl'></i>
                                </Link>
                                
                                {/* User Dropdown */}
                                <UserDropdown 
                                    currentUser={currentUser} 
                                    handleLogout={handleLogout} 
                                    handleDropDown={handleDropDown}
                                />
                            </div>
                        ) : (
                            <div className='hidden md:flex items-center space-x-4'>
                                <Link
                                    to={'/login'}
                                    className='text-gray-700 hover:text-blue-600 font-medium transition duration-200'
                                >
                                    Login
                                </Link>
                                <Link
                                    to={'/register'}
                                    className='text-gray-700 hover:text-blue-600 font-medium transition duration-200'
                                >
                                    Register
                                </Link>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => SetBar(!showBar)}
                            className='md:hidden text-gray-600 hover:text-blue-600 p-2'
                        >
                            <i className='fa-solid fa-bars text-xl'></i>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden transition-all duration-300 ease-in-out bg-white border-t border-gray-200
                    ${showBar ? 'max-h-96 opacity-100 py-4' : 'max-h-0 opacity-0 overflow-hidden'}`}
                >
                    <div className='flex flex-col space-y-4 px-2'>
                        
                        

                        {/* Mobile Auth Links for non-logged in users */}
                        {!currentUser && (
                            <>
                                <Link
                                    to={'/login'}
                                    onClick={() => SetBar(false)}
                                    className='text-gray-700 hover:text-blue-600 py-2 border-t border-gray-200 pt-4'
                                >
                                    Login
                                </Link>
                                <Link
                                    to={'/register'}
                                    onClick={() => SetBar(false)}
                                    className='text-gray-700 hover:text-blue-600 py-2'
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}