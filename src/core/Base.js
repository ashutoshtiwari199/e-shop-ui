import React from 'react'

import Menu from './Menu'

function Base({
    title="MY Title",
    discription="My Discription",
    className="bg-dark text-white",
    children
}) {
    return (
        <div>
        <Menu/>
            <div className="container-fluid" >
                <div className="jumbotron bg-dark text-white text-center">
                    <h2 className="display-6">{title}</h2>
                    <p className="lead" >{discription}</p>
                </div>
                <div className={className}>{children}</div>
            </div>
            <footer className="footer bg-dark mt-auto py-3">
                <div className="container-fluid bg-success text-white text-center p-2">
                    <h4>If You got any Question feel free to reach out</h4>
                    <button className="btn btn-warning btn-sm">Contact US</button>
                </div>
                <div className="container">
                    <span className="text-muted">
                        An Amazing place to buy T-shirt
                    </span>
                </div>
            </footer>
        </div>
    )
}

export default Base
