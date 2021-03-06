import React,{useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from './helper/cartHelper';
// import { addItemToCart } from './helper/carthelper';
import Imagehelper from './helper/Imagehelper';



const Card = ({
  product,
  addToCart= true,
  removeFromCart=false, 
  setReload=f=>f,
  // setReload= function(f){return f}
  reload=undefined
}) => {

  const [redirect, setRedirect]= useState(false)
  const [count, setCount] = useState(product.count)

  const cardTitle= product ? product.name :"A dummy pic"
  const cardDescription= product ? product.description :"A default description"
  const cardPrice= product ? product.price :"A dummy price"


  const addThisToCart=()=>{
    addItemToCart(product, ()=>setRedirect(true))
  } 

  const getARedirect=(redirect)=>{
    if(redirect){
      return <Redirect to="/cart" />
    }
  }

    const showAddToCart=(addToCart)=>{
        return(
            addToCart && (
                <button
                onClick={addThisToCart}
                className="btn btn-block btn-outline-success mt-2 mb-2"
              >
                Add to Cart
              </button>
            )
        )
    }

    const showReamoveFromCart=(removeFromCart)=>{
        return(
            removeFromCart && (
                <button
                onClick={()=>{
                 removeItemFromCart(product._id);
                 setReload(!reload);
                }} 
                className="btn btn-block btn-outline-danger mt-2 mb-2"
              >
                Remove from cart
              </button>
            )
        )
    }

    return (
      <div className="card text-white bg-dark border border-info ">
        <div className="card-header lead">{cardTitle}</div>
        <div className="card-body">
          {getARedirect(redirect)}
          <Imagehelper product= {product}/> 
          <p className="lead bg-success font-weight-normal text-wrap rounded text-center">
            {cardDescription}
          </p>
          <p className="btn btn-success rounded  btn-sm px-4">$ {cardPrice}</p>
          <div className="row">
            <div className="col-12">
              {showAddToCart(addToCart)}
            </div>
            <div className="col-12">
              {showReamoveFromCart(removeFromCart)}
            </div>
          </div>
        </div>
      </div>
    );
  };


  export default Card