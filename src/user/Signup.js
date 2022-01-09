import React, {useState} from "react";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";
import Base from "../core/Base";


const Signup=()=>{

    const [ value, setValue] = useState({
        name: "",
        email: "",
        password: "",
        role:"",
        error: "",
        success: false
    });

    const {name, email,password, error , success,role } = value;
    console.log("from setvalue",(value.role));

    const handleChange = name => event =>{

        setValue({...value, error: false, [name] : event.target.value})
    }
    console.log("from setvalue",(value.role));

    const onSubmit= (event)=>{
        event.preventDefault()
        setValue({...value, error: false})
        signup({name, email ,role, password})
        .then(data=> {
            if(data.error){
                setValue({...value, error: data.error, success: false})
            } else {
                setValue({
                    ...value,
                    name:"",
                    email:"",
                    password:"",
                    error:"",
                    role:0,
                    success:true 
                })
            }
        })
        .catch(console.log("Error in signUp"))  
    }

    const successMessage= ()=>(
        <div className="row" >
            <div className="col-6 offset-sm-3 text-left">
            <div className="alert alert-success m-2"
                style={{display: success ? "": "none"}}
                >
                Signup Successfull.. <Link to="/signin">Login Here</Link>
                </div>
            </div>
        </div>
    )


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

    const signUpForm=()=>{
        return(
            <div className="row" >
                <div className="col-6 offset-sm-3 text-left">
                    <form action="">
                        <div className="form-group">
                            <label className="text-white mr-5">Account Type</label>
                            <input required onClick={handleChange("role")} id="buyer" name="role" value="0" className="mr-1" type="radio" />
                            <label className="text-white mr-4" for="buyer" >Buyer</label>
                            <input required onClick={handleChange("role")} id="merchent" value="1" name="role" className="mr-1" type="radio" />
                            <label className="text-white" for="merchent" >Merchent</label>   
                            {/* <input value={name} onChange={handleChange("name")}  className="form-control" type="text" /> */}
                        </div>
                        <div className="form-group">
                            <label className="text-white">Name</label>
                            <input value={name} onChange={handleChange("name")}  className="form-control" type="text" />
                        </div>
                        <div className="form-group">
                            <label className="text-white">Email</label>
                            <input value={email} onChange={handleChange("email")} className="form-control" type="email" />
                        </div>
                        <div className="form-group">
                            <label className="text-white">Password</label>
                            <input value={password} onChange={handleChange("password")} className="form-control" type="password"/>
                        </div>
                        <button onClick={onSubmit} className="btn btn-success btn-block">Submit</button>
                    </form>
                </div>
            </div>
        )
    }




    return(
        <Base title="A signup page" discription="A page for user to signup">
            {errorMessage()}
            {signUpForm()}
            {successMessage()}
            {/* <p className="text-white text-center">{JSON.stringify(value)}</p> */}
        </Base>
    )
}


export default Signup;