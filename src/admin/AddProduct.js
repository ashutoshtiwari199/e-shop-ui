import React,{useState, useEffect} from 'react'
import Base from '../core/Base'
import { Link } from 'react-router-dom'
import { createaProduct, getAllCategories } from './helper/adminapicall';
import {isAuthenticated} from "../auth/helper/index"


const AddProduct=()=> {


    const {user, token}= isAuthenticated(); 

    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        photo:"",
        categories:[],
        category:"",
        loading:false,
        error:"",
        createdProduct:"",
        getRedirect:false,
        formData:new FormData()
      });




    const {name, description,price,stock, categories, category, loading, error, createdProduct, getRedirect,formData}= values;

    const preLoad=()=>{
        getAllCategories().then(data=>{
            if (data.error){
                setValues({...values, error: data.error})
            } else {
              console.log(data)
                setValues({...values,categories: data, formData: new FormData()
                })
            }
        })
    }

    useEffect(() => {
        preLoad();
    }, [])

      const handleChange=(name)=> (event)=>{
        const value = name==="photo"? event.target.files[0] : event.target.value;
        formData.set(name, value)

        setValues({...values, [name]:value})
      }  
    

      //todo: 
    const onSubmit=(event)=>{
      event.preventDefault();
      setValues({...values, error:"", loading:true })
      createaProduct(user._id, token, formData)
        .then(data=>{
          if(data.error){
            setValues({...values, error: data.error})
          } else {
            setValues({
              ...values,
              name:"",
              description: "",
              price: "",
              stock: "",
              photo:"",
              categories:[],
              category:"",
              loading:false,
              error:"",
              createdProduct:data.name,
              formData:""
                  })
          }
        })
   }  

   const successMessage=()=>(
     <div className="alert alert-success mt-3"
      style={{display: createdProduct ? "" : "none"}}
     >
       <h3>{createdProduct} create successfully</h3>
     </div>
   )

   const errorMessage=()=>(
    <div className="alert alert-success mt-3"
     style={{display: error ? "" : "none"}}
    >
      <h3>{error}</h3>
    </div>
  )

    const createProductForm = () => (
        <form>
          <span>Post photo</span>
          <div className="form-group">
            <label className="btn btn-block btn-success">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("name")}
              name="photo"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={handleChange("description")}
              name="photo"
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group">
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
            >
              <option>Select</option>
              {categories.map((item, index)=>(
                  <option key={index} value={item._id}>{item.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="Quantity"
              value={stock}
            />
          </div>
    
          <button
            type="submit"
            onClick={onSubmit}
            className="btn btn-outline-success mb-3"
          >
            Create Product
          </button>
        </form>
      );



    return (
        <Base title="Add Product here!!" discription="Product creation section" className="container bg-info p-4">
            <Link to="/admin/dashboard"
                className="btn btn-sm rounded btn-dark mb-2"
            >
                Admin Home
            </Link>
            <div className="row bg-dark text-white rounded">
                 <div className="col-md-8 offset-md-2">
                    {errorMessage()}
                    {successMessage()}
                     {createProductForm()}
                 </div>
            </div> 
        </Base>
    )
}

export default AddProduct
