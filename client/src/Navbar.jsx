import { React, useState } from 'react'
import 'antd/dist/antd.css';
import { NavLink } from 'react-router-dom';




const Navbar = () => {

    const [Auth, setAuth] = useState(true)

    const logout = () => {
        setAuth(false)
    }
    const login = () => {
        setAuth(true)
    }
    return (
        <div className="navbar">
            <div className="items">
                <NavLink to="/" id="Logo"><h1>WELCOME</h1></NavLink>
                <div className="itemsNav2">
                    <NavLink to="/dashboard" id="btn3" ><button className='dash-btn'>DASHBOARD</button></NavLink>
                    <NavLink to="/Signup" id="btn2" ><button className='reg-btn'>Registration</button></NavLink>

                    {!Auth ? <NavLink to="/Signin" id="btn1" ><button className='signin-btn' onClick={login}>Sign In</button></NavLink>
                        : <NavLink to="/" id="btn3" ><button className='logout-btn' onClick={logout}>Log Out</button></NavLink>}



                </div>
            </div>
        </div>




    )
}

export default Navbar;
