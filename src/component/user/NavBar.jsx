import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import {checkUser, logout} from '../../features/action/authAction'
import { handleSuccess } from '../common/tosters';
import { getprofile } from '../../features/action/userAction';
import Loader from '../common/loader';
import UserDropdown from './userDropDown';

export default function NavBar() {

    const [showbar, setshowbar] = useState(false);
    const [stickybar, setsstickybar] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const { currentUser} = useSelector((state)=>state.user);
    const { currentUser, loading, message, messageType} = useSelector((state)=>state.auth);
// console.log(currentUser);

    useEffect(() => {

        dispatch(checkUser())


    }, []);

const handleLogout = () => {
  dispatch(logout());                   // clear redux + localStorage
  setTimeout(() => {
    handleSuccess("Logout Successfully"); // show toast after state clears
    navigate("/login");
  }, 3000);


};

const [open, setOpen] = useState(false);
  const menuRef = useRef();

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

    return (
        <div className={`h-20 flex  flex-row w-full items-center bg-blue-50 text-black justify-between md:justify-around transition delay-100 duration-100 z-40 
        
        `}>
            {loading && <Loader/>}
        <div className={`h-20 flex  flex-row w-full items-center bg-blue-50 text-black justify-between md:justify-around transition delay-100 duration-100  
            z-[9999] fixed
        `}>
            <div className='md:w-[25%] flex items-center justify-center'>
                <Link className='flex items-center flex-col px-5' to={'/'}>
                    <p className='text-3xl font-extrabold'>Swapy</p>
                </Link>
            </div>
            <button type='button' className='md:hidden px-5'
                onClick={() => { setshowbar(!showbar) }}
            > <i className='fa-solid fa-bars text-2xl text-black'></i> </button>
            
            <div 
            onMouseLeave={()=>{setshowbar(false)}}
            
            className={` md:w-[50%] w-full  flex flex-col md:flex-row md:items-center justify-end md:static absolute top-20  transition-all duration-300 ease-in-out  
                transform md:bg-transparent bg-white  text-black gap-2 md:py-0 py-4
                     ${showbar ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-4 md:max-h-none md:opacity-100 md:translate-y-0"}
                     z-40
                     gap-5 pr-5
                `}>
                <Link  onClick={()=>{setshowbar(false)}} className='md:px-0 px-6 hover:bg-blue-950 hover:text-white md:hover:text-blue-900 md:hover:bg-transparent' to={'/'}      >
                <i className='fa-solid fa-home text-2xl'></i>
                 </Link>
                {
                 currentUser?.role=="user"?(
                <>
                <Link  onClick={()=>{setshowbar(false)}} className='md:px-0 px-6 hover:bg-blue-950 hover:text-white md:hover:text-blue-900 md:hover:bg-transparent z-30' to={'/chats'}    >
                
                 <i className='fa-regular fa-comment text-2xl'></i></Link>
                
                 <UserDropdown handleLogout={handleLogout} currentUser={currentUser}/>
                 </>):(
                     <>
                <Link  onClick={()=>{setshowbar(false)}} className='md:px-0 px-6 hover:bg-blue-950 hover:text-white md:hover:text-blue-900 md:hover:bg-transparent' to={'/login'} >Login</Link>
                
                <Link  onClick={()=>{setshowbar(false)}} className='md:px-0 px-6 hover:bg-blue-950 hover:text-white md:hover:text-blue-900 md:hover:bg-transparent' to={'/register'}    > Register </Link>
                        </>
            )
        } 
               <Link  onClick={()=>{setshowbar(false)}} className='md:px-0 px-6 hover:bg-blue-950 hover:text-white md:hover:text-blue-900 md:hover:bg-transparent' to={'/sellproduct'}    > 
                <button className='border-3 px-4 py-1 rounded-3xl text-xl'><i className='fa-solid fa-plus'></i>Sell </button>
                 </Link>

            </div>
        </div>

        </div>
    )
}
