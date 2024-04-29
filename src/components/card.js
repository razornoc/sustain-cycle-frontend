import React from 'react'
import './card.css'

function Card(props) {
    const data =props.data
    const isLoggedIn= window.localStorage.getItem("loggedIn")
    
  return (
    <div className='auth-wrapper'style={{marginTop:"20px"}}>
        <div className='auth-inner'style={{display:"flex",width:"800px"}} >
            <div className='image'>
                <img src={data.image}/>
            </div>
            <div >
                <h2>{data.item}</h2>
                <p>{data.desc}</p>
                <h6>Number of years used: {data.years}</h6>
                <h6>price {data.price}</h6>
                {isLoggedIn?<h6>Contact: {data.phno} </h6>:<h6>Contact: Log in to view </h6>}
            </div>
        </div>
        
    </div>
  )
}

export default Card