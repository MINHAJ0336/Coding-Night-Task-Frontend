import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMyFavourite } from '../../features/action/userAction';

export default function UserDropdown({ handleLogout, currentUser, handleDropDown }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyFavourite())
  }, [dispatch])

  const { favourite, loading } = useSelector(
    (state) => state.user
  );

  const count = favourite?.length

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative flex items-center gap-2 z-50 transition-all ease-in-out duration-300" ref={dropdownRef}>
      
      {/* User Trigger */}
      <div
        onClick={() => setOpen(!open)}
        className='flex items-center gap-2 p-2 rounded-lg hover:bg-blue-50 cursor-pointer transition-all duration-200 border border-transparent hover:border-blue-200'
      >
        <div className="relative">
          {currentUser?.image ? (
            <img 
              src={currentUser?.image?.image} 
              className='w-8 h-8 rounded-full object-cover border-2 border-blue-500'
              alt="Profile" 
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <i className='fa-solid fa-user text-white text-sm'></i>
            </div>
          )}
        </div>
        
        <i
          className={`fa-solid ${open ? 'fa-angle-up' : 'fa-angle-down'} text-blue-600 text-sm transition-transform duration-200`}
        ></i>
      </div>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute top-full right-0 bg-white border border-gray-200 shadow-xl rounded-2xl w-80 z-50 overflow-hidden transition-all duration-300 ease-out animate-in fade-in-0 zoom-in-95">
          
          {/* User Header Section */}
          <div className='bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white'>
            <div className='flex items-center gap-4'>
              {currentUser?.image ? (
                <img 
                  src={currentUser?.image?.image}
                  className='w-16 h-16 rounded-full object-cover border-4 border-white/30'
                  alt="Profile" 
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center border-4 border-white/30">
                  <i className='fa-solid fa-user text-white text-2xl'></i>
                </div>
              )}
              <div className='flex-1 min-w-0'>
                <p className='font-bold text-lg truncate'>{`${currentUser?.firstName} ${currentUser?.lastName}`}</p>
                <p className='text-blue-100 text-sm truncate'>{currentUser?.email}</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-2">
            <ul className="space-y-1">
              <li>
                <Link
                  to={`/public-profile/${currentUser?._id}`}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-all duration-200 group"
                  onClick={() => { setOpen(false); handleDropDown }}
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                    <i className="fa-solid fa-user text-blue-500 text-sm group-hover:text-white"></i>
                  </div>
                  <span className="font-medium">My Profile</span>
                </Link>
              </li>
              
              <li>
                <Link
                  to="/myAds"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-all duration-200 group"
                  onClick={() => { setOpen(false); handleDropDown }}
                >
                  <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center group-hover:bg-green-500 transition-colors">
                    <i className="fa-solid fa-rectangle-ad text-green-500 text-sm group-hover:text-white"></i>
                  </div>
                  <span className="font-medium">My Ads</span>
                </Link>
              </li>
              
              <li className='relative'>
                <Link
                  to="/myfavourite"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-all duration-200 group"
                  onClick={() => { setOpen(false); handleDropDown }}
                >
                  <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center group-hover:bg-red-500 transition-colors">
                    <i className="fa-solid fa-heart text-red-500 text-sm group-hover:text-white"></i>
                  </div>
                  <span className="font-medium">My Favourite</span>
                  {count > 0 && (
                    <div className='absolute right-4 top-1/2 transform -translate-y-1/2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse'>
                      {count}
                    </div>
                  )}
                </Link>
              </li>
              
              <li>
                <Link
                  to="/manage-profile"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-all duration-200 group"
                  onClick={() => { setOpen(false); handleDropDown }}
                >
                  <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center group-hover:bg-purple-500 transition-colors">
                    <i className="fa-solid fa-gear text-purple-500 text-sm group-hover:text-white"></i>
                  </div>
                  <span className="font-medium">Manage Profile</span>
                </Link>
              </li>
            </ul>

            {/* Logout Button */}
            <div className="border-t border-gray-100 mt-2 pt-2">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-red-50 text-gray-700 hover:text-red-600 transition-all duration-200 group"
              >
                <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center group-hover:bg-red-500 transition-colors">
                  <i className="fa-solid fa-right-from-bracket text-red-500 text-sm group-hover:text-white"></i>
                </div>
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
