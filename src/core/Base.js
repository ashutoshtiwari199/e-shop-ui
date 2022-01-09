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
            <footer className="footer bg-dark mt-auto py-3 mb-0">
                <div className="container-fluid bg-success text-white text-center p-2 mb-0">
                    <h5>If You got any Question feel free to reach out</h5>
                    <h5>okayashutosh@gmail.com</h5>
                </div>
            </footer>
        </div>
    )
}

export default Base
