import React from 'react'
import Dashboard from './Dashboard.jsx'
export default function AContent() {
  return (
    <>
    
    <div className='p-5 m-5 text-xl font-bold shadow-lg '>
        <p>
         Hello, welcome to your admin profile page. Here you can view your details and manage your account.
        </p>
         <div>
            <div className='m-5 p-5 border-2'>
                <h4>Name : Bhadresh Kakkad, Meet Kakkad </h4>
                <h4>Password : </h4>
                <h4>Authority : Owner  </h4>
            </div>
        </div>
    </div>

    </>
  )
}
