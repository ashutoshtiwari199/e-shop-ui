import React from 'react'
import { API } from '../../backend'



const Imagehelper=({product })=>{

    const imageurl= product ? `${API}/product/photo/${product._id}` : `https://funkylife.in/wp-content/uploads/2021/08/dp-for-whatsapp-18.jpg`


    return (
        <div className="rounded border border-success p-2 mb-1">
        <img
          src={imageurl}
          alt="photo"
          style={{ height: "80vh", width: "100%" }}
          className="mb-3 rounded"
        />
      </div>
    )
}

export default Imagehelper
