import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import Base from '../core/Base'
import { createCategory } from './helper/adminapicall'




const AddCategory=()=> {

    const [name, setname] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false)

    const {user, token} = isAuthenticated();


    const goBack=()=>(
        <div className="mt-2">
            <Link className="btn btn-sm btn-success mb-3"
                to="/admin/dashboard"
             >
                Admin Home
            </Link>
        </div>
    )

        const handleChange=(event)=>{
            setError("") 
            setname(event.target.value)
        }

        const onSubmit=(event)=>{
            event.preventDefault();
            setError("");
            setSuccess(false)

            //Backend Reqest fired
            createCategory(user._id, token, {name})
                .then(data=>{
                    if(data.error){
                        setError(true)
                    } else {
                        setError("")
                        setSuccess(true)
                        setname("")
                    }
                })
        }

    const myCategoryForm=()=>(
        //
        <form action="">
            <div className="form-group">
                <p className="lead">Category Name</p>
                <input 
                    type="text" 
                    className="form-control my-3" 
                    autoFocus 
                    placeholder="For Ex. Summer "
                    onChange={handleChange}
                    value={name}
                 />
                <button onClick={onSubmit} className="btn-outline-info">Create Category</button>
            </div>
        </form>
    )


    const successMassege=()=>{
        if(success){
            return <h4 className="text-success" >Category Created Successfully</h4>
        }
    }

    const warningMassege=()=>{
        if(error){
            return <h4 className="text-danger" >Failed to create category</h4>
        }
    }


    return (
        <Base title="Create Category Here" discription="Add a ne category for T-shirt" className="container bg-info p-4 " >
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                    {successMassege()}
                    {warningMassege()}
                    {myCategoryForm()} 
                    {goBack()}
                </div>
            </div>
        </Base>
    )
}

export default AddCategory
