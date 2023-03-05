import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"

export default function Login(props) {
    const [uname, setuname] = useState("");
    const [pword, setPword] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const login = (event) => {
        event.preventDefault();
        if (uname === '' || pword === '') {
            setError(true);
        }
        else {
            console.log(uname, pword);
            let user = {
                name: uname,
                password: pword
            }
            axios.post('http://localhost:4000/userLogin', user).then(res => {
                alert(res.data.message)
                props.setLoginUser(res.data.user);
                setError(false);
                setPword("");
                setuname("");
                navigate("/");
            });
        }
    }
    const errorMessage = () => {
        return (
            <div
                className="error"
                style={{
                    display: error ? '' : 'none',
                }}>
                <h2>Please enter all the fields</h2>
            </div>
        );
    };
    return (
        <>
            <form >
                <div className="loginBox">
                    <div className="login">
                        Sign In
                    </div>
                    <div className="message">
                        {errorMessage()}
                    </div>
                    <div className="username">
                        <input className="uname" type="text" placeholder="Username" value={uname} required onChange={(e) => setuname(e.target.value)} />
                    </div>
                    <div className="password">
                        <input className="pword" type="password" placeholder="Password" value={pword} required onChange={(e) => { setPword(e.target.value) }} />
                    </div>
                    <div className="or1">
                        not a member?<Link className="orsign" to="/register" > signup now </Link><br></br>
                        <Link className="orsign" to="/allUsers" > getUsers </Link>
                    </div>
                    <div className="loginbtn">
                        <button className="but" onClick={login} >SIGN IN</button>
                    </div>
                </div>
            </form>
        </>
    )
}