import React,{Fragment} from 'react'
import { Link,withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth/helper';



const currentActiveTab =(history,path)=>{
    if(history.location.pathname=== path){
        return {color : "#2ecc72"}
    } else{
        return {color: "#d1d1d1"}
    }
}

const Menu =({history})=>{
    return(
        <div className="navigation" >
            <ul className="nav nav-tabs bg-dark">
                <li className="nav-item">
                    <Link style={currentActiveTab(history,"/")} className="nav-link" to="/" >
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link style={currentActiveTab(history,"/cart")} className="nav-link" to="/cart" >
                        Cart
                    </Link>
                </li>
                {isAuthenticated() && (
                    isAuthenticated().user.role===0 ?
                    <Fragment>
                        <li className="nav-item">
                            <Link style={currentActiveTab(history,"/user/dashboard")} className="nav-link" to="/user/dashboard" >
                                User DashBoard
                            </Link>
                        </li>
                        </Fragment>
                        :
                        <Fragment>
                        <li className="nav-item">
                            <Link style={currentActiveTab(history,"/admin/dashboard")} className="nav-link" to="/admin/dashboard" >
                                Admin DashBoard
                            </Link>
                        </li>
                    </Fragment>
                ) }

                { !isAuthenticated () && (
                    <Fragment>
                        <li className="nav-item">
                        <Link style={currentActiveTab(history,"/signup")} className="nav-link" to="/signup" >
                            Signup
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link style={currentActiveTab(history,"/signin")} className="nav-link" to="/signin" >
                            Signin
                        </Link>
                    </li>
                </Fragment>
                )}
                {isAuthenticated() && (
                    <li className="nav-item">
                        <span style={currentActiveTab(history,"/signout")} 
                            className="nav-link text-warning cursor-pointer" 
                            onClick={()=> signout(()=>{
                                history.push("/")
                            }
                        )} >
                            SignOut
                        </span>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default withRouter(Menu)