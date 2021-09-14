import React, { Component } from 'react';
import { Link } from "react-router-dom"
import "./Home.css";
import guitar from "../assets/guitar-1.jpg"
import logo from "../assets/Main-Logo.png"
import Login from './Login';

class Home extends Component {
    render() {
        return (
            <div className="home-outer">
                <div className="bs-container container-fluid">
                    <div className="row">
                        <div className=" col-6 col-sm-3 col-md-4 col-lg-6 ">
                            <img className="home-back1" src={guitar} alt="Background Image"></img> 
                        </div>
                        
                        <div className="home-title-col col-6 col-sm-3 col-md-4 col-lg-6 ">
                            <div className="home-title">
                                    <img  className="home-logo" src={logo} alt="Songify Logo"/>
                                    <h2 className="title">Songify</h2>
                                    <p className="subtitle">THINK MUSIC</p>
                            </div>
                            {/* <Link to="/login" className="btn btn-primary">login</Link> */}
                        </div>
                    </div>
                    <Login/>
                </div>
                
            </div>
        );
    }
}

export default Home;