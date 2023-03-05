import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

export default function Update() {
    const [uname, setUname] = useState("");
    const [branch, setBranch] = useState("Choose Dept")
    const [pword, setPword] = useState("");
    const [error, setError] = useState(false);
    const [errInfo, setErrInfo] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getUser(id);
    }, [id])
    const getUser = (id) => {
        axios.get(`http://localhost:4000/getUser/${id}`).then(res => {
            setUname(res.data.name);
            setBranch(res.data.branch);
            setPword(res.data.password);
        })
    }
    const unameChange = (event) => {
        setUname(event.target.value);
    }
    const pwrodChange = (event) => {
        setPword(event.target.value);
    }
    const update = (event) => {
        event.preventDefault();
        if (uname === '' || pword === '' || branch === "Choose Branch") {
            setError(true);
            setErrInfo("Please enter all the fields")
        }
        else {
            setError(false);
            let user = {
                name: uname,
                branch: branch,
                password: pword
            }
            axios.post(`http://localhost:4000/updateUser/${id}`, user).then(res => {
                alert(res.data.message)
                setPword("");
                setUname("");
                setBranch("Choose Branch")
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
            <form action="/">
                <div >
                    <div className="header h1">
                        <h1>Update User</h1>
                    </div>
                    <div className="message">
                        {errorMessage()}
                    </div>
                    <div className="username">
                        <input className="uname" value={uname} onChange={unameChange} type="text" placeholder="Employee Name" required />
                    </div>
                    <div className="branch">
                        <select className="dropdown" value={branch} onChange={(e) => setBranch(e.target.value)}>
                            <option value="none">{branch}</option>
                            <option >Management</option>
                            <option >Marketing</option>
                            <option >it</option>
                            <option >Accounts</option>
                        </select>
                    </div>
                    <div className="password">
                        <input className="pword" value={pword} onChange={pwrodChange} type="text" placeholder="Employee id" required />
                    </div>
                    <div className="container">
                        <button className="button" onClick={update}>Update User</button>
                    </div>
                </div>
            </form>
        </>
    );
}