import { API } from "../../backend";




//Category Calls


export const createCategory=(userId, token, category)=>{
    return fetch(`${API}category/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=> console.log(err))
}




// Get All Categories

export const getAllCategories=()=>{
    return fetch(`${API}categories`,{
        method:"GET"
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}


// Product Calls


// Craete Product
export const createaProduct=(userId, token, product)=>{
    return fetch(`${API}product/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}


// Get alll the products

export const getAllProducts=()=>{
    return fetch(`${API}products`,{
        method:"GET"
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}

// Delete a product

export const deleateaProduct=(productId,userId, token)=>{
    return fetch(`${API}product/${productId}/${userId}`,{
        method:"DELETE",
        headers:{
            Accept:"application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}


// deleta a catrgory
export const deleateaCategory=(categoryId,userId, token)=>{
    return fetch(`${API}category/${categoryId}/${userId}`,{
        method:"DELETE",
        headers:{
            Accept:"application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}


// Get a product
export const getaProduct= productId=>{
    return fetch(`${API}product/${productId}`,{
        method:"GET"
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}


// Update a product
export const updateProduct=(productId,userId, token, product)=>{
    return fetch(`${API}product/${productId}/${userId}`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}


// Update the category

export const updateCategory=(categoryId,userId, token, category)=>{
    return fetch(`${API}category/${categoryId}/${userId}`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            Authorization: `Bearer ${token}`
        },
        body: category
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}


// get a category

export const getaCategory= categoryId=>{
    return fetch(`${API}category/${categoryId}`,{
        method:"GET"
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}
