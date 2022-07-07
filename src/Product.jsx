import React from "react";


const Product = (props) => {
  const style = {
    backgroundColor: 'pink',
    padding: '2rem',
    margin: '1rem'
  }

  const imgStyle = {
    width: '20rem',
    height: '20rem',
    backgroundColor: 'grey'
  }
  return (
    <div className='Product' style={style} key={props.resourceId}>
      <p>Name: {props.productName}</p>
      <p>Description: {props.blurb}</p>
      <img src={props.photoURL} alt="Loading photo" />
    </div>
  )
}


export default Product