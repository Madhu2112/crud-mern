import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

export default function Delete() {
    const [uname, setUname] = useState("");
    const [branch, setBranch] = useState("Choose Branch")
    const [pword, setPword] = useState("");
    const [error, setError] = useState(false);
    const [errInfo, setErrInfo] = useState("");
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();
    const getUsers = () => {
        axios.get('http://localhost:4000/getUsers').then((res) => {
            setUsers(res.data);
        });
    }
    useEffect(() => {
        getUser(id);
    }, [id])
    const delUser = (id) => {
        console.log(id);
        axios.delete(`http://localhost:4000/delUser/${id}`).then(res => {
            alert(res.data.message);
            getUsers();
        });
    }
    const getUser = (id) => {
        axios.get(`http://localhost:4000/getUser/${id}`).then(res => {
            setUname(res.data.name);
            setBranch(res.data.branch);
            setPword(res.data.password);
        })
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
                        <h1>delete User</h1>
                    </div>
                    <div className="message">
                        {errorMessage()}
                    </div>
                    <div className="container">
                        <button className="button" onClick={delUser}>Delete User</button>
                    </div>
                </div>
            </form>
        </>
    );
}