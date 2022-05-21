import React from 'react';
import Menu from './Menu';

const Base =({
    title = "My Tittle",
    description = "My Description",
    className = "bg-dark text-white p-4",
    children,
})=>{
    return (
        <div>
            <Menu />
            <div className="container-fluid">
                <div className="jumbotron bg-dark text-white text-center">
                    <h2 className="display-4">{title}</h2>
                    <p className="lead">{description}</p>
                </div>
                <div className= {className}>{children}</div>
            </div>
            <footer className="footer bg-dark mt-auto py-3">
            <div className="container-fluid bg-success text-white text-center py-1">
            <h4>If you got any questions, Reach me out at Instagram</h4>
            <a href="https://www.instagram.com/sachin.bishnoi7/" target="_blank"><button className="btn btn-warning btn-lg">@Sachin.bishnoi7</button></a>
            </div>
            </footer>
        </div>
    );
};


export default Base