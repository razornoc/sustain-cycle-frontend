import React, { useEffect, useState } from 'react'
import './home.css'
import Card from './card'

function Home() {
  const isLoggedIn = window.localStorage.getItem('loggedIn')
  const [search, setSearch] = useState('')
  const [listData, setListData] = useState()

  const handlelogout = () => {
    window.localStorage.clear()
    window.location.reload()
  }
  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }
  const handleListItem = (e) => {
    if (isLoggedIn) window.location.href = './listItem'
    else window.location.href = './sign-in'
  }
  useEffect(() => {
    fetch(`http://localhost:5000/allListings?search=${search}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        setListData(data.data)
        console.log(data)
      })
    // console.log({search})
  }, [search])
  return (
    <div>
      <nav className='navbar'>
        <div>
          <button
            onClick={() => {
              window.location.href = './userDetails'
            }}
          >
            user
          </button>
          <span className='logo'>Sustain Cycle</span>
        </div>
        <div className='navbar-search'>
          <input
            onChange={handleSearchChange}
            type='text'
            placeholder='Search...'
          />
          <button className='search-button'>search</button>
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
        {listData &&
          Array.isArray(listData) &&
          listData.map((i) => {
            return <Card data={i} />
          })}
      </div>
    </div>
  )
}

export default Home
