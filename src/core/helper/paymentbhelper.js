import { API } from "../../backend";

export const getmeToken=(userId, token)=>{
    return fetch(`${API}/payments/gettoken/${userId}`,{
        method: "GET",
        headers:{
            Accept:"application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(response => response.json())
    .catch(err=> console.log(err))
}


export const proccessPayment=(userId, token, paymentInfo, )=>{
    return fetch(`${API}/payment/braintree/${userId}`,{
        method: "POST",
        headers:{
            Aceept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(paymentInfo)
    }).then(res=> res.json())
    .catch(err=>console.log(err))
}