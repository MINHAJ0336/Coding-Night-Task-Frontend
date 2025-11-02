// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Loader from "./loader";
// import { useDispatch, useSelector } from "react-redux";
// import { checkUser } from "../../features/action/authAction";


// export default function ProtectedRoute({children}){
//     const dispatch=useDispatch();
//     const{loading, IsLogin}= useSelector((state)=>state.auth)
//     const navigate = useNavigate()
// useEffect(()=>{
// dispatch(checkUser())
// },[dispatch])
    
//     if(loading) return <Loader/>
//     if(!IsLogin){
//         return navigate('/login')
//     }
//     return children;
// }
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./loader";
import { useDispatch, useSelector } from "react-redux";
import { checkUser } from "../../features/action/authAction";

export default function ProtectedRoute({children}){
    const dispatch = useDispatch();
    const { loading, IsLogin } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    
    useEffect(() => {
        dispatch(checkUser());
    }, [dispatch]);

    useEffect(() => {
        if (!loading && !IsLogin) {
            navigate('/login');
        }
    }, [loading, IsLogin, navigate]);

    if (loading) return <Loader/>
    if (!IsLogin) return null; // Ya <Loader/> ya empty div
    
    return children;
}