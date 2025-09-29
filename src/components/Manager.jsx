import React from 'react'
import Home from './Home'

function Manager() {
  return (
    <>
    <Home/>
    <div style={{
        backgroundColor: "lightgray",
        minHeight: "100vh",
        padding: "20px"
      }}>
        <h2 className="text-2xl font-bold mb-6 text-center">Hello Manager</h2>
    </div>
    </>
  )
}

export default Manager