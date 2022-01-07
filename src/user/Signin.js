import React, {useState} from "react";
import { Link, Redirect } from "react-router-dom";
import Base from "../core/Base";

import { signin, authenticate, isAuthenticated } from "../auth/helper";

const Signin=()=>{

    const [values, setValues] = useState({
        email: "",
        password:"",
        error:"",
        loading: false,
        didRedirect: false,
    })


    const {email, password, error, loading, didRedirect}= values

    const {user}= isAuthenticated();

    const handleChange = name => event =>{
        setValues({...values, error: false, [name] : event.target.value})
    }

    const performRedirect=()=>{

        // we will come back to this

        if(didRedirect){
            if(user && user.role===1 ){
                return <Redirect to="/admin/dashboard" />
            }else {
                return <Redirect to="/user/dashboard" />
            }
        }
        if(isAuthenticated()){
            return <Redirect to="/" />
        }
    }

    const loadingMessage= ()=>{
        return(
            loading && (
                <div className="alert alert-info">
                    <h3>Loading...</h3>
                </div>
            )
        )
    }

    const errorMessage= ()=>(
        <div className="row" >
            <div className="col-6 offset-sm-3 text-left">
                <div className="alert alert-danger m-2"
                style={{display: error ? "": "none"}}
                >
                {error}
                </div>
            </div>
        </div>
    )


    const onSubmit=(event)=>{
        event.preventDefault();
        setValues({...values,error: false, loading: true})
        signin({email, password})
            .then(response=>{
                if(response.error){
                    setValues({...values, error: response.error, loading: false})
                } else {
                    authenticate(response, ()=>{
                        setValues({
                            ...values,
                            didRedirect: true
                        })
                    })
                }
            })
            .catch(console.log("Error, Failed to login"))
    }


    const signInForm=()=>{
        return(
            <div className="row" >
                <div className="col-6 offset-sm-3 text-left">
                    <form action="">
                        <div className="form-group">
                            <label className="text-white">Email</label>
                            <input value={email} onChange={handleChange("email")} className="form-control" type="email" />
                        </div>
                        <div className="form-group">
                            <label className="text-white">Password</label>
                            <input value={password} onChange={handleChange("password")} className="form-control" type="password" />
                        </div>
                        <button onClick={onSubmit} className="btn btn-success btn-block">Submit</button>
                    </form>
                </div>
            </div>
        )
    }


    return(
        <Base title="A Signin page" discription="A page for user to signin">
            {loadingMessage()}
            {errorMessage()}
            {signInForm()}
            {performRedirect()} 
            <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    )
}


export default Signin;