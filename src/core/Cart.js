import React,{useState, useEffect} from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import Paymentb from "./Paymentb";






const Cart=()=> {

    const [products, setProducts]= useState([]);
    const [reload, setReload] = useState(false);
    


    useEffect(()=>{
        setProducts(loadCart())
    },[reload])   


    const loadallProducts=(products)=>{
        return(
            <div>
                <h3>This section is to load a product</h3>
                {products && products.map((product, index)=>(
                    <Card
                        key={index}
                        product={product}
                        removeFromCart={true}
                        addToCart={false}
                        setReload={setReload}
                        reload={reload}
                    />
                ))}
            </div>
        )
    }

    const loadCheckout=()=>{
        return(
            <div>
                <h3>This section is for checkout</h3>
            </div>
        )
    }
  return (
    <Base title="Cart Page" discription="Ready to checkout">
      <div className="row">
        <div className="col-6">
            {products && products.length > 0 ? loadallProducts(products): ( <h3>No Products</h3> )}
        </div>
        <div className="col-6">
            {/* {loadCheckout()} */}
            <Paymentb products={products} setReload={setReload} />
        </div>
      </div>
    </Base>
  );
}

export default Cart