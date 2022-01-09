import React,{ useState, useEffect} from 'react'
import { isAuthenticated } from '../auth/helper'
import { cartEmpty} from './helper/cartHelper'
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
        if(userId && token){

        getmeToken(userId, token).then(info=>{
            if(info.error){
                setInfo({...info, error: info.error})
                console.log("from paymentb",info);
            }else{
                const clientToken = info.clientToken
                setInfo({clientToken})
            }
        })
    } else {
        console.log("please login first");
    }
    }

    const showBtnDropIn=()=>(
        <div>
            { info.clientToken !== null &&  userId && token  ? (
                <div className='text-center' >
                   <DropIn
                    options={{ authorization: info.clientToken }}
                    onInstance={(instance) => (info.instance = instance)}
                   />
                    <button className='btn btn-block btn-success' onClick={()=>{onPurchase()}}>Buy</button>
                </div>
            ) :  (products.length <= 0)
             ? <h3>Please add something to cart</h3>: <h3>Please Login first</h3> }
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
                    console.log("PAYMENT SUCCESS",res)

                    const orderData={
                        products: products,
                        transaction_id: res.transaction.id,
                        amount:res.transaction.amount
                    }

                    createOder(userId,token,orderData)
                    cartEmpty(()=>{
                    })
                    //TODO: Force Reload
                    setReload(!reload)
                })
                .catch(err=>{
                    setInfo({loading:false, success: false})
                    console.log("FAILED", err)
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
