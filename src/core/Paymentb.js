import React,{ useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import { cartEmpty, loadCart } from './helper/cartHelper'
import { createOder } from './helper/orderHelper'
import { getmeToken, proccessPayment } from './helper/paymentbhelper'

import DropIn from 'braintree-web-drop-in-react'


const Paymentb=({products, setReload = f=>f, reload=undefined} )=> {


    const [info, setInfo] = useState({
        loading:false,
        success: false,
        clientToken: null,
        error:"",
        instance:{}
    })

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    const getToken=(userId, token)=>{
        getmeToken(userId, token).then(info=>{
            if(info.error){
                setInfo({...info, error: info.error})
            }else{
                const clientToken = info.clientToken
                setInfo({clientToken})
            }
        })
    }

    const showBtnDropIn=()=>(
        <div>
            {info.clientToken !== null && products.length > 0 ? (
                <div className='text-center' >
                   <DropIn
                    options={{ authorization: info.clientToken }}
                    onInstance={(instance) => (info.instance = instance)}
                   />
                    <button className='btn btn-block btn-success' onClick={()=>{onPurchase()}}>Buy</button>
                </div>
            ) :(
                <h3>Please log in or add something to cart</h3>
            ) }
        </div>
    )

    useEffect(()=>{
        getToken(userId, token)
    },[])


    const onPurchase=()=>{
        setInfo({loading:true})
        let nonce;
        let getNonce= info.instance
            .requestPaymentMethod()
            .then(data=>{
                nonce = data.nonce
                const paymentData= {
                    paymentMethodNonce: nonce,
                    amount: getAmount()
                }
                proccessPayment(userId, token, paymentData)
                .then(res=>{
                    setInfo({...info,loading:false, success:res.success})
                    console.log("PAYMENT SUCCESS")

                    const orderData={
                        products: products,
                        transaction_id: res.transaction.id,
                        amount:res.transaction.amount
                    }

                    createOder(userId,token,orderData)
                    cartEmpty(()=>{
                        console.log("Should be crashd");
                    })
                    //TODO: Force Reload
                    setReload(!reload)
                })
                .catch(err=>{
                    setInfo({loading:false, success: false})
                    console.log("PAYMENT FAILED")
                })
            })
    }

    const getAmount=()=>{
        let amount =0
        products.map(item=>{
            amount = amount + item.price
        })
        return amount;
    }

    return (
        <div>
            <h4>Your total bill is ${getAmount()}</h4>
            {showBtnDropIn()}
        </div>
    )
}

export default Paymentb
