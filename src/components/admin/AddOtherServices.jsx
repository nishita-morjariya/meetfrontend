import React from 'react'
import AHeader from '../admin/AHeader.jsx'
import ASidebar from '../admin/Sidebar.jsx'
import { useNavigate } from 'react-router-dom'

export default function AddOtherServices() {
  const navigate = useNavigate();
  return (
    <>
    
     <AHeader />
    
          <div className="flex">
            <ASidebar />
    
            <div className="flex-1 min-h-screen flex items-center justify-center bg-gray-100 p-6">
              <div className="bg-white shadow-xl rounded-xl p-8 max-w-lg w-full">
    
                <h1 className="text-2xl font-bold text-center text-blue-900 mb-6">
                  Select Services 
                </h1>
    
                <div className="flex flex-col gap-4">
    
                  {/* Fixed Deposit */}
                  <button
                    onClick={() => navigate("/adduser/addotherservices/addfixeddeposit")}
                    className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition font-semibold"
                  >
                    Add Fixed Deposit
                  </button>
                  
                  {/* Bonds */}
                  <button
                    onClick={() => navigate("/adduser/addotherservices/addbonds")}
                    className="w-full bg-yellow-700 text-white py-3 rounded-lg hover:bg-blue-800 transition font-semibold">
                    Add Bonds
                  </button>

                  {/* Stocks */}
                  <button
                    onClick={() => navigate("/adduser/addotherservices/addstocks")}
                    className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition font-semibold">
                    Add Stocks
                  </button>

    </div>
    </div>
    </div>
    </div>
    
    </>
  )
}
