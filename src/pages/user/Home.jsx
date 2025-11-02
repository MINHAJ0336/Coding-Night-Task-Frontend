import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import heroImage from '../../assets/images/add.jpg';
import ProductCart from '../../component/user/ProductCart'
import Loader from '../../component/common/loader'

// ✅ TEMPORARY - Agar product actions nahi hai to comment out karo
// import { getActiveProducts, getAllUserCategories, searchProducts } from '../../features/action/productAction'

export default function Home() {
    const [data, setData] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // ✅ TEMPORARY - Jab tak actions nahi bante, comment out karo
        // dispatch(getActiveProducts())
        // dispatch(getAllUserCategories())
    }, [dispatch])

    // ✅ CORRECTED useSelector - Redux store structure check karo
    const { products, categories, message, messageType, loading } = useSelector((state) => state.product || {})

    // ✅ ALTERNATIVE - Safe destructuring
    // const productState = useSelector((state) => state.product)
    // const { products = [], categories = [], message, messageType, loading = false } = productState || {}

    return (
        <div className='w-screen flex flex-col items-center justify-center'>
            {loading && <Loader />}

            {/* Hero Image */}
            <div className="w-full">
                <img 
                    src={heroImage} 
                    alt="Hero Banner" 
                    className="w-full h-auto object-cover"
                />
            </div>

            {/* Products by Category */}
            <div className='sm:w-[95%] py-6 flex flex-col gap-5'>
                {/* ✅ SAFE RENDERING - Check if categories exists */}
                {categories && categories.map((cat, i) => {
                    const category_products = products ? products.filter(
                        (p) => p.category === cat._id
                    ) : [];

                    if (category_products.length === 0) return null;

                    return (
                        <div key={i} className='w-[95vw] flex flex-col bg-blue-50 p-4 rounded-lg'>
                            <div className='flex items-center justify-between px-5'>
                                <p className='text-xl font-medium'>{cat.category}</p>
                                <Link to={`/productlisting/${cat._id}`}>See all</Link>
                            </div>

                            <div className='w-[100%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-4 overflow-x-auto'>
                                {category_products.slice(0, 3).map((item, j) => (
                                    <ProductCart
                                        key={j}
                                        onClick={() => navigate(`/detailpage/${item._id}`)}
                                        showAction={false}
                                        showGrid={true}
                                        product={item}
                                    />
                                ))}
                            </div>
                        </div>
                    );
                })}
                
                {/* ✅ FALLBACK UI - Agar data nahi hai */}
                {(!categories || categories.length === 0) && (
                    <div className="text-center py-8">
                        <p className="text-gray-500">No categories available</p>
                    </div>
                )}
            </div>
        </div>
    )
}




