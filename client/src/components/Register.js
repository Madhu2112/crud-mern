import React, { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function Register(props) {
    const [uname, setUname] = useState("");
    const [branch, setBranch] = useState("CHOOSE DEPARTMENT")
    const [pword, setPword] = useState("");
    const [confirmPword, setConfirmPword] = useState("");
    const [error, setError] = useState(false);
    const [errInfo, setErrInfo] = useState("");
    const navigate = useNavigate();
    const unameChange = (event) => {
        setUname(event.target.value);
    }
    const pwrodChange = (event) => {
        setPword(event.target.value);
    }
    const cpwordChange = (event) => {
        setConfirmPword(event.target.value);
    }
    const register = (event) => {
        event.preventDefault();
        if (uname === '' || pword === '' || confirmPword === '' || branch === "Choose Branch") {
            setError(true);
            setErrInfo("Please enter all the fields")
        }
        else if (pword !== confirmPword) {
            setError(true);
            setErrInfo("Passwords do not match");
        }
        else {
            setError(false);
            let user = {
                name: uname,
                branch: branch,
                password: pword
            }
            axios.post('http://localhost:4000/userRegister', user).then(res => {
                alert(res.data.message)
                setPword("");
                setUname("");
                setBranch("Choose Branch")
                setConfirmPword("");
                navigate("/allUsers")
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
                <h2>{errInfo}</h2>
            </div>
        );
    };
    return (
        <>
            {/* <Navbar /> */}
            <form action="/">
                <div class="homeBox">
                    <div className="header h1">
                        <h1>sign up</h1>
                    </div>
                    <div clasName="message">
                        {errorMessage()}
                    </div>
                    <div className="username">
                        <input className="uname" value={uname} onChange={unameChange} type="text" placeholder="EMPLOYEE NAME" required />
                    </div>
                    <div className="branch">
                        <select className="dropdown" value={branch} onChange={(e) => setBranch(e.target.value)}>
                            <option value="none">{branch}</option>
                            <option >ACCOUNTS</option>
                            <option >MANAGEMENT</option>
                            <option >IT</option>
                            <option >MARKETING</option>
                        </select>
                    </div>
                    <div className="password">
                        <input className="pword" value={pword} onChange={pwrodChange} type="password" placeholder="Employee id" required />
                    </div>
                    <div className="password">
                        <input className="pword" value={confirmPword} onChange={cpwordChange} type="password" placeholder="confirm password" required />
                    </div>

                    <div className="container">
                        <button className="button" onClick={register}>SIGN UP</button>
                    </div>
                </div>
            </form>
        </>
    );
}