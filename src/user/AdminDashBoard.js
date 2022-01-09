import React from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper'
import Base from '../core/Base'


const AdminDashBoard =()=>{

    const {user: {name, email}} = isAuthenticated();

    const adminLeftSide=()=>{
        return(
            <div className="card overflow-auto">
                <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
                <ul className="list-group scroll ">
                        <Link to="/admin/create/category" className="nav-link text-info">Create category</Link>
                        <Link to="/admin/categories" className="nav-link text-info">Manage category</Link>
                        <Link to="/admin/create/product" className="nav-link text-info">Create Product</Link>
                        <Link to="/admin/products" className="nav-link text-info">Manage Product</Link>
                        <Link to="/admin/orders" className="nav-link text-info">Manage Order</Link>
                    <Link to="/admin/create/product" className="nav-link text-info">Add Product</Link>
                </ul>
            </div>
        )
    }

    const adminRightSide=()=>{
        return(
            <div className="card mb-4">
                <h4 className="card-header">Admin Information</h4>
                <ul className="list-group">
                    <li className="list-group-item ">
                        <span className="badge badge-success mr-2">Name: </span>{name}
                    </li>
                    <li className="list-group-item">
                        <span className="badge badge-success mr-2">Email: </span>{email}
                    </li>
                    <li className="list-group-item">
                        <span className="badge badge-danger mr-2">Admin </span>
                    </li>

                </ul>
            </div>
            )
    }

    return(
        <Base title="Admin Page" discription="Manage Your Product" className="container bg-info p-4" >
            <div className="row">
                <div className="col-3">
                    {adminLeftSide()}
                </div>
                <div className="col-9">{adminRightSide()}</div>
            </div>
            {}
        </Base>
    )
}


export default AdminDashBoard