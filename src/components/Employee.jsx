import React from 'react'
import Home from './Home'

function Employee() {
  return (
    <>
    <Home/>
    <div style={{
        backgroundColor: "lightgray",
        minHeight: "100vh",
        padding: "20px"
      }}>
        <h2 className="text-2xl font-bold mb-6 text-center">Hello Employee</h2>
    </div>
     </>
  ) 
}

export default Employee