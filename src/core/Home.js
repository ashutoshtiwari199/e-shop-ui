import React,{useState, useEffect} from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProduct } from "./helper/coreapicalls";






export default function Home() {

  const [products, setProduct]= useState([])
  const [error,setError]= useState(false)


  const loadAllProduct=()=>{
    getProduct().then(data=>{
      if(data.error){
        setError(data.error)
      } else{
        setProduct(data)
      }
    })
  }


  useEffect(() => {
    loadAllProduct() 
  }, [])


  return (
    <Base title="Home Page" discription="WelCome to the T-Shirt Store">
      <div className="row text-center">
        <h3 className="text-white ">All of T-shirt</h3>
        <div className="row">
          {products && products.map((item, index)=>{
            return(
              <div key={index} className="col-4 mb-4">
                <Card product={item} />
              </div>
            )
          })}
        </div>        
      </div>
    </Base>
  );
}
