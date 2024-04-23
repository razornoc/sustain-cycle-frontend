import React, { useEffect, useState } from 'react'

function ListItem() {
  const [itemName, setItemName] = useState('')
  const [desc, setDesc] = useState('')
  const [years, setYears] = useState(0)
  const [price, setPrice] = useState(0)
  const [phno, setPhno] = useState(0)
  const [image, setImage] = useState('')

  // const token = window.localStorage.getItem('token')

  const convertToBase64 = (e) => {
    e.preventDefault()
    //code to convert to base 64(that is from an image to a string)
    var reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload = () => {
      console.log(reader.result) //string obtained
      setImage(reader.result)
    }
    reader.onerror = (error) => {
      console.log('Error:', error)
    }
  }
//   useEffect(() => {
//     console.log({ phno })
//   }, [phno])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (image == '' || image == null) {
      
      alert('choose an image to submit this form')}
    // else if (token==null){
    //     alert('session expired')
    //     window.location.href='./sign-in'
    // }
    else{
        fetch('http://localhost:5000/itemRegister',{
            method: 'POST',
            crossDomain: true,
            headers:{
                'Content-Type':"application/json",
                Accept: "application/json",
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                itemName,
                desc,
                years,
                price,
                phno,
                image,
                token: window.localStorage.getItem("token")
            })
        }).then((res) => res.json())
        .then((data) => {
          console.log(data, 'userRegister')
          if (data.status == 'item listed') {
            alert('item listing has been Successful')
          } else {
            alert('Something went wrong')
          }
        })
    }
  }

  return (
    <div className='auth-wrapper'>
      <div
        className='auth-inner'
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '700px',
        }}
      >
        <form onSubmit={handleSubmit}>
          <p>enter the details of the listing</p>
          <div className='mb-3' style={{ width: '500px', height: 'auto' }}>
            <label>Item Name</label>
            <input
              type='text'
              className='form-control'
              placeholder='Item Name'
              maxLength='20'
              onChange={(e) => setItemName(e.target.value)}
            />
          </div>
          <div className='mb-3' style={{ width: '500px' }}>
            <label>Item description</label>
            <textarea
              type='text'
              className='form-control'
              placeholder='maximum length of 90'
              maxLength='90'
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className='mb-3' style={{ width: '500px' }}>
            <label>number of years since bought </label>
            <input
              type='number'
              min='0'
              step='1'
              className='form-control'
              placeholder='number of years'
              onChange={(e) => setYears(e.target.value)}
            />
          </div>
          <div className='mb-3' style={{ width: '500px' }}>
            <label>price of the product to be sold in rupees</label>
            <input
              type='number'
              min='0'
              step='1'
              className='form-control'
              placeholder='price'
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className='mb-3' style={{ width: '500px' }}>
            <label>phone number to be contacted</label>
            <input
              type='number'
              min='0'
              className='form-control'
              placeholder='phone number'
              onChange={(e) => setPhno(e.target.value)}
            />
          </div>
          <div className='mb-3' style={{ width: '500px' }}>
            <label>Upload the image to be displayed (ideally landscape)</label>
            <input
              type='file'
              min='0'
              className='form-control'
              accept='image/*'
              onChange={convertToBase64}
            />
          </div>
          <div className='mb-3'>
            {image == null || image == '' ? (
              ''
            ) : (
              <img src={image} height={100} />
            )}
          </div>
          <div className='d-grid'>
            <button type='submit' className='btn btn-primary'style={{backgroundColor:"#dc3545", borderColor:"#dc3545"}} >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ListItem
