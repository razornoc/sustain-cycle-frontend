import React, { Component, useEffect, useState } from 'react'
import ListItem from './ListItem'

export default function UserHome({ userData }) {
  const logOut = () => {
    window.localStorage.clear()
    window.location.href = './sign-in'
  }

  return (
    <div className='auth-wrapper'>
      <div className='auth-inner'>
        <div>
          Name<h1>{userData.fname}</h1>
          Email <h1>{userData.email}</h1>
          <br />
          <button onClick={logOut} className='btn btn-primary'>
            Log Out
          </button>
          <button
            onClick={() => {
              window.location.href = './listItem'
            }}
            className='btn btn-primary'
          >
            List item
          </button>
        </div>
      </div>
    </div>
  )
}
