import React, { Component, useEffect, useState } from 'react'
import './home.css'
import Card from './card'


export default function UserHome({ userData }) {

  const [userList,setUserList]=useState()

  const email=userData.email

  const userPage=true
  const handlelogout = () => {
    window.localStorage.clear()
    window.location.reload()
  }
  const handleListItem = (e) => {
    if (isLoggedIn) window.location.href = './listItem'
    else window.location.href = './sign-in'
  }
  const handleDelete=(itemId)=>{
    console.log("clik")
    fetch("http://localhost:5000/deleteItem", {
  method: "POST",
  crossDomain: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  body: JSON.stringify({
    itemid: itemId
  }),
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data)
    alert(data.status)
    window.location.reload()
  });
}
  const isLoggedIn=window.localStorage.getItem("loggedIn")
  useEffect(()=>{
    fetch(`http://localhost:5000/userListings?email=${email}`,{
            method:"GET",
        }).then((res)=>res.json())
        .then((data)=>{
            setUserList(data.data)
            console.log(data.data)})
  },[email])
  
  return (
    <div>
    <nav className='navbar'>
      <div>
        <span className='logo'>Sustain Cycle</span>
      </div>
      <div className='navbar-search'>
        <h2 style={{color:"white"}}>Welcome to your dashboard {userData.fname}</h2>
      </div>
      <div className='navbar-links'>
        <button onClick={handleListItem} className='list-button'>
          List Item
        </button>
        {isLoggedIn ? (
          <button onClick={handlelogout} className='logout-button'>
            Logout
          </button>
        ) : (
          <button
            onClick={() => {
              window.location.href = './sign-in'
            }}
            className='logout-button'
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
    <div className='home'>
      {userList &&
        Array.isArray(userList) &&
        userList.map((i) => {
          return <div>
            <Card data={i}  />
            <button onClick={()=>handleDelete(i._id)}  className='btn btn-primary' style={{marginBottom:"20px",marginRight:"250px",marginTop:"10px",width:"200px",backgroundColor:"#dc3545", borderColor:"#dc3545",marginLeft:"300px"}}>delete</button>
            </div>
        })}
    </div>
  </div>
  )
}
